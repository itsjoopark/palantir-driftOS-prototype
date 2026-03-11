import { create } from "zustand";

export type AppPhase = "dashboard" | "wind-down" | "sleep" | "morning";
export type WindDownStage = "initiating" | "active" | "handoff" | "complete";

interface DriftState {
  phase: AppPhase;
  windDownStage: WindDownStage;
  windDownProgress: number;
  isRecordingBrainDrain: boolean;
  brainDrainTranscript: string[];
  onboardingComplete: boolean;
  currentAudio: string | null;
  environmentOverrides: {
    lightLevel?: number;
    temperature?: number;
  };

  setPhase: (phase: AppPhase) => void;
  setWindDownStage: (stage: WindDownStage) => void;
  setWindDownProgress: (progress: number) => void;
  startBrainDrain: () => void;
  stopBrainDrain: () => void;
  addBrainDrainItem: (text: string) => void;
  completeOnboarding: () => void;
  setCurrentAudio: (audio: string | null) => void;
  setEnvironmentOverride: (key: "lightLevel" | "temperature", value: number) => void;
  resetTonight: () => void;
}

export const useDriftStore = create<DriftState>((set) => ({
  phase: "dashboard",
  windDownStage: "initiating",
  windDownProgress: 0,
  isRecordingBrainDrain: false,
  brainDrainTranscript: [],
  onboardingComplete: false,
  currentAudio: null,
  environmentOverrides: {},

  setPhase: (phase) => set({ phase }),
  setWindDownStage: (stage) => set({ windDownStage: stage }),
  setWindDownProgress: (progress) => set({ windDownProgress: progress }),
  startBrainDrain: () => set({ isRecordingBrainDrain: true }),
  stopBrainDrain: () => set({ isRecordingBrainDrain: false }),
  addBrainDrainItem: (text) =>
    set((state) => ({
      brainDrainTranscript: [...state.brainDrainTranscript, text],
    })),
  completeOnboarding: () => set({ onboardingComplete: true }),
  setCurrentAudio: (audio) => set({ currentAudio: audio }),
  setEnvironmentOverride: (key, value) =>
    set((state) => ({
      environmentOverrides: { ...state.environmentOverrides, [key]: value },
    })),
  resetTonight: () =>
    set({
      phase: "dashboard",
      windDownStage: "initiating",
      windDownProgress: 0,
      isRecordingBrainDrain: false,
      brainDrainTranscript: [],
      currentAudio: null,
      environmentOverrides: {},
    }),
}));
