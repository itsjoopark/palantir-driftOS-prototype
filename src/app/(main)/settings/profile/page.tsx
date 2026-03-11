"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Moon, Sun, Clock, Coffee, Dumbbell } from "lucide-react";
import Link from "next/link";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
} as const;

export default function ProfilePage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={fadeUp} className="pt-2">
        <div className="flex items-center gap-3">
          <Link
            href="/settings"
            className="text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Sleep Profile
          </h1>
        </div>
      </motion.div>

      {/* Chronotype */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <h3 className="text-sm font-medium text-muted mb-4">Chronotype</h3>
          <div className="flex gap-3">
            {[
              { label: "Early Bird", icon: Sun, time: "9:30 PM – 5:30 AM" },
              { label: "Moderate", icon: Clock, time: "10:30 PM – 6:30 AM", active: true },
              { label: "Night Owl", icon: Moon, time: "12:00 AM – 8:00 AM" },
            ].map((type) => (
              <button
                key={type.label}
                className={`flex-1 rounded-xl p-3 text-center transition-all ${
                  type.active
                    ? "bg-amber-dim border border-amber/30 text-amber"
                    : "bg-white/[0.02] border border-border text-muted hover:border-border-medium"
                }`}
              >
                <type.icon size={18} className="mx-auto mb-1.5" />
                <p className="text-xs font-medium">{type.label}</p>
                <p className="text-[10px] mt-0.5 opacity-60">{type.time}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5 space-y-4">
          <h3 className="text-sm font-medium text-muted">Behavioral Signals</h3>

          <ProfileRow
            icon={<Coffee size={16} />}
            label="Caffeine cutoff"
            value="2:00 PM"
          />
          <ProfileRow
            icon={<Dumbbell size={16} />}
            label="Exercise window"
            value="Before 6:00 PM"
          />
          <ProfileRow
            icon={<Moon size={16} />}
            label="Ideal temperature"
            value="65–67°F"
          />
          <ProfileRow
            icon={<Sun size={16} />}
            label="Light sensitivity"
            value="High"
          />
        </div>
      </motion.div>

      {/* ADHD Support */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-lavender/5 border border-lavender/15 p-5">
          <h3 className="text-sm font-medium text-lavender mb-2">
            Neurodivergent Support
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            Your profile has ADHD-optimized features enabled: extended wind-down sequences, 
            Brain Drain voice capture, narrative audio (not meditation), and no sleep scores 
            or streak tracking.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["Brain Drain", "Narrative Audio", "Extended Wind-Down", "No Scores"].map(
              (feature) => (
                <span
                  key={feature}
                  className="text-[10px] font-medium text-lavender bg-lavender/10 px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-2.5 text-muted">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
