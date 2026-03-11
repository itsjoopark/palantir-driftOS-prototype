"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Lightbulb, Moon } from "lucide-react";
import Link from "next/link";
import { lastNight, brainDrainItems } from "@/lib/mock-data";
import InsightsNav from "@/components/insights/InsightsNav";
import NightTimeline from "@/components/insights/NightTimeline";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const phaseColors: Record<string, string> = {
  awake: "bg-foreground/20",
  "wind-down": "bg-amber/40",
  light: "bg-lavender/40",
  deep: "bg-lavender/80",
  rem: "bg-peach/60",
};

export default function MorningDebriefPage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Greeting */}
      <motion.div variants={fadeUp} className="pt-2">
        <p className="text-muted text-sm font-medium">Good morning</p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-1">
          Last Night
        </h1>
        <p className="text-sm text-muted mt-1">{lastNight.date}</p>
      </motion.div>

      {/* Sub-navigation */}
      <InsightsNav />

      {/* Timeline Scrubber */}
      <motion.div variants={fadeUp}>
        <NightTimeline />
      </motion.div>

      {/* Visual Night Summary */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5 sm:p-6">
          <h3 className="text-sm font-medium text-muted mb-4">
            Night Pattern
          </h3>

          {/* Abstract sleep visualization */}
          <div className="relative h-24 sm:h-32 flex items-end gap-[2px] rounded-xl overflow-hidden">
            {lastNight.phases.map((phase, i) => {
              const heightMap: Record<string, number> = {
                awake: 20,
                "wind-down": 35,
                light: 55,
                deep: 90,
                rem: 70,
              };
              return (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t-sm ${phaseColors[phase.phase]}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightMap[phase.phase]}%` }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.06,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
            {[
              { label: "Deep", color: "bg-lavender/80" },
              { label: "REM", color: "bg-peach/60" },
              { label: "Light", color: "bg-lavender/40" },
              { label: "Wind-down", color: "bg-amber/40" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 text-xs text-muted"
              >
                <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                {item.label}
              </div>
            ))}
          </div>

          {/* Time markers */}
          <div className="flex justify-between mt-3 text-[10px] text-dim">
            <span>{lastNight.sleepOnset}</span>
            <span>{lastNight.wakeTime}</span>
          </div>
        </div>
      </motion.div>

      {/* Insight Card */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-gradient-to-br from-amber/8 to-card border border-amber/15 p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber/15 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb size={16} className="text-amber" />
            </div>
            <div>
              <p className="text-xs font-medium text-amber mb-1.5">
                Tonight&apos;s insight
              </p>
              <p className="text-sm leading-relaxed">{lastNight.insight}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tonight's Adjusted Plan */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-lavender" />
            <h3 className="text-sm font-medium text-muted">
              Tonight&apos;s adjustment
            </h3>
          </div>
          <p className="text-sm leading-relaxed">
            {lastNight.adjustmentForTonight}
          </p>
        </div>
      </motion.div>

      {/* Brain Drain To-Do List */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Moon size={14} className="text-lavender" />
              <h3 className="text-sm font-medium text-muted">
                Brain Drain — Morning To-Dos
              </h3>
            </div>
            <span className="text-xs text-dim">{brainDrainItems.length} items</span>
          </div>
          <div className="space-y-2.5">
            {brainDrainItems
              .filter((item) => item.category === "task" || item.category === "reminder")
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <CheckCircle2 size={16} className="text-dim mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-[10px] text-dim mt-0.5">
                      Captured at {item.timestamp}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <Link
            href="/insights/brain-drain"
            className="flex items-center gap-1 text-xs text-amber font-medium mt-3 hover:underline"
          >
            View all Brain Drain items
            <ArrowRight size={12} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
