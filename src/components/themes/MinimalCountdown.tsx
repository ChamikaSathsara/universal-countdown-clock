import React from 'react';
import { BaseCountdownThemeProps } from '../../types';
import { padZero, DEFAULT_LABELS } from '../../utils/time';

export const MinimalCountdown: React.FC<BaseCountdownThemeProps> = ({
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
  textColor = '#f8fafc',
  className = '',
  style = {}
}) => {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const formatVal = (v: number) => (padWithZero ? padZero(v) : String(v));

  const customStyle: React.CSSProperties = {
    ...style,
    color: textColor
  };

  return (
    <div className={`ucc-root ucc-theme-minimal ucc-size-${size} ${className}`} style={customStyle}>
      {(title || subtitle) && (
        <div className="ucc-header">
          {title && <h3 className="ucc-title">{title}</h3>}
          {subtitle && <p className="ucc-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="ucc-segments">
        {showDays && (
          <div className="ucc-segment">
            <div className="ucc-minimal-unit">
              <span className="ucc-minimal-digits">{formatVal(time.days)}</span>
              {showLabels && <span className="ucc-minimal-label">{mergedLabels.days[0]}</span>}
            </div>
          </div>
        )}

        {showDays && (showHours || showMinutes || showSeconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showHours && (
          <div className="ucc-segment">
            <div className="ucc-minimal-unit">
              <span className="ucc-minimal-digits">{formatVal(time.hours)}</span>
              {showLabels && <span className="ucc-minimal-label">{mergedLabels.hours[0]}</span>}
            </div>
          </div>
        )}

        {showHours && (showMinutes || showSeconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showMinutes && (
          <div className="ucc-segment">
            <div className="ucc-minimal-unit">
              <span className="ucc-minimal-digits">{formatVal(time.minutes)}</span>
              {showLabels && <span className="ucc-minimal-label">{mergedLabels.minutes[0]}</span>}
            </div>
          </div>
        )}

        {showMinutes && (showSeconds || showMilliseconds) && (
          <span className="ucc-divider">:</span>
        )}

        {showSeconds && (
          <div className="ucc-segment">
            <div className="ucc-minimal-unit">
              <span className="ucc-minimal-digits">{formatVal(time.seconds)}</span>
              {showLabels && <span className="ucc-minimal-label">{mergedLabels.seconds[0]}</span>}
            </div>
          </div>
        )}

        {showMilliseconds && (
          <>
            <span className="ucc-divider">.</span>
            <div className="ucc-segment">
              <div className="ucc-minimal-unit">
                <span className="ucc-minimal-digits">
                  {formatVal(Math.floor(time.milliseconds / 10))}
                </span>
                {showLabels && <span className="ucc-minimal-label">ms</span>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
