"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb, AlertCircle, Bell } from "lucide-react";
import { brainDrainItems } from "@/lib/mock-data";
import InsightsNav from "@/components/insights/InsightsNav";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
} as const;

const categoryConfig = {
  task: { icon: CheckCircle2, label: "Task", color: "text-amber", bg: "bg-amber/10" },
  worry: { icon: AlertCircle, label: "Worry — Acknowledged", color: "text-peach", bg: "bg-peach/10" },
  idea: { icon: Lightbulb, label: "Idea — Saved", color: "text-lavender", bg: "bg-lavender/10" },
  reminder: { icon: Bell, label: "Reminder", color: "text-mint", bg: "bg-mint/10" },
};

export default function BrainDrainHistoryPage() {
  const grouped = {
    tasks: brainDrainItems.filter((i) => i.category === "task" || i.category === "reminder"),
    ideas: brainDrainItems.filter((i) => i.category === "idea"),
    worries: brainDrainItems.filter((i) => i.category === "worry"),
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="pt-2">
        <p className="text-muted text-sm font-medium">Brain Drain</p>
        <h1 className="text-2xl font-semibold tracking-tight mt-1">
          Captured Thoughts
        </h1>
        <p className="text-sm text-muted mt-1">
          From last night&apos;s wind-down session
        </p>
      </motion.div>

      <InsightsNav />

      {/* Tasks & Reminders */}
      {grouped.tasks.length > 0 && (
        <motion.div variants={fadeUp}>
          <div className="rounded-2xl bg-card border border-border p-5">
            <h3 className="text-sm font-medium text-muted mb-3">
              Morning To-Dos
            </h3>
            <div className="space-y-2">
              {grouped.tasks.map((item) => {
                const config = categoryConfig[item.category];
                const Icon = config.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]"
                  >
                    <Icon size={16} className={`${config.color} mt-0.5 shrink-0`} />
                    <div className="flex-1">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-[10px] text-dim mt-1">
                        {item.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Ideas */}
      {grouped.ideas.length > 0 && (
        <motion.div variants={fadeUp}>
          <div className="rounded-2xl bg-card border border-border p-5">
            <h3 className="text-sm font-medium text-muted mb-3">
              Saved Ideas
            </h3>
            <div className="space-y-2">
              {grouped.ideas.map((item) => {
                const config = categoryConfig[item.category];
                const Icon = config.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]"
                  >
                    <Icon size={16} className={`${config.color} mt-0.5 shrink-0`} />
                    <div className="flex-1">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-[10px] text-dim mt-1">
                        {item.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Worries */}
      {grouped.worries.length > 0 && (
        <motion.div variants={fadeUp}>
          <div className="rounded-2xl bg-card border border-border p-5">
            <h3 className="text-sm font-medium text-muted mb-3">
              Acknowledged Worries
            </h3>
            <p className="text-xs text-dim mb-3">
              These were captured and acknowledged. No action needed.
            </p>
            <div className="space-y-2">
              {grouped.worries.map((item) => {
                const config = categoryConfig[item.category];
                const Icon = config.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]"
                  >
                    <Icon size={16} className={`${config.color} mt-0.5 shrink-0`} />
                    <div className="flex-1">
                      <p className="text-sm">{item.text}</p>
                      <p className="text-[10px] text-dim mt-1">
                        {item.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
