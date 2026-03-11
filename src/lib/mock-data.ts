export interface DeviceStatus {
  name: string;
  type: "buds" | "hub" | "light" | "thermostat" | "speaker";
  connected: boolean;
  battery?: number;
  state?: string;
}

export interface EnvironmentState {
  lightLevel: number;
  colorTemp: number;
  temperature: number;
  targetTemp: number;
  soundLevel: string;
  co2: number;
  humidity: number;
}

export interface BrainDrainItem {
  id: string;
  text: string;
  category: "task" | "worry" | "idea" | "reminder";
  timestamp: string;
}

export interface SleepPhase {
  time: string;
  phase: "awake" | "wind-down" | "light" | "deep" | "rem";
  hr: number;
  hrv: number;
}

export interface NightSummary {
  date: string;
  sleepOnset: string;
  wakeTime: string;
  totalHours: number;
  phases: SleepPhase[];
  insight: string;
  adjustmentForTonight: string;
}

export interface WeekDay {
  day: string;
  date: string;
  sleepStart: string;
  sleepEnd: string;
  quality: "restful" | "moderate" | "light";
}

export const devices: DeviceStatus[] = [
  { name: "Drift Buds", type: "buds", connected: true, battery: 85, state: "Ready" },
  { name: "Bedside Hub", type: "hub", connected: true, state: "Monitoring" },
  { name: "Bedroom Lights", type: "light", connected: true, state: "Warm 40%" },
  { name: "Ecobee Thermostat", type: "thermostat", connected: true, state: "68°F" },
  { name: "Living Room Lights", type: "light", connected: true, state: "Off" },
];

export const currentEnvironment: EnvironmentState = {
  lightLevel: 40,
  colorTemp: 2200,
  temperature: 68,
  targetTemp: 66,
  soundLevel: "Quiet",
  co2: 480,
  humidity: 45,
};

export const brainDrainItems: BrainDrainItem[] = [
  { id: "1", text: "Email the design team about the new mockups", category: "task", timestamp: "10:32 PM" },
  { id: "2", text: "Did I lock the front door?", category: "worry", timestamp: "10:34 PM" },
  { id: "3", text: "Podcast concept about sleep architecture", category: "idea", timestamp: "10:35 PM" },
  { id: "4", text: "Pick up prescription tomorrow morning", category: "reminder", timestamp: "10:37 PM" },
  { id: "5", text: "What if we redesigned the onboarding flow?", category: "idea", timestamp: "10:38 PM" },
];

export const tonightPlan = {
  windDownTime: "10:15 PM",
  suggestedBedtime: "11:00 PM",
  wakeWindow: { start: "6:30 AM", end: "7:00 AM" },
  sleepDebt: "45 min",
  tomorrowFirstEvent: "9:00 AM — Team standup",
  audioPreset: "Narrative — How Paper is Made",
  environmentPlan: {
    lightsStartDim: "9:45 PM",
    targetTemp: "66°F",
    soundMask: "Adaptive rain",
  },
};

export const lastNight: NightSummary = {
  date: "March 10, 2026",
  sleepOnset: "11:12 PM",
  wakeTime: "6:48 AM",
  totalHours: 7.6,
  phases: [
    { time: "10:15 PM", phase: "awake", hr: 72, hrv: 45 },
    { time: "10:45 PM", phase: "wind-down", hr: 68, hrv: 50 },
    { time: "11:12 PM", phase: "light", hr: 62, hrv: 58 },
    { time: "11:45 PM", phase: "deep", hr: 56, hrv: 65 },
    { time: "12:30 AM", phase: "deep", hr: 54, hrv: 68 },
    { time: "1:15 AM", phase: "rem", hr: 60, hrv: 55 },
    { time: "2:00 AM", phase: "light", hr: 58, hrv: 60 },
    { time: "2:45 AM", phase: "deep", hr: 55, hrv: 66 },
    { time: "3:30 AM", phase: "rem", hr: 61, hrv: 52 },
    { time: "4:15 AM", phase: "light", hr: 57, hrv: 58 },
    { time: "5:00 AM", phase: "deep", hr: 54, hrv: 64 },
    { time: "5:45 AM", phase: "rem", hr: 62, hrv: 50 },
    { time: "6:30 AM", phase: "light", hr: 64, hrv: 48 },
    { time: "6:48 AM", phase: "awake", hr: 70, hrv: 44 },
  ],
  insight: "When your room hit 65°F, you entered deep sleep 12 minutes faster than your average.",
  adjustmentForTonight: "Drift will target 65°F tonight instead of 66°F to see if this pattern holds.",
};

export const weekData: WeekDay[] = [
  { day: "Mon", date: "Mar 5", sleepStart: "11:20 PM", sleepEnd: "6:45 AM", quality: "moderate" },
  { day: "Tue", date: "Mar 6", sleepStart: "11:45 PM", sleepEnd: "7:10 AM", quality: "light" },
  { day: "Wed", date: "Mar 7", sleepStart: "10:55 PM", sleepEnd: "6:30 AM", quality: "restful" },
  { day: "Thu", date: "Mar 8", sleepStart: "11:30 PM", sleepEnd: "7:00 AM", quality: "moderate" },
  { day: "Fri", date: "Mar 9", sleepStart: "12:15 AM", sleepEnd: "8:00 AM", quality: "light" },
  { day: "Sat", date: "Mar 10", sleepStart: "11:12 PM", sleepEnd: "6:48 AM", quality: "restful" },
  { day: "Sun", date: "Mar 11", sleepStart: "—", sleepEnd: "—", quality: "moderate" },
];

export const weeklyObservations = [
  "Your sleep timing shifted about 25 minutes earlier compared to last week. The consistency is improving.",
  "Wednesday and Saturday had the most restful patterns — both nights you started wind-down before 11 PM.",
  "Friday was a later night. Drift adjusted Saturday's plan to account for it, and Saturday went well.",
];

export function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

export function getGreeting(): string {
  const tod = getTimeOfDay();
  switch (tod) {
    case "morning": return "Good morning";
    case "afternoon": return "Good afternoon";
    case "evening": return "Good evening";
    case "night": return "Winding down";
  }
}
