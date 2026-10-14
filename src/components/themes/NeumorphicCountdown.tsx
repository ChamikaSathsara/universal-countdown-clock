import React from 'react';
import { BaseCountdownThemeProps } from '../../types';
import { padZero, DEFAULT_LABELS } from '../../utils/time';

export const NeumorphicCountdown: React.FC<BaseCountdownThemeProps> = ({
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
  title,
  subtitle,
  primaryColor,
  backgroundColor,
  className = '',
  style = {}
}) => {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const formatVal = (v: number) => (padWithZero ? padZero(v) : String(v));

  const customStyle: React.CSSProperties = {
    ...style,
    ...(primaryColor ? { '--ucc-neu-accent': primaryColor } : {}),
    ...(backgroundColor ? { '--ucc-neu-bg': backgroundColor } : {})
  } as React.CSSProperties;

  return (
    <div className={`ucc-root ucc-theme-neumorphic ucc-size-${size} ${className}`} style={customStyle}>
      {(title || subtitle) && (
        <div className="ucc-header">
          {title && <h3 className="ucc-title" style={{ color: '#cbd5e1' }}>{title}</h3>}
          {subtitle && <p className="ucc-subtitle" style={{ color: '#94a3b8' }}>{subtitle}</p>}
        </div>
      )}

      <div className="ucc-segments">
        {showDays && (
          <div className="ucc-segment">
            <div className="ucc-neu-card">
              <span className="ucc-neu-digits">{formatVal(time.days)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.days}</span>}
          </div>
        )}

        {showDays && (showHours || showMinutes || showSeconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showHours && (
          <div className="ucc-segment">
            <div className="ucc-neu-card">
              <span className="ucc-neu-digits">{formatVal(time.hours)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.hours}</span>}
          </div>
        )}

        {showHours && (showMinutes || showSeconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showMinutes && (
          <div className="ucc-segment">
            <div className="ucc-neu-card">
              <span className="ucc-neu-digits">{formatVal(time.minutes)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.minutes}</span>}
          </div>
        )}

        {showMinutes && (showSeconds || showMilliseconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showSeconds && (
          <div className="ucc-segment">
            <div className="ucc-neu-card">
              <span className="ucc-neu-digits">{formatVal(time.seconds)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.seconds}</span>}
          </div>
        )}

        {showMilliseconds && (
          <>
            <span className="ucc-divider">.</span>
            <div className="ucc-segment">
              <div className="ucc-neu-card">
                <span className="ucc-neu-digits">
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
