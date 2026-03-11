# driftOS — Sleep Operating System Prototype

An interactive prototype for **Drift**, an adaptive Sleep Operating System that orchestrates digital and physical environments to guide users from wakefulness to restful sleep. Designed with a primary focus on neurodivergent users (ADHD).

## Running the Prototype

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — routes to the **Tonight** dashboard.

## Screens

| Route | Screen | Description |
|-------|--------|-------------|
| `/tonight` | Dashboard | Tonight's wind-down plan, device status, environment |
| `/tonight/wind-down` | Wind-Down Flow | Animated cascade, audio player, Brain Drain, phone handoff |
| `/tonight/sleep` | Sleep Mode Lock | Breathing exercise, dim clock, unlock friction |
| `/insights/debrief` | Morning Debrief | Night timeline, visual summary, insight card, Brain Drain to-dos |
| `/insights/weekly` | Weekly View | 7-day rhythm visualization, trend indicators, AI observations |
| `/insights/brain-drain` | Brain Drain History | Categorized captured thoughts from wind-down |
| `/settings` | Settings | Profile, devices, preferences, account |
| `/settings/devices` | Device Management | Buds, Hub, smart home devices, environment test |
| `/settings/profile` | Sleep Profile | Chronotype, behavioral signals, ADHD support |
| `/onboarding` | Onboarding | Welcome, device pairing, audio preferences |

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (custom warm dark palette)
- **Framer Motion** (animations, transitions, breathing circle)
- **Zustand** (prototype state management)
- **Lucide React** (icons)

## Design Principles

- **No scores, no shame** — no numbers, grades, streaks, or guilt language
- **Low friction** — environment leads, minimal user action
- **Warm palette** — amber/orange accents on deep dark base
- **Progressive simplification** — UI reduces density as bedtime approaches
- **WCAG 2.1 AA** — accessible, high contrast, screen reader friendly
