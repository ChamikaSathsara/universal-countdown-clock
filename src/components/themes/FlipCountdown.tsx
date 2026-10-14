import React from 'react';
import { BaseCountdownThemeProps } from '../../types';
import { padZero, DEFAULT_LABELS } from '../../utils/time';

export const FlipCountdown: React.FC<BaseCountdownThemeProps> = ({
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
  textColor,
  className = '',
  style = {}
}) => {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };

  const formatVal = (v: number, digits: number = 2) =>
    padWithZero ? padZero(v, digits) : String(v);

  const customStyle: React.CSSProperties = {
    ...style,
    ...(primaryColor ? { '--ucc-flip-card-bg': primaryColor } : {}),
    ...(backgroundColor ? { '--ucc-bg': backgroundColor } : {}),
    ...(textColor ? { '--ucc-flip-text': textColor } : {})
  } as React.CSSProperties;

  return (
    <div className={`ucc-root ucc-theme-flip ucc-size-${size} ${className}`} style={customStyle}>
      {(title || subtitle) && (
        <div className="ucc-header">
          {title && <h3 className="ucc-title">{title}</h3>}
          {subtitle && <p className="ucc-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="ucc-segments">
        {showDays && (
          <div className="ucc-segment">
            <div className="ucc-flip-card">
              <span className="ucc-flip-digits">{formatVal(time.days)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.days}</span>}
          </div>
        )}

        {showDays && (showHours || showMinutes || showSeconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showHours && (
          <div className="ucc-segment">
            <div className="ucc-flip-card">
              <span className="ucc-flip-digits">{formatVal(time.hours)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.hours}</span>}
          </div>
        )}

        {showHours && (showMinutes || showSeconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showMinutes && (
          <div className="ucc-segment">
            <div className="ucc-flip-card">
              <span className="ucc-flip-digits">{formatVal(time.minutes)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.minutes}</span>}
          </div>
        )}

        {showMinutes && (showSeconds || showMilliseconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showSeconds && (
          <div className="ucc-segment">
            <div className="ucc-flip-card">
              <span className="ucc-flip-digits">{formatVal(time.seconds)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.seconds}</span>}
          </div>
        )}

        {showMilliseconds && (
          <>
            <span className="ucc-divider">.</span>
            <div className="ucc-segment">
              <div className="ucc-flip-card">
                <span className="ucc-flip-digits">
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
