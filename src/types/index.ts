import React from 'react';

export type CountdownType =
  | 'flip'
  | 'circular'
  | 'cyberpunk'
  | 'digital'
  | 'glassmorphism'
  | 'minimal'
  | 'arcade'
  | 'luxury'
  | 'neumorphic'
  | 'compact';

export type CountdownSize = 'sm' | 'md' | 'lg' | 'xl';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalSeconds: number;
  totalMilliseconds: number;
  isCompleted: boolean;
  progress: number; // 0 to 1 progress ratio (if target or initialSeconds known)
}

export interface CountdownLabels {
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  millis?: string;
}

export interface BaseCountdownThemeProps {
  time: TimeRemaining;
  size?: CountdownSize;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  showMilliseconds?: boolean;
  padWithZero?: boolean;
  labels?: CountdownLabels;
  showLabels?: boolean;
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface CountdownProps {
  /** Target date as Date object, ISO string, or epoch timestamp */
  targetDate?: Date | string | number;
  /** Or initial duration in seconds */
  initialSeconds?: number;
  /** Visual theme variant (10 distinct types) */
  type?: CountdownType;
  /** Scale sizing */
  size?: CountdownSize;
  /** Visibility toggles */
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  showMilliseconds?: boolean;
  /** Format with leading zeros e.g. "05" vs "5" */
  padWithZero?: boolean;
  /** Custom label localization */
  labels?: CountdownLabels;
  /** Show or hide labels underneath/above segments */
  showLabels?: boolean;
  /** Optional title header displayed above the clock */
  title?: string;
  /** Optional subtitle or event detail */
  subtitle?: string;
  /** Primary accent color override */
  primaryColor?: string;
  /** Secondary highlight color override */
  secondaryColor?: string;
  /** Card / container background override */
  backgroundColor?: string;
  /** Text color override */
  textColor?: string;
  /** Accent glow / border color */
  accentColor?: string;
  /** Called once when timer reaches zero */
  onComplete?: () => void;
  /** Called on every tick with remaining time */
  onTick?: (timeRemaining: TimeRemaining) => void;
  /** Content to display when countdown has completed */
  completedContent?: React.ReactNode;
  /** Pause countdown tick */
  paused?: boolean;
  /** Additional custom class names */
  className?: string;
  /** Custom inline CSS style overrides */
  style?: React.CSSProperties;
}

export interface UseCountdownOptions {
  targetDate?: Date | string | number;
  initialSeconds?: number;
  interval?: number; // default: 1000 or 50 if ms enabled
  onComplete?: () => void;
  onTick?: (timeRemaining: TimeRemaining) => void;
  paused?: boolean;
  includeMilliseconds?: boolean;
}

export interface UseCountdownReturn extends TimeRemaining {
  isRunning: boolean;
  pause: () => void;
  resume: () => void;
  reset: (newTargetDate?: Date | string | number | null, newInitialSeconds?: number) => void;
  formatted: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    milliseconds: string;
  };
}
