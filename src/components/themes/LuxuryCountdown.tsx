import React from 'react';
import { BaseCountdownThemeProps } from '../../types';
import { padZero, DEFAULT_LABELS } from '../../utils/time';

export const LuxuryCountdown: React.FC<BaseCountdownThemeProps> = ({
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
  title = 'HAUTE HORLOGERIE',
  subtitle = 'GRAND COMPLICATION',
  backgroundColor,
  className = '',
  style = {}
}) => {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const formatVal = (v: number) => (padWithZero ? padZero(v) : String(v));

  const customStyle: React.CSSProperties = {
    ...style,
    ...(backgroundColor ? { background: backgroundColor } : {})
  };

  return (
    <div className={`ucc-root ucc-theme-luxury ucc-size-${size} ${className}`} style={customStyle}>
      {(title || subtitle) && (
        <div className="ucc-header">
          {title && <h3 className="ucc-title" style={{ color: '#d4af37', letterSpacing: '0.2em' }}>{title}</h3>}
          {subtitle && <p className="ucc-subtitle" style={{ color: '#a88828', letterSpacing: '0.15em' }}>{subtitle}</p>}
        </div>
      )}

      <div className="ucc-segments">
        {showDays && (
          <div className="ucc-segment">
            <div className="ucc-luxury-box">
              <span className="ucc-luxury-digits">{formatVal(time.days)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.days}</span>}
          </div>
        )}

        {showDays && (showHours || showMinutes || showSeconds) && (
          <span className="ucc-divider" style={{ opacity: 0.5 }}>✦</span>
        )}

        {showHours && (
          <div className="ucc-segment">
            <div className="ucc-luxury-box">
              <span className="ucc-luxury-digits">{formatVal(time.hours)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.hours}</span>}
          </div>
        )}

        {showHours && (showMinutes || showSeconds) && (
          <span className="ucc-divider" style={{ opacity: 0.5 }}>✦</span>
        )}

        {showMinutes && (
          <div className="ucc-segment">
            <div className="ucc-luxury-box">
              <span className="ucc-luxury-digits">{formatVal(time.minutes)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.minutes}</span>}
          </div>
        )}

        {showMinutes && (showSeconds || showMilliseconds) && (
          <span className="ucc-divider" style={{ opacity: 0.5 }}>✦</span>
        )}

        {showSeconds && (
          <div className="ucc-segment">
            <div className="ucc-luxury-box">
              <span className="ucc-luxury-digits">{formatVal(time.seconds)}</span>
            </div>
            {showLabels && <span className="ucc-label">{mergedLabels.seconds}</span>}
          </div>
        )}

        {showMilliseconds && (
          <>
            <span className="ucc-divider" style={{ opacity: 0.5 }}>✦</span>
            <div className="ucc-segment">
              <div className="ucc-luxury-box">
                <span className="ucc-luxury-digits">
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
