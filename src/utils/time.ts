import { CountdownLabels, TimeRemaining } from '../types';

export const DEFAULT_LABELS: Required<CountdownLabels> = {
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
  millis: 'Millis'
};

export function parseTargetTime(target?: Date | string | number | null): number | null {
  if (target === undefined || target === null) return null;
  if (typeof target === 'number') return target;
  if (target instanceof Date) return target.getTime();
  const parsed = new Date(target).getTime();
  return isNaN(parsed) ? null : parsed;
}

export function padZero(value: number, length: number = 2): string {
  return String(Math.max(0, Math.floor(value))).padStart(length, '0');
}

export function calculateTimeRemaining(
  targetTimestamp: number,
  nowTimestamp: number = Date.now(),
  startDurationMs?: number
): TimeRemaining {
  const diff = targetTimestamp - nowTimestamp;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      totalSeconds: 0,
      totalMilliseconds: 0,
      isCompleted: true,
      progress: 1
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const milliseconds = Math.floor(diff % 1000);
  const totalSeconds = Math.floor(diff / 1000);

  let progress = 0;
  if (startDurationMs && startDurationMs > 0) {
    progress = Math.min(1, Math.max(0, 1 - diff / startDurationMs));
  } else {
    // Cyclic progress based on 24h/60m/60s
    progress = 1 - (seconds / 60);
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    totalSeconds,
    totalMilliseconds: diff,
    isCompleted: false,
    progress
  };
}
