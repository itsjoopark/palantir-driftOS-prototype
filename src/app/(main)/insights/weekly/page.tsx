"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { weekData, weeklyObservations } from "@/lib/mock-data";
import InsightsNav from "@/components/insights/InsightsNav";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
} as const;

const qualityColor: Record<string, string> = {
  restful: "bg-lavender/70",
  moderate: "bg-amber/50",
  light: "bg-peach/40",
};

function timeToMinutes(time: string): number {
  if (time === "—") return 0;
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/);
  if (!match) return 0;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3];
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  if (hours < 6) hours += 24;
  return hours * 60 + minutes;
}

export default function WeeklyViewPage() {
  const minTime = timeToMinutes("9:00 PM");
  const maxTime = timeToMinutes("8:30 AM");
  const range = maxTime - minTime;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="pt-2">
        <p className="text-muted text-sm font-medium">This Week</p>
        <h1 className="text-2xl font-semibold tracking-tight mt-1">
          Sleep Rhythm
        </h1>
      </motion.div>

      <InsightsNav />

      {/* Rhythm Visualization */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5 sm:p-6">
          <h3 className="text-sm font-medium text-muted mb-6">
            7-Day Pattern
          </h3>

          {/* Flow chart - each day is a column showing sleep window */}
          <div className="flex items-end gap-2 sm:gap-3 h-64 relative">
            {/* Y-axis labels */}
            <div className="absolute -left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-dim w-12">
              <span>9 PM</span>
              <span>11 PM</span>
              <span>1 AM</span>
              <span>3 AM</span>
              <span>5 AM</span>
              <span>7 AM</span>
            </div>

            <div className="flex-1 flex items-stretch gap-2 sm:gap-3 ml-12 relative h-full">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 border-t border-border"
                  style={{ top: `${(i / 5) * 100}%` }}
                />
              ))}

              {weekData.map((day, i) => {
                if (day.sleepStart === "—") {
                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center justify-end relative"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[10px] text-dim -rotate-90">
                          Tonight
                        </span>
                      </div>
                      <p className="text-xs font-medium mt-2">{day.day}</p>
                      <p className="text-[10px] text-dim">{day.date}</p>
                    </div>
                  );
                }

                const startMin = timeToMinutes(day.sleepStart);
                const endMin = timeToMinutes(day.sleepEnd);
                const topPct = ((startMin - minTime) / range) * 100;
                const heightPct = ((endMin - startMin) / range) * 100;

                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center relative"
                  >
                    <div className="w-full h-full relative">
                      <motion.div
                        className={`absolute left-0 right-0 rounded-lg ${qualityColor[day.quality]}`}
                        initial={{ height: 0, top: `${topPct}%` }}
                        animate={{
                          height: `${heightPct}%`,
                          top: `${topPct}%`,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: 0.2 + i * 0.08,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                    <p className="text-xs font-medium mt-2">{day.day}</p>
                    <p className="text-[10px] text-dim">{day.date}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 pt-3 border-t border-border">
            {[
              { label: "Restful", color: "bg-lavender/70" },
              { label: "Moderate", color: "bg-amber/50" },
              { label: "Light", color: "bg-peach/40" },
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
        </div>
      </motion.div>

      {/* Trend */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-mint/15 flex items-center justify-center shrink-0">
            <TrendingUp size={16} className="text-mint" />
          </div>
          <div>
            <p className="text-xs font-medium text-mint mb-0.5">Trending</p>
            <p className="text-sm">
              Sleep timing is getting more consistent — shifted 25 min earlier
              this week.
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI Observations */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <h3 className="text-sm font-medium text-muted mb-4">
            Observations
          </h3>
          <div className="space-y-4">
            {weeklyObservations.map((observation, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1 bg-amber/30 rounded-full shrink-0 mt-1" />
                <p className="text-sm text-muted leading-relaxed">
                  {observation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
