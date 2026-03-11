"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function SleepModePage() {
  const [time, setTime] = useState("");
  const [showUnlock, setShowUnlock] = useState(false);
  const [unlockProgress, setUnlockProgress] = useState(0);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathCount, setBreathCount] = useState(4);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const phases: Array<{ phase: "inhale" | "hold" | "exhale"; duration: number; count: number }> = [
      { phase: "inhale", duration: 4000, count: 4 },
      { phase: "hold", duration: 7000, count: 7 },
      { phase: "exhale", duration: 8000, count: 8 },
    ];

    let phaseIndex = 0;
    let countdownInterval: NodeJS.Timeout;

    const runPhase = () => {
      const current = phases[phaseIndex];
      setBreathPhase(current.phase);
      setBreathCount(current.count);

      let remaining = current.count;
      countdownInterval = setInterval(() => {
        remaining--;
        if (remaining >= 0) setBreathCount(remaining);
      }, current.duration / current.count);

      setTimeout(() => {
        clearInterval(countdownInterval);
        phaseIndex = (phaseIndex + 1) % phases.length;
        runPhase();
      }, current.duration);
    };

    runPhase();
    return () => clearInterval(countdownInterval);
  }, []);

  const handleSwipeUp = () => {
    setShowUnlock(true);
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center select-none">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />

      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full max-w-md mx-auto px-6 py-12">
        {/* Time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-center pt-8"
        >
          <h1 className="text-6xl sm:text-7xl font-extralight tracking-tight text-foreground/70 tabular-nums">
            {time}
          </h1>
        </motion.div>

        {/* Breathing Circle */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-amber/10"
              animate={{
                scale: breathPhase === "inhale" ? 1.2 : breathPhase === "hold" ? 1.2 : 1,
                borderColor:
                  breathPhase === "inhale"
                    ? "rgba(232, 168, 76, 0.2)"
                    : breathPhase === "hold"
                    ? "rgba(232, 168, 76, 0.15)"
                    : "rgba(232, 168, 76, 0.08)",
              }}
              transition={{
                duration:
                  breathPhase === "inhale" ? 4 : breathPhase === "hold" ? 0.3 : 8,
                ease: "easeInOut",
              }}
            />

            {/* Inner circle */}
            <motion.div
              className="w-32 h-32 rounded-full bg-amber/5 flex items-center justify-center"
              animate={{
                scale: breathPhase === "inhale" ? 1.3 : breathPhase === "hold" ? 1.3 : 0.8,
                backgroundColor:
                  breathPhase === "inhale"
                    ? "rgba(232, 168, 76, 0.08)"
                    : breathPhase === "hold"
                    ? "rgba(232, 168, 76, 0.1)"
                    : "rgba(232, 168, 76, 0.04)",
              }}
              transition={{
                duration:
                  breathPhase === "inhale" ? 4 : breathPhase === "hold" ? 0.3 : 8,
                ease: "easeInOut",
              }}
            >
              <div className="text-center">
                <p className="text-2xl font-light text-amber/60 tabular-nums">
                  {breathCount}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.p
            key={breathPhase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted/60 font-light tracking-wide"
          >
            {breathPhase === "inhale"
              ? "Breathe in"
              : breathPhase === "hold"
              ? "Hold"
              : "Breathe out"}
          </motion.p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4 pb-4">
          <p className="text-xs text-dim/60">Back to sleep</p>
          <button
            onClick={handleSwipeUp}
            className="flex flex-col items-center gap-1 text-dim/40 hover:text-muted transition-colors"
          >
            <ChevronUp size={20} />
            <ChevronUp size={20} className="-mt-3" />
          </button>
        </div>
      </div>

      {/* Unlock Confirmation */}
      <AnimatePresence>
        {showUnlock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center"
          >
            <div className="text-center px-8 max-w-sm">
              <Moon size={32} className="text-amber/40 mx-auto mb-4" />
              <h2 className="text-lg font-medium mb-2">
                It&apos;s still nighttime
              </h2>
              <p className="text-sm text-muted mb-8">
                Your environment is optimized for sleep. Unlocking will
                interrupt your rest cycle.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setShowUnlock(false)}
                  className="w-full py-3 px-6 rounded-xl bg-amber/15 text-amber font-medium text-sm hover:bg-amber/25 transition-colors"
                >
                  Go back to sleep
                </button>
                <Link
                  href="/tonight"
                  className="block w-full py-3 px-6 rounded-xl bg-elevated text-muted text-sm hover:text-foreground transition-colors"
                >
                  Unlock anyway
                </Link>

                {/* Swipe-to-unlock with friction */}
                <div className="relative mt-4 h-12 bg-elevated rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-amber/20 rounded-full transition-all"
                    style={{ width: `${unlockProgress}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={unlockProgress}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setUnlockProgress(val);
                    }}
                    onMouseUp={() => {
                      if (unlockProgress < 90) setUnlockProgress(0);
                    }}
                    onTouchEnd={() => {
                      if (unlockProgress < 90) setUnlockProgress(0);
                    }}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-xs text-dim">
                      {unlockProgress > 80
                        ? "Release to unlock"
                        : "Slide to force unlock"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
