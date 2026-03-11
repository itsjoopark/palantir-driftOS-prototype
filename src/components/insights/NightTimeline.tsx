"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { lastNight } from "@/lib/mock-data";

const phaseColors: Record<string, string> = {
  awake: "#F2EDE4",
  "wind-down": "#E8A84C",
  light: "#8B7EC8",
  deep: "#5B4FA0",
  rem: "#D4896A",
};

const phaseLabels: Record<string, string> = {
  awake: "Awake",
  "wind-down": "Wind-Down",
  light: "Light Sleep",
  deep: "Deep Sleep",
  rem: "REM",
};

export default function NightTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrubberPosition, setScrubberPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const phases = lastNight.phases;

  const handleScrub = (e: React.MouseEvent | React.TouchEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setScrubberPosition(pct);
  };

  const activePhaseIndex = Math.min(
    phases.length - 1,
    Math.floor(scrubberPosition * phases.length)
  );
  const activePhase = phases[activePhaseIndex];

  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted">Night Timeline</h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-dim">{lastNight.sleepOnset}</span>
          <span className="text-dim">→</span>
          <span className="text-dim">{lastNight.wakeTime}</span>
        </div>
      </div>

      {/* Phase info */}
      <div className="mb-3 h-10 flex items-center">
        <motion.div
          key={activePhaseIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: phaseColors[activePhase.phase] }}
          />
          <div>
            <span className="text-sm font-medium">
              {phaseLabels[activePhase.phase]}
            </span>
            <span className="text-xs text-muted ml-2">
              {activePhase.time} · HR {activePhase.hr} · HRV {activePhase.hrv}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Timeline track */}
      <div
        ref={trackRef}
        className="relative h-12 flex gap-[1px] rounded-lg overflow-hidden cursor-pointer"
        onMouseMove={handleScrub}
        onTouchMove={handleScrub}
        onClick={handleScrub}
      >
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            className="flex-1 relative"
            style={{ backgroundColor: phaseColors[phase.phase] }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: i === activePhaseIndex ? 1 : 0.6, scaleY: 1 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === i && (
              <div className="absolute inset-0 bg-white/10" />
            )}
          </motion.div>
        ))}

        {/* Scrubber handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-foreground/80 pointer-events-none z-10"
          style={{ left: `${scrubberPosition * 100}%` }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-background" />
        </motion.div>
      </div>

      {/* Time labels */}
      <div className="flex justify-between mt-2 text-[10px] text-dim">
        <span>9 PM</span>
        <span>12 AM</span>
        <span>3 AM</span>
        <span>6 AM</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-border">
        {Object.entries(phaseLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5 text-[10px] text-muted">
            <div
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: phaseColors[key] }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
