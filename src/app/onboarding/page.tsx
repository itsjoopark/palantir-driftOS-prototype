"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Bluetooth, Wifi, Volume2, ArrowRight, Check, Headphones } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: "welcome",
    title: "Welcome to Drift",
    subtitle: "Your sleep, orchestrated.",
    description:
      "Drift coordinates your environment — lights, temperature, sound — to guide you from wakefulness to restful sleep. One action triggers everything.",
    icon: Moon,
    color: "amber",
  },
  {
    id: "buds",
    title: "Connect Drift Buds",
    subtitle: "Your bedtime companion.",
    description:
      "Drift Buds replace your phone as the last thing you experience before sleep. They track your biometrics and deliver personalized audio.",
    icon: Headphones,
    color: "amber",
    action: "Pair Drift Buds",
  },
  {
    id: "hub",
    title: "Set Up Bedside Hub",
    subtitle: "Your room's awareness.",
    description:
      "The Hub monitors CO₂, light, noise, and humidity. It bridges your smart home devices for coordinated wind-downs.",
    icon: Wifi,
    color: "lavender",
    action: "Connect Hub",
  },
  {
    id: "devices",
    title: "Smart Home Devices",
    subtitle: "Lights and thermostat.",
    description:
      "Connect your smart lights and thermostat so Drift can orchestrate your environment automatically. This step is optional.",
    icon: Bluetooth,
    color: "peach",
    action: "Scan for Devices",
    optional: true,
  },
  {
    id: "audio",
    title: "Wind-Down Audio",
    subtitle: "Choose your style.",
    description:
      "Pick what helps your brain transition. Not meditation — interesting content that gently fades. You can always change this later.",
    icon: Volume2,
    color: "lavender",
    options: [
      { id: "narrative", label: "Narrative Stories", desc: "Low-stakes, interesting, tapering" },
      { id: "soundscape", label: "Adaptive Soundscapes", desc: "Rain, nature, ambient" },
      { id: "bilateral", label: "Bilateral Stimulation", desc: "Left-right calming tones" },
      { id: "breathing", label: "Breathing Guides", desc: "Audio-led breathing patterns" },
    ],
  },
  {
    id: "ready",
    title: "You're all set",
    subtitle: "Drift will learn your patterns.",
    description:
      "No scores. No shame. Just a system that meets you where you are. Your first wind-down plan is ready.",
    icon: Check,
    color: "mint",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [selectedAudio, setSelectedAudio] = useState<string>("narrative");

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleAction = () => {
    if (step.action && !connected[step.id]) {
      setConnecting(true);
      setTimeout(() => {
        setConnecting(false);
        setConnected((prev) => ({ ...prev, [step.id]: true }));
      }, 2000);
      return;
    }
    handleNext();
  };

  const handleNext = () => {
    if (isLast) {
      router.push("/tonight");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const colorMap: Record<string, string> = {
    amber: "text-amber",
    lavender: "text-lavender",
    peach: "text-peach",
    mint: "text-mint",
  };

  const bgMap: Record<string, string> = {
    amber: "bg-amber/10",
    lavender: "bg-lavender/10",
    peach: "bg-peach/10",
    mint: "bg-mint/10",
  };

  const Icon = step.icon;

  return (
    <div className="min-h-dvh bg-background flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= currentStep ? "bg-amber" : "bg-elevated"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="text-center w-full"
          >
            {/* Icon */}
            <motion.div
              className={`w-20 h-20 rounded-3xl ${bgMap[step.color]} flex items-center justify-center mx-auto mb-6`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              <Icon size={32} className={colorMap[step.color]} />
            </motion.div>

            <h1 className="text-2xl font-semibold tracking-tight mb-1.5">
              {step.title}
            </h1>
            <p className={`text-sm font-medium ${colorMap[step.color]} mb-3`}>
              {step.subtitle}
            </p>
            <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">
              {step.description}
            </p>

            {/* Audio options */}
            {step.options && (
              <div className="mt-6 space-y-2 text-left">
                {step.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedAudio(option.id)}
                    className={`w-full p-3.5 rounded-xl border transition-all ${
                      selectedAudio === option.id
                        ? "border-amber/40 bg-amber-dim"
                        : "border-border bg-card hover:border-border-medium"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        selectedAudio === option.id ? "text-amber" : ""
                      }`}
                    >
                      {option.label}
                    </p>
                    <p className="text-xs text-muted mt-0.5">{option.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Connection status */}
            {step.action && connected[step.id] && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center justify-center gap-2 text-sm text-mint"
              >
                <Check size={16} />
                <span>Connected successfully</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom actions */}
      <div className="px-6 pb-8 max-w-md mx-auto w-full space-y-3">
        {step.action && !connected[step.id] ? (
          <button
            onClick={handleAction}
            disabled={connecting}
            className="w-full py-3.5 rounded-xl bg-amber text-background font-semibold text-sm transition-all hover:bg-amber/90 disabled:opacity-60"
          >
            {connecting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                Connecting...
              </span>
            ) : (
              step.action
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl bg-amber text-background font-semibold text-sm transition-all hover:bg-amber/90 flex items-center justify-center gap-2"
          >
            {isLast ? "Start Using Drift" : "Continue"}
            <ArrowRight size={16} />
          </button>
        )}

        {step.optional && !connected[step.id] && (
          <button
            onClick={handleNext}
            className="w-full py-3 text-sm text-muted hover:text-foreground transition-colors"
          >
            Skip for now
          </button>
        )}

        {step.action && connected[step.id] && (
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl bg-amber text-background font-semibold text-sm transition-all hover:bg-amber/90 flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
