"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Thermometer,
  Lightbulb,
  Volume2,
  Mic,
  ChevronDown,
  Pause,
  Play,
  Smartphone,
  X,
} from "lucide-react";
import Link from "next/link";
import { useDriftStore } from "@/lib/state";
import BrainDrainModal from "@/components/brain-drain/BrainDrainModal";

const audioOptions = [
  { id: "narrative", label: "How Paper is Made", type: "Narrative" },
  { id: "bilateral", label: "Bilateral Calm", type: "Bilateral Stimulation" },
  { id: "breathing", label: "4-7-8 Breathing", type: "Breathing Guide" },
  { id: "rain", label: "Adaptive Rain", type: "Sound Masking" },
];

export default function WindDownPage() {
  const { windDownProgress, setWindDownProgress } = useDriftStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState(audioOptions[0]);
  const [showAudioPicker, setShowAudioPicker] = useState(false);
  const [showBrainDrain, setShowBrainDrain] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setWindDownProgress(Math.min(windDownProgress + 0.5, 100));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, windDownProgress, setWindDownProgress]);

  useEffect(() => {
    if (windDownProgress >= 70 && !showHandoff) {
      setShowHandoff(true);
    }
  }, [windDownProgress, showHandoff]);

  const lightLevel = Math.max(5, 40 - Math.floor(windDownProgress * 0.35));
  const temperature = Math.max(65, 68 - Math.floor(windDownProgress * 0.03));
  const colorTemp = Math.max(1800, 2200 - Math.floor(windDownProgress * 4));
  const bgOpacity = Math.min(0.15, windDownProgress * 0.0015);

  const getPhaseLabel = useCallback(() => {
    if (windDownProgress < 20) return "Lights warming...";
    if (windDownProgress < 40) return "Environment settling";
    if (windDownProgress < 60) return "Deepening calm";
    if (windDownProgress < 80) return "Approaching sleep";
    return "Ready for handoff";
  }, [windDownProgress]);

  return (
    <div className="relative min-h-[80vh]">
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl"
        animate={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(232, 168, 76, ${bgOpacity}) 0%, transparent 70%)`,
        }}
        transition={{ duration: 2 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-muted text-xs font-medium uppercase tracking-wider">
              Wind-Down Active
            </p>
            <h1 className="text-xl font-semibold tracking-tight mt-0.5">
              {getPhaseLabel()}
            </h1>
          </div>
          <Link
            href="/tonight"
            className="w-8 h-8 rounded-full bg-elevated flex items-center justify-center text-muted hover:text-foreground transition-colors"
          >
            <X size={14} />
          </Link>
        </div>

        {/* Ambient Progress */}
        <motion.div
          className="relative h-40 sm:h-48 rounded-2xl overflow-hidden bg-card border border-border flex items-center justify-center"
          animate={{
            borderColor: `rgba(232, 168, 76, ${0.1 + windDownProgress * 0.002})`,
          }}
        >
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${120 + i * 60}px`,
                  height: `${120 + i * 60}px`,
                  left: "50%",
                  top: "50%",
                  x: "-50%",
                  y: "-50%",
                  border: "1px solid",
                  borderColor: `rgba(232, 168, 76, ${0.08 - i * 0.012})`,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3 + (windDownProgress / 200), 0.6, 0.3 + (windDownProgress / 200)],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
          <div className="relative text-center z-10">
            <motion.div
              className="w-16 h-16 mx-auto rounded-full bg-amber/10 flex items-center justify-center mb-3"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Moon size={24} className="text-amber" />
            </motion.div>
            <p className="text-3xl font-light text-foreground tabular-nums">
              {Math.round(windDownProgress)}%
            </p>
            <p className="text-xs text-muted mt-1">wind-down progress</p>
          </div>
        </motion.div>

        {/* Environment State */}
        <div className="grid grid-cols-3 gap-3">
          <EnvironmentMeter
            icon={<Lightbulb size={14} />}
            label="Lights"
            value={`${lightLevel}%`}
            subtext={`${colorTemp}K`}
            progress={100 - lightLevel}
            color="amber"
          />
          <EnvironmentMeter
            icon={<Thermometer size={14} />}
            label="Temp"
            value={`${temperature}°F`}
            subtext="dropping"
            progress={(68 - temperature) / 3 * 100}
            color="peach"
          />
          <EnvironmentMeter
            icon={<Volume2 size={14} />}
            label="Sound"
            value="On"
            subtext={selectedAudio.type.split(" ")[0]}
            progress={windDownProgress}
            color="lavender"
          />
        </div>

        {/* Audio Player */}
        <motion.div
          layout
          className="rounded-2xl bg-card border border-border p-4"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-amber/15 flex items-center justify-center text-amber hover:bg-amber/25 transition-colors shrink-0"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {selectedAudio.label}
              </p>
              <p className="text-xs text-muted">{selectedAudio.type}</p>
            </div>
            <button
              onClick={() => setShowAudioPicker(!showAudioPicker)}
              className="text-muted hover:text-foreground transition-colors p-2"
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${showAudioPicker ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Audio waveform visualization */}
          <div className="flex items-end gap-[2px] h-8 mt-3 px-1">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-amber/30 rounded-full min-w-[2px]"
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${8 + Math.random() * 20}px`,
                          `${4 + Math.random() * 28}px`,
                          `${8 + Math.random() * 20}px`,
                        ],
                      }
                    : { height: "4px" }
                }
                transition={{
                  duration: 0.8 + Math.random() * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.02,
                }}
              />
            ))}
          </div>

          <AnimatePresence>
            {showAudioPicker && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 mt-3 border-t border-border space-y-1">
                  {audioOptions.map((audio) => (
                    <button
                      key={audio.id}
                      onClick={() => {
                        setSelectedAudio(audio);
                        setShowAudioPicker(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                        selectedAudio.id === audio.id
                          ? "bg-amber-dim text-amber"
                          : "hover:bg-white/[0.03] text-muted hover:text-foreground"
                      }`}
                    >
                      <p className="text-sm font-medium">{audio.label}</p>
                      <p className="text-xs opacity-60">{audio.type}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Brain Drain Quick Access */}
        <button
          onClick={() => setShowBrainDrain(true)}
          className="w-full rounded-2xl bg-card border border-border p-4 flex items-center gap-3 hover:bg-elevated/50 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-full bg-lavender/15 flex items-center justify-center shrink-0">
            <Mic size={16} className="text-lavender" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Brain Drain</p>
            <p className="text-xs text-muted">
              Offload racing thoughts — they&apos;ll be here in the morning
            </p>
          </div>
        </button>

        {/* Phone Handoff Prompt */}
        <AnimatePresence>
          {showHandoff && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
            >
              <Link href="/tonight/sleep">
                <div className="rounded-2xl bg-gradient-to-br from-amber/15 to-card border border-amber/30 p-5 text-center cursor-pointer hover:border-amber/50 transition-all">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber/15 flex items-center justify-center mb-3 animate-breathe">
                    <Smartphone size={20} className="text-amber" />
                  </div>
                  <p className="text-sm font-semibold text-amber">
                    Ready for handoff
                  </p>
                  <p className="text-xs text-muted mt-1.5 max-w-xs mx-auto">
                    Place your phone on the charger. Your Drift Buds take it
                    from here.
                  </p>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Brain Drain Modal */}
      <AnimatePresence>
        {showBrainDrain && (
          <BrainDrainModal onClose={() => setShowBrainDrain(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function EnvironmentMeter({
  icon,
  label,
  value,
  subtext,
  progress,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  progress: number;
  color: "amber" | "peach" | "lavender";
}) {
  const colorMap = {
    amber: "bg-amber",
    peach: "bg-peach",
    lavender: "bg-lavender",
  };
  const textColorMap = {
    amber: "text-amber",
    peach: "text-peach",
    lavender: "text-lavender",
  };

  return (
    <div className="rounded-xl bg-card border border-border p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <span className={textColorMap[color]}>{icon}</span>
        <span className="text-xs text-muted">{label}</span>
      </div>
      <p className="text-lg font-semibold">{value}</p>
      <div className="h-1 bg-elevated rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorMap[color]}`}
          animate={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <p className="text-[10px] text-dim">{subtext}</p>
    </div>
  );
}
