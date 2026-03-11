"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bluetooth,
  Battery,
  Wifi,
  Thermometer,
  Wind,
  Eye,
  Volume2,
  Lightbulb,
  Plus,
  Check,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { devices, currentEnvironment } from "@/lib/mock-data";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
} as const;

export default function DeviceManagementPage() {
  const [testingEnvironment, setTestingEnvironment] = useState(false);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="pt-2">
        <div className="flex items-center gap-3">
          <Link
            href="/settings"
            className="text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>
        </div>
      </motion.div>

      {/* Drift Buds */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber/10 flex items-center justify-center shrink-0">
              <Bluetooth size={22} className="text-amber" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Drift Buds</h3>
                <span className="text-[10px] font-medium text-mint bg-mint/10 px-1.5 py-0.5 rounded-full">
                  Connected
                </span>
              </div>
              <p className="text-sm text-muted mt-0.5">Firmware v2.1.3</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="rounded-xl bg-white/[0.03] p-3 text-center">
              <Battery size={16} className="text-amber mx-auto mb-1.5" />
              <p className="text-sm font-semibold">85%</p>
              <p className="text-[10px] text-dim">Battery</p>
            </div>
            <div className="rounded-xl bg-white/[0.03] p-3 text-center">
              <Wifi size={16} className="text-lavender mx-auto mb-1.5" />
              <p className="text-sm font-semibold">Strong</p>
              <p className="text-[10px] text-dim">Signal</p>
            </div>
            <div className="rounded-xl bg-white/[0.03] p-3 text-center">
              <Check size={16} className="text-mint mx-auto mb-1.5" />
              <p className="text-sm font-semibold">Good</p>
              <p className="text-[10px] text-dim">Fit Check</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bedside Hub */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-lavender/10 flex items-center justify-center shrink-0">
              <Eye size={22} className="text-lavender" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Bedside Hub</h3>
                <span className="text-[10px] font-medium text-mint bg-mint/10 px-1.5 py-0.5 rounded-full">
                  Monitoring
                </span>
              </div>
              <p className="text-sm text-muted mt-0.5">Firmware v1.4.0</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <SensorReading
              icon={<span className="text-[10px] font-mono font-bold">CO₂</span>}
              label="CO₂"
              value={`${currentEnvironment.co2} ppm`}
              color="text-mint"
            />
            <SensorReading
              icon={<Lightbulb size={14} />}
              label="Light"
              value={`${currentEnvironment.lightLevel} lux`}
              color="text-amber"
            />
            <SensorReading
              icon={<Volume2 size={14} />}
              label="Noise"
              value={currentEnvironment.soundLevel}
              color="text-lavender"
            />
            <SensorReading
              icon={<Wind size={14} />}
              label="Humidity"
              value={`${currentEnvironment.humidity}%`}
              color="text-peach"
            />
          </div>
        </div>
      </motion.div>

      {/* Connected Devices */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted">
              Smart Home Devices
            </h3>
            <button className="flex items-center gap-1.5 text-xs text-amber font-medium hover:underline">
              <Plus size={12} />
              Add device
            </button>
          </div>
          <div className="space-y-3">
            {devices
              .filter((d) => d.type !== "buds" && d.type !== "hub")
              .map((device) => (
                <div
                  key={device.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-elevated flex items-center justify-center">
                      {device.type === "light" ? (
                        <Lightbulb size={14} className="text-amber" />
                      ) : device.type === "thermostat" ? (
                        <Thermometer size={14} className="text-peach" />
                      ) : (
                        <Volume2 size={14} className="text-lavender" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{device.name}</p>
                      <p className="text-xs text-muted">{device.state}</p>
                    </div>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      device.connected ? "bg-mint" : "bg-dim"
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>
      </motion.div>

      {/* Environment Test */}
      <motion.div variants={fadeUp}>
        <button
          onClick={() => {
            setTestingEnvironment(true);
            setTimeout(() => setTestingEnvironment(false), 3000);
          }}
          className="w-full rounded-2xl bg-card border border-amber/20 p-5 text-center hover:border-amber/40 transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <RefreshCw
              size={16}
              className={`text-amber ${testingEnvironment ? "animate-spin" : ""}`}
            />
            <span className="text-sm font-medium text-amber">
              {testingEnvironment
                ? "Running environment test..."
                : "Preview tonight's transitions"}
            </span>
          </div>
          <p className="text-xs text-muted mt-1.5">
            See what lights, temperature, and sound changes will look like
          </p>
        </button>
      </motion.div>
    </motion.div>
  );
}

function SensorReading({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3">
      <span className={color}>{icon}</span>
      <p className="text-sm font-semibold mt-1.5">{value}</p>
      <p className="text-[10px] text-dim">{label}</p>
    </div>
  );
}
