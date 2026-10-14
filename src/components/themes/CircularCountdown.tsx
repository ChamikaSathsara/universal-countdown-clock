import React from 'react';
import { BaseCountdownThemeProps } from '../../types';
import { padZero, DEFAULT_LABELS } from '../../utils/time';

export const CircularCountdown: React.FC<BaseCountdownThemeProps> = ({
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
  primaryColor = '#38bdf8',
  secondaryColor = '#818cf8',
  backgroundColor,
  textColor,
  className = '',
  style = {}
}) => {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const formatVal = (v: number) => (padWithZero ? padZero(v) : String(v));

  const radius = 34;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;

  const renderRing = (value: number, max: number, label: string, color: string) => {
    const ratio = Math.min(1, Math.max(0, value / max));
    const offset = circumference * (1 - ratio);

    return (
      <div className="ucc-circular-item">
        <div className="ucc-circular-svg-wrap">
          <svg className="ucc-circular-svg" viewBox="0 0 80 80">
            <circle
              className="ucc-circular-circle-bg"
              cx="40"
              cy="40"
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              className="ucc-circular-circle-bar"
              cx="40"
              cy="40"
              r={radius}
              strokeWidth={strokeWidth}
              stroke={color}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="ucc-circular-center-content">
            <span className="ucc-circular-digits">{formatVal(value)}</span>
            <span className="ucc-circular-micro-label">{label.substring(0, 3)}</span>
          </div>
        </div>
        {showLabels && <span className="ucc-label">{label}</span>}
      </div>
    );
  };

  const customStyle: React.CSSProperties = {
    ...style,
    ...(backgroundColor ? { background: backgroundColor } : {}),
    ...(textColor ? { '--ucc-ring-text': textColor } : {})
  } as React.CSSProperties;

  return (
    <div className={`ucc-root ucc-theme-circular ucc-size-${size} ${className}`} style={customStyle}>
      {(title || subtitle) && (
        <div className="ucc-header">
          {title && <h3 className="ucc-title">{title}</h3>}
          {subtitle && <p className="ucc-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="ucc-segments">
        {showDays && renderRing(time.days, 30, mergedLabels.days, primaryColor)}
        {showHours && renderRing(time.hours, 24, mergedLabels.hours, secondaryColor)}
        {showMinutes && renderRing(time.minutes, 60, mergedLabels.minutes, primaryColor)}
        {showSeconds && renderRing(time.seconds, 60, mergedLabels.seconds, secondaryColor)}
        {showMilliseconds &&
          renderRing(
            Math.floor(time.milliseconds / 10),
            100,
            mergedLabels.millis,
            '#f43f5e'
          )}
      </div>
    </div>
  );
};
