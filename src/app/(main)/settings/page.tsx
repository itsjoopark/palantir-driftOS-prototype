"use client";

import { motion } from "framer-motion";
import {
  User,
  Bluetooth,
  Volume2,
  Moon,
  ChevronRight,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
} as const;

const settingsSections = [
  {
    title: "Profile",
    items: [
      { href: "/settings/profile", icon: User, label: "Sleep Profile", desc: "Chronotype, preferences, goals" },
    ],
  },
  {
    title: "Devices",
    items: [
      { href: "/settings/devices", icon: Bluetooth, label: "Device Management", desc: "Buds, Hub, connected devices" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { href: "/settings/audio", icon: Volume2, label: "Audio & Content", desc: "Wind-down audio, sound masking" },
      { href: "/settings/environment", icon: Moon, label: "Environment Presets", desc: "Light, temperature, timing" },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/settings/privacy", icon: Shield, label: "Privacy & Data", desc: "Data export, permissions" },
      { href: "/settings/help", icon: HelpCircle, label: "Help & Support", desc: "FAQ, contact, tutorials" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={fadeUp} className="pt-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Settings
        </h1>
      </motion.div>

      {/* User Card */}
      <motion.div variants={fadeUp}>
        <div className="rounded-2xl bg-card border border-border p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-elevated flex items-center justify-center text-lg font-semibold text-muted">
            JP
          </div>
          <div className="flex-1">
            <p className="font-semibold">Jules Park</p>
            <p className="text-sm text-muted">Sleep profile active since Feb 2026</p>
          </div>
          <ChevronRight size={16} className="text-dim" />
        </div>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section) => (
        <motion.div key={section.title} variants={fadeUp}>
          <h3 className="text-xs font-medium text-dim uppercase tracking-wider mb-2 px-1">
            {section.title}
          </h3>
          <div className="rounded-2xl bg-card border border-border overflow-hidden divide-y divide-border">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-elevated flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted truncate">{item.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-dim shrink-0" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Sign Out */}
      <motion.div variants={fadeUp}>
        <button className="w-full rounded-2xl bg-card border border-border p-4 flex items-center gap-3 hover:bg-white/[0.02] transition-colors text-left">
          <div className="w-9 h-9 rounded-xl bg-elevated flex items-center justify-center">
            <LogOut size={16} className="text-peach" />
          </div>
          <span className="text-sm font-medium text-peach">Sign Out</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
