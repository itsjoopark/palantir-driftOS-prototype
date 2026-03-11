"use client";

import { motion } from "framer-motion";
import {
  Moon,
  Thermometer,
  Lightbulb,
  Volume2,
  ChevronRight,
  Clock,
  Battery,
  Bluetooth,
  Calendar,
  Play,
} from "lucide-react";
import Link from "next/link";
import { tonightPlan, devices, currentEnvironment, getGreeting } from "@/lib/mock-data";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
} as const;

export default function TonightPage() {
  const greeting = getGreeting();

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="pt-2">
        <p className="text-muted text-sm font-medium">{greeting}</p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-1">
          Tonight&apos;s Plan
        </h1>
      </motion.div>

      {/* Wind-Down CTA Card */}
      <motion.div variants={fadeUp}>
        <Link href="/tonight/wind-down">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber/10 via-card to-card border border-amber/20 p-6 group cursor-pointer transition-all duration-300 hover:border-amber/40">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber/15 flex items-center justify-center animate-pulse-glow">
                    <Moon size={18} className="text-amber" />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-medium uppercase tracking-wider">
                      Wind-down begins
                    </p>
                    <p className="text-xl font-semibold text-amber">
                      {tonightPlan.windDownTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Play
                    size={14}
                    className="text-amber opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-sm text-amber font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Start now
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted">
                <span className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1.5 rounded-lg">
                  <Lightbulb size={12} />
                  Lights dim at {tonightPlan.environmentPlan.lightsStartDim}
                </span>
                <span className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1.5 rounded-lg">
                  <Thermometer size={12} />
                  Target {tonightPlan.environmentPlan.targetTemp}
                </span>
                <span className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1.5 rounded-lg">
                  <Volume2 size={12} />
                  {tonightPlan.environmentPlan.soundMask}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Two-column layout on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wake Window */}
        <motion.div variants={fadeUp}>
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-lavender" />
              <h3 className="text-sm font-medium text-muted">Wake Window</h3>
            </div>
            <p className="text-lg font-semibold">
              {tonightPlan.wakeWindow.start} — {tonightPlan.wakeWindow.end}
            </p>
            <p className="text-xs text-muted mt-1.5">
              Drift will find a light sleep phase in this window
            </p>
          </div>
        </motion.div>

        {/* Tomorrow Peek */}
        <motion.div variants={fadeUp}>
          <div className="rounded-2xl bg-card border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-peach" />
              <h3 className="text-sm font-medium text-muted">Tomorrow</h3>
            </div>
            <p className="text-lg font-semibold">
              {tonightPlan.tomorrowFirstEvent.split("—")[0].trim()}
            </p>
            <p className="text-xs text-muted mt-1.5">
              {tonightPlan.tomorrowFirstEvent.split("—")[1]?.trim()}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Audio Preset */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-lavender/15 flex items-center justify-center">
                <Volume2 size={16} className="text-lavender" />
              </div>
              <div>
                <p className="text-xs text-muted font-medium">
                  Tonight&apos;s audio
                </p>
                <p className="text-sm font-medium">{tonightPlan.audioPreset}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-dim" />
          </div>
        </div>
      </motion.div>

      {/* Environment Status */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <h3 className="text-sm font-medium text-muted mb-4">
            Environment
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <EnvironmentTile
              icon={<Thermometer size={16} />}
              label="Temperature"
              value={`${currentEnvironment.temperature}°F`}
              accent="text-peach"
            />
            <EnvironmentTile
              icon={<Lightbulb size={16} />}
              label="Lights"
              value={`${currentEnvironment.lightLevel}%`}
              accent="text-amber"
            />
            <EnvironmentTile
              icon={<Volume2 size={16} />}
              label="Noise"
              value={currentEnvironment.soundLevel}
              accent="text-lavender"
            />
            <EnvironmentTile
              icon={<span className="text-xs font-mono">CO₂</span>}
              label="Air Quality"
              value={`${currentEnvironment.co2} ppm`}
              accent="text-mint"
            />
          </div>
        </div>
      </motion.div>

      {/* Connected Devices */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted">
              Connected Devices
            </h3>
            <Link
              href="/settings/devices"
              className="text-xs text-amber font-medium hover:underline"
            >
              Manage
            </Link>
          </div>
          <div className="space-y-3">
            {devices.slice(0, 3).map((device) => (
              <div
                key={device.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center">
                    {device.type === "buds" ? (
                      <Bluetooth size={14} className="text-amber" />
                    ) : device.type === "hub" ? (
                      <Moon size={14} className="text-lavender" />
                    ) : (
                      <Lightbulb size={14} className="text-peach" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{device.name}</p>
                    <p className="text-xs text-muted">{device.state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {device.battery && (
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <Battery size={12} />
                      {device.battery}%
                    </span>
                  )}
                  <div
                    className={`w-2 h-2 rounded-full ${
                      device.connected ? "bg-mint" : "bg-dim"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sleep Debt Context */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card/50 border border-border p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center shrink-0">
            <Moon size={14} className="text-muted" />
          </div>
          <p className="text-xs text-muted leading-relaxed">
            You&apos;re carrying about{" "}
            <span className="text-foreground font-medium">
              {tonightPlan.sleepDebt}
            </span>{" "}
            of sleep debt. Tonight&apos;s plan factors this in — no pressure,
            just an earlier wind-down suggestion.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EnvironmentTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.02]">
      <span className={accent}>{icon}</span>
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
