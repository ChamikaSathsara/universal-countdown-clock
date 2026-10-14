import { useState, useEffect, useRef, useCallback } from 'react';
import { UseCountdownOptions, UseCountdownReturn, TimeRemaining } from '../types';
import { calculateTimeRemaining, parseTargetTime, padZero } from '../utils/time';

export function useCountdown(options: UseCountdownOptions = {}): UseCountdownReturn {
  const {
    targetDate,
    initialSeconds,
    interval: customInterval,
    onComplete,
    onTick,
    paused = false,
    includeMilliseconds = false
  } = options;

  // Track initial duration in ms for accurate progress bar calculations
  const [startDurationMs, setStartDurationMs] = useState<number | undefined>(() => {
    if (typeof initialSeconds === 'number' && initialSeconds > 0) {
      return initialSeconds * 1000;
    }
    const targetMs = parseTargetTime(targetDate);
    if (targetMs !== null) {
      const diff = targetMs - Date.now();
      return diff > 0 ? diff : undefined;
    }
    return undefined;
  });

  // Calculate target timestamp
  const [targetTimestamp, setTargetTimestamp] = useState<number>(() => {
    if (typeof initialSeconds === 'number' && initialSeconds > 0) {
      return Date.now() + initialSeconds * 1000;
    }
    const parsed = parseTargetTime(targetDate);
    // Default fallback to 24 hours in the future if none provided
    return parsed !== null ? parsed : Date.now() + 24 * 60 * 60 * 1000;
  });

  const [isPaused, setIsPaused] = useState<boolean>(paused);
  const [pauseOffset, setPauseOffset] = useState<number>(0);
  const pauseTimeRef = useRef<number | null>(null);

  // Sync external paused prop
  useEffect(() => {
    setIsPaused(paused);
  }, [paused]);

  // Sync external targetDate or initialSeconds changes
  useEffect(() => {
    if (typeof initialSeconds === 'number' && initialSeconds > 0) {
      const duration = initialSeconds * 1000;
      setStartDurationMs(duration);
      setTargetTimestamp(Date.now() + duration);
    } else {
      const parsed = parseTargetTime(targetDate);
      if (parsed !== null) {
        setTargetTimestamp(parsed);
        const diff = parsed - Date.now();
        setStartDurationMs(diff > 0 ? diff : undefined);
      }
    }
  }, [targetDate, initialSeconds]);

  const [time, setTime] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetTimestamp, Date.now(), startDurationMs)
  );

  const completedTriggeredRef = useRef<boolean>(false);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onTickRef.current = onTick;
  }, [onComplete, onTick]);

  const tick = useCallback(() => {
    if (isPaused) return;

    const now = Date.now() - pauseOffset;
    const remaining = calculateTimeRemaining(targetTimestamp, now, startDurationMs);
    setTime(remaining);

    if (onTickRef.current) {
      onTickRef.current(remaining);
    }

    if (remaining.isCompleted && !completedTriggeredRef.current) {
      completedTriggeredRef.current = true;
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }
  }, [targetTimestamp, isPaused, pauseOffset, startDurationMs]);

  useEffect(() => {
    if (time.isCompleted) return;

    const intervalMs = customInterval || (includeMilliseconds ? 50 : 1000);
    const intervalId = setInterval(tick, intervalMs);

    return () => clearInterval(intervalId);
  }, [tick, customInterval, includeMilliseconds, time.isCompleted]);

  const pause = useCallback(() => {
    if (!isPaused) {
      setIsPaused(true);
      pauseTimeRef.current = Date.now();
    }
  }, [isPaused]);

  const resume = useCallback(() => {
    if (isPaused && pauseTimeRef.current !== null) {
      const elapsedPaused = Date.now() - pauseTimeRef.current;
      setPauseOffset((prev) => prev + elapsedPaused);
      setIsPaused(false);
      pauseTimeRef.current = null;
    }
  }, [isPaused]);

  const reset = useCallback(
    (newTarget?: Date | string | number | null, newInitialSeconds?: number) => {
      completedTriggeredRef.current = false;
      setPauseOffset(0);
      pauseTimeRef.current = null;
      setIsPaused(false);

      let newTargetMs: number;
      let newDuration: number | undefined;

      if (typeof newInitialSeconds === 'number' && newInitialSeconds > 0) {
        newDuration = newInitialSeconds * 1000;
        newTargetMs = Date.now() + newDuration;
      } else {
        const parsed = parseTargetTime(newTarget ?? targetDate);
        newTargetMs = parsed !== null ? parsed : Date.now() + 24 * 60 * 60 * 1000;
        const diff = newTargetMs - Date.now();
        newDuration = diff > 0 ? diff : undefined;
      }

      setStartDurationMs(newDuration);
      setTargetTimestamp(newTargetMs);
      setTime(calculateTimeRemaining(newTargetMs, Date.now(), newDuration));
    },
    [targetDate]
  );

  return {
    ...time,
    isRunning: !isPaused && !time.isCompleted,
    pause,
    resume,
    reset,
    formatted: {
      days: padZero(time.days),
      hours: padZero(time.hours),
      minutes: padZero(time.minutes),
      seconds: padZero(time.seconds),
      milliseconds: padZero(Math.floor(time.milliseconds / 10), 2)
    }
  };
}
