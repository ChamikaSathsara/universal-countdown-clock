import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';

const meta: Meta = {
  title: 'Hooks/useCountdown',
  parameters: {
    layout: 'centered'
  }
};

export default meta;

const HeadlessDemo = () => {
  const [initialSecs, setInitialSecs] = useState<number>(120); // 2 minutes

  const countdown = useCountdown({
    initialSeconds: initialSecs,
    includeMilliseconds: true
  });

  return (
    <div
      style={{
        background: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '20px',
        padding: '2.5rem',
        maxWidth: '560px',
        width: '100%',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#38bdf8' }}>
          Headless `useCountdown` Hook Demo
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.4rem' }}>
          Build any custom UI with complete state control & formatted outputs
        </p>
      </div>

      {/* Custom Big Display */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: '0.5rem',
          fontFamily: 'monospace',
          fontSize: '3rem',
          fontWeight: 800,
          background: '#090d16',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #1e293b',
          color: countdown.isCompleted ? '#ef4444' : '#10b981'
        }}
      >
        <span>{countdown.formatted.minutes}</span>
        <span style={{ opacity: 0.5 }}>:</span>
        <span>{countdown.formatted.seconds}</span>
        <span style={{ opacity: 0.5 }}>.</span>
        <span style={{ fontSize: '1.75rem', color: '#64748b' }}>
          {countdown.formatted.milliseconds}
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ marginTop: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#94a3b8',
            marginBottom: '0.4rem'
          }}
        >
          <span>Progress</span>
          <span>{Math.round(countdown.progress * 100)}%</span>
        </div>
        <div
          style={{
            height: '8px',
            background: '#1e293b',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${countdown.progress * 100}%`,
              background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
              transition: 'width 0.1s linear'
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '1.5rem',
          justifyContent: 'center'
        }}
      >
        {countdown.isRunning ? (
          <button
            onClick={countdown.pause}
            style={{
              background: '#eab308',
              color: '#000',
              border: 'none',
              padding: '0.6rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Pause
          </button>
        ) : (
          <button
            onClick={countdown.resume}
            disabled={countdown.isCompleted}
            style={{
              background: countdown.isCompleted ? '#475569' : '#10b981',
              color: '#fff',
              border: 'none',
              padding: '0.6rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: countdown.isCompleted ? 'not-allowed' : 'pointer'
            }}
          >
            Resume
          </button>
        )}

        <button
          onClick={() => countdown.reset(null, initialSecs)}
          style={{
            background: '#334155',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1.4rem',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Reset (2m)
        </button>

        <button
          onClick={() => {
            setInitialSecs(30);
            countdown.reset(null, 30);
          }}
          style={{
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1.4rem',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Set 30s
        </button>
      </div>

      {/* Raw State Inspector */}
      <div style={{ marginTop: '1.5rem' }}>
        <details style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
            Inspect Hook Return State (JSON)
          </summary>
          <pre
            style={{
              background: '#090d16',
              padding: '1rem',
              borderRadius: '8px',
              overflowX: 'auto',
              color: '#38bdf8'
            }}
          >
            {JSON.stringify(
              {
                days: countdown.days,
                hours: countdown.hours,
                minutes: countdown.minutes,
                seconds: countdown.seconds,
                milliseconds: countdown.milliseconds,
                isCompleted: countdown.isCompleted,
                isRunning: countdown.isRunning,
                progress: countdown.progress.toFixed(3),
                formatted: countdown.formatted
              },
              null,
              2
            )}
          </pre>
        </details>
      </div>
    </div>
  );
};

export const InteractiveHook: StoryObj = {
  render: () => <HeadlessDemo />
};
