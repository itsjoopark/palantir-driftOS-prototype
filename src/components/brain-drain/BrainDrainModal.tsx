"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Check, X } from "lucide-react";

const simulatedThoughts = [
  { text: "Email the design team about the new mockups", category: "task" as const },
  { text: "Did I lock the front door?", category: "worry" as const },
  { text: "Podcast concept about sleep architecture", category: "idea" as const },
  { text: "Pick up prescription tomorrow morning", category: "reminder" as const },
];

const categoryLabels = {
  task: "Task → Morning to-do",
  worry: "Worry → Acknowledged",
  idea: "Idea → Saved",
  reminder: "Reminder → Morning to-do",
};

const categoryColors = {
  task: "text-amber bg-amber/10",
  worry: "text-peach bg-peach/10",
  idea: "text-lavender bg-lavender/10",
  reminder: "text-mint bg-mint/10",
};

export default function BrainDrainModal({ onClose }: { onClose: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [capturedItems, setCapturedItems] = useState<typeof simulatedThoughts>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isRecording || capturedItems.length >= simulatedThoughts.length) return;

    const nextItem = simulatedThoughts[capturedItems.length];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= nextItem.text.length) {
        setCurrentTranscript(nextItem.text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCapturedItems((prev) => [...prev, nextItem]);
          setCurrentTranscript("");
          if (capturedItems.length + 1 >= simulatedThoughts.length) {
            setIsRecording(false);
            setIsDone(true);
          }
        }, 500);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [isRecording, capturedItems.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex flex-col"
    >
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Brain Drain</h2>
            <p className="text-xs text-muted mt-0.5">
              Speak your thoughts — they&apos;ll be waiting in the morning
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-elevated flex items-center justify-center text-muted hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Captured Items */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-6">
          {capturedItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl bg-card border border-border p-4"
            >
              <p className="text-sm">{item.text}</p>
              <span
                className={`inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[item.category]}`}
              >
                {categoryLabels[item.category]}
              </span>
            </motion.div>
          ))}

          {/* Live transcript */}
          {isRecording && currentTranscript && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl bg-card/50 border border-amber/20 p-4"
            >
              <p className="text-sm text-muted">
                {currentTranscript}
                <span className="inline-block w-0.5 h-4 bg-amber ml-0.5 animate-pulse align-middle" />
              </p>
            </motion.div>
          )}

          {isDone && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-mint/10 border border-mint/20 p-4 text-center"
            >
              <Check size={20} className="text-mint mx-auto mb-2" />
              <p className="text-sm font-medium text-mint">
                Got it. These will be here in the morning.
              </p>
            </motion.div>
          )}
        </div>

        {/* Mic Button */}
        <div className="flex flex-col items-center gap-3 pb-4">
          {/* Waveform visualization */}
          {isRecording && (
            <div className="flex items-center gap-[2px] h-8 w-48">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-amber/40 rounded-full min-w-[2px]"
                  animate={{
                    height: [
                      `${4 + Math.random() * 20}px`,
                      `${4 + Math.random() * 28}px`,
                      `${4 + Math.random() * 20}px`,
                    ],
                  }}
                  transition={{
                    duration: 0.6 + Math.random() * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.03,
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => {
              if (isDone) {
                onClose();
                return;
              }
              setIsRecording(!isRecording);
            }}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDone
                ? "bg-mint/20 text-mint"
                : isRecording
                ? "bg-amber/20 text-amber animate-pulse-glow"
                : "bg-elevated text-muted hover:text-foreground hover:bg-amber/15"
            }`}
          >
            {isDone ? (
              <Check size={24} />
            ) : isRecording ? (
              <MicOff size={24} />
            ) : (
              <Mic size={24} />
            )}
          </button>
          <p className="text-xs text-muted">
            {isDone
              ? "Tap to close"
              : isRecording
              ? "Tap to stop"
              : "Tap to start speaking"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
