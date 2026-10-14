# ⏱️ Universal Countdown Clock (`universal-countdown-clock`)

> A versatile, production-ready, beautifully designed countdown clock component for React with **10 distinct visual themes**, rich customizable props, zero UI runtime dependencies, and a headless React hook.

[![npm version](https://img.shields.io/npm/v/universal-countdown-clock.svg)](https://www.npmjs.com/package/universal-countdown-clock)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

## ✨ Features

- 🎨 **10 Totally Distinct Themes Built-in**:
  1. `flip`: 3D mechanical split-flap train station / airport clock
  2. `circular`: Radial SVG progress rings with animated gradient strokes
  3. `cyberpunk`: Futuristic sci-fi HUD with scanlines, neon glow & tech telemetry
  4. `digital`: Authentic retro 7-segment LED phosphor alarm display with ghost segments
  5. `glassmorphism`: Modern frosted glass cards with specular highlight sheen
  6. `minimal`: Swiss editorial monospace typography with hairline rules
  7. `arcade`: 8-bit retro arcade gaming style with pixel badge & coin motif
  8. `luxury`: Metallic gold haute horlogerie with Roman serif styling
  9. `neumorphic`: Soft tactile 3D clay skeuomorphism with debossed digit wells
  10. `compact`: Inline live sale pill ticker with pulsing radar beacon (e-commerce ready)
- 🎛️ **Extensive Props**: Target date, duration in seconds, label customization, size scaling (`sm`, `md`, `lg`, `xl`), time segment toggles (`days`, `hours`, `minutes`, `seconds`, `milliseconds`), and custom color overrides.
- 🎣 **Headless Hook Export**: Includes `useCountdown` hook for full headless UI creation with pause, resume, reset, and millisecond accuracy.
- ⚡ **Zero Heavy Runtime Dependencies**: Vanilla CSS + React. Dual ESM & CommonJS build with full TypeScript definitions (`.d.ts`).
- 📚 **Storybook 8**: Preconfigured interactive Storybook suite for testing every theme, prop permutation, and headless hook.

---

## 📦 Installation

```bash
npm install universal-countdown-clock
# or
yarn add universal-countdown-clock
# or
pnpm add universal-countdown-clock
```

---

## 🚀 Quick Start

### 1. Import Component & Styles

```tsx
import React from 'react';
import { Countdown } from 'universal-countdown-clock';
import 'universal-countdown-clock/styles.css';

export default function App() {
  // Target date 3 days from now
  const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  return (
    <div>
      {/* 3D Flip Clock */}
      <Countdown
        targetDate={target}
        type="flip"
        size="lg"
        title="SPECIAL LAUNCH"
      />
    </div>
  );
}
```

---

## 🎨 The 10 Distinct Themes

Switch themes simply by passing the `type` prop:

```tsx
<Countdown targetDate={target} type="flip" />
<Countdown targetDate={target} type="circular" />
<Countdown targetDate={target} type="cyberpunk" />
<Countdown targetDate={target} type="digital" />
<Countdown targetDate={target} type="glassmorphism" />
<Countdown targetDate={target} type="minimal" />
<Countdown targetDate={target} type="arcade" />
<Countdown targetDate={target} type="luxury" />
<Countdown targetDate={target} type="neumorphic" />
<Countdown targetDate={target} type="compact" />
```

Direct individual imports are also available for optimal tree-shaking:
```tsx
import {
  FlipCountdown,
  CircularCountdown,
  CyberpunkCountdown,
  DigitalCountdown,
  GlassmorphismCountdown,
  MinimalCountdown,
  ArcadeCountdown,
  LuxuryCountdown,
  NeumorphicCountdown,
  CompactCountdown
} from 'universal-countdown-clock';
```

---

## 📖 Component Props API

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `targetDate` | `Date \| string \| number` | `undefined` | Target deadline (Date, ISO string, or epoch timestamp) |
| `initialSeconds` | `number` | `undefined` | Or countdown from a duration in seconds |
| `type` | `CountdownType` | `'flip'` | Theme: `'flip'`, `'circular'`, `'cyberpunk'`, `'digital'`, `'glassmorphism'`, `'minimal'`, `'arcade'`, `'luxury'`, `'neumorphic'`, `'compact'` |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Scaled sizing of numerals and cards |
| `showDays` | `boolean` | `true` | Show or hide the days segment |
| `showHours` | `boolean` | `true` | Show or hide the hours segment |
| `showMinutes` | `boolean` | `true` | Show or hide the minutes segment |
| `showSeconds` | `boolean` | `true` | Show or hide the seconds segment |
| `showMilliseconds` | `boolean` | `false` | Enable high-frequency millisecond counter |
| `padWithZero` | `boolean` | `true` | Format digits with leading zeros (e.g. `05` vs `5`) |
| `labels` | `CountdownLabels` | `{ days: 'Days', ... }` | Custom localized labels (`days`, `hours`, `minutes`, `seconds`, `millis`) |
| `showLabels` | `boolean` | `true` | Display or hide unit labels below digits |
| `title` | `string` | `undefined` | Header title displayed above countdown |
| `subtitle` | `string` | `undefined` | Subtitle text displayed below header |
| `primaryColor` | `string` | `undefined` | Primary highlight color override |
| `secondaryColor` | `string` | `undefined` | Secondary accent color override |
| `backgroundColor` | `string` | `undefined` | Card / container background override |
| `textColor` | `string` | `undefined` | Numerical text color override |
| `completedContent` | `ReactNode` | `undefined` | Content to render when countdown reaches zero |
| `onComplete` | `() => void` | `undefined` | Callback fired once when countdown reaches zero |
| `onTick` | `(time) => void` | `undefined` | Callback fired on every tick with remaining time state |
| `paused` | `boolean` | `false` | Temporarily pause the timer |
| `className` | `string` | `''` | Extra CSS class name |
| `style` | `CSSProperties` | `undefined` | Inline style overrides |

---

## 🎣 Headless `useCountdown` Hook

For headless use cases where you want 100% control over the DOM markup:

```tsx
import React from 'react';
import { useCountdown } from 'universal-countdown-clock';

export function CustomTimer() {
  const {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    formatted,
    isCompleted,
    isRunning,
    progress,
    pause,
    resume,
    reset
  } = useCountdown({
    initialSeconds: 300, // 5 minute countdown
    includeMilliseconds: true,
    onComplete: () => alert('Done!')
  });

  return (
    <div>
      <div>
        {formatted.minutes}:{formatted.seconds}.{formatted.milliseconds}
      </div>
      <div>Progress: {Math.round(progress * 100)}%</div>
      <button onClick={isRunning ? pause : resume}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
      <button onClick={() => reset(null, 300)}>Reset</button>
    </div>
  );
}
```

---

## 🧪 Testing with Storybook

The package includes a full Storybook testing suite covering all 10 themes, control playgrounds, localization, and headless hook demos.

```bash
# Start interactive Storybook server
npm run storybook

# Build static Storybook site
npm run build-storybook
```

Storybook will be accessible at `http://localhost:6006/`.

---

## 🛠️ Build & Scripts

```bash
# Compile library distribution (ESM + CommonJS + Types)
npm run build

# Run TypeScript type check
npm run type-check

# Start Storybook dev server
npm run storybook
```

---

## 📄 License

MIT © Chamika Sathsara
