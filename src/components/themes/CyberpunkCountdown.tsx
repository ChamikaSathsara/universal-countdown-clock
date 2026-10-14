import React from 'react';
import { BaseCountdownThemeProps } from '../../types';
import { padZero, DEFAULT_LABELS } from '../../utils/time';

export const CyberpunkCountdown: React.FC<BaseCountdownThemeProps> = ({
  time,
  size = 'md',
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  showMilliseconds = false,
  padWithZero = true,
  labels = {},
  showLabels = true,
  title = 'OPERATION // COUNTDOWN',
  subtitle = 'SYSTEM STATUS: ARMED',
  primaryColor,
  secondaryColor,
  backgroundColor,
  className = '',
  style = {}
}) => {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const formatVal = (v: number) => (padWithZero ? padZero(v) : String(v));

  const customStyle: React.CSSProperties = {
    ...style,
    ...(primaryColor ? { '--ucc-cp-primary': primaryColor } : {}),
    ...(secondaryColor ? { '--ucc-cp-secondary': secondaryColor } : {}),
    ...(backgroundColor ? { '--ucc-cp-bg': backgroundColor } : {})
  } as React.CSSProperties;

  return (
    <div className={`ucc-root ucc-theme-cyberpunk ucc-size-${size} ${className}`} style={customStyle}>
      {(title || subtitle) && (
        <div className="ucc-header" style={{ marginTop: '0.6rem' }}>
          {title && <h3 className="ucc-title" style={{ color: 'var(--ucc-cp-primary)' }}>{title}</h3>}
          {subtitle && <p className="ucc-subtitle" style={{ color: 'var(--ucc-cp-secondary)' }}>{subtitle}</p>}
        </div>
      )}

      <div className="ucc-segments">
        {showDays && (
          <div className="ucc-segment">
            <div className="ucc-cyberpunk-card">
              <span className="ucc-cyberpunk-digits">{formatVal(time.days)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.days}</span>}
          </div>
        )}

        {showDays && (showHours || showMinutes || showSeconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showHours && (
          <div className="ucc-segment">
            <div className="ucc-cyberpunk-card">
              <span className="ucc-cyberpunk-digits">{formatVal(time.hours)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.hours}</span>}
          </div>
        )}

        {showHours && (showMinutes || showSeconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showMinutes && (
          <div className="ucc-segment">
            <div className="ucc-cyberpunk-card">
              <span className="ucc-cyberpunk-digits">{formatVal(time.minutes)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.minutes}</span>}
          </div>
        )}

        {showMinutes && (showSeconds || showMilliseconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showSeconds && (
          <div className="ucc-segment">
            <div className="ucc-cyberpunk-card">
              <span className="ucc-cyberpunk-digits">{formatVal(time.seconds)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.seconds}</span>}
          </div>
        )}

        {showMilliseconds && (
          <>
            <span className="ucc-divider">.</span>
            <div className="ucc-segment">
              <div className="ucc-cyberpunk-card">
                <span className="ucc-cyberpunk-digits">
                  {formatVal(Math.floor(time.milliseconds / 10))}
                </span>
              </div>
              {showLabels && <span className="ucc-label">{mergedLabels.millis}</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
