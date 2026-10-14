import React from 'react';
import { BaseCountdownThemeProps } from '../../types';
import { padZero, DEFAULT_LABELS } from '../../utils/time';
import { Digit7Segment } from './Digit7Segment';

export const DigitalCountdown: React.FC<BaseCountdownThemeProps> = ({
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
  const formatVal = (v: number) => (padWithZero ? padZero(v) : String(v).padStart(2, '0'));

  const renderDigitPair = (valStr: string) => {
    return (
      <div className="ucc-digital-pair">
        {valStr.split('').map((char, idx) => (
          <Digit7Segment key={idx} digit={char} />
        ))}
      </div>
    );
  };

  const renderColon = () => (
    <div className="ucc-digital-colon">
      <div className="ucc-digital-dot" />
      <div className="ucc-digital-dot" />
    </div>
  );

  const customStyle: React.CSSProperties = {
    ...style,
    ...(primaryColor ? { '--ucc-led-active': primaryColor } : {}),
    ...(backgroundColor ? { '--ucc-led-bg': backgroundColor } : {})
  } as React.CSSProperties;

  return (
    <div className={`ucc-root ucc-theme-digital ucc-size-${size} ${className}`} style={customStyle}>
      {(title || subtitle) && (
        <div className="ucc-header">
          {title && <h3 className="ucc-title" style={{ color: '#a1a1aa' }}>{title}</h3>}
          {subtitle && <p className="ucc-subtitle" style={{ color: '#71717a' }}>{subtitle}</p>}
        </div>
      )}

      <div className="ucc-digital-display">
        {showDays && (
          <div className="ucc-segment">
            {renderDigitPair(formatVal(time.days))}
            {showLabels && <span className="ucc-label">{mergedLabels.days}</span>}
          </div>
        )}

        {showDays && (showHours || showMinutes || showSeconds) && renderColon()}

        {showHours && (
          <div className="ucc-segment">
            {renderDigitPair(formatVal(time.hours))}
            {showLabels && <span className="ucc-label">{mergedLabels.hours}</span>}
          </div>
        )}

        {showHours && (showMinutes || showSeconds) && renderColon()}

        {showMinutes && (
          <div className="ucc-segment">
            {renderDigitPair(formatVal(time.minutes))}
            {showLabels && <span className="ucc-label">{mergedLabels.minutes}</span>}
          </div>
        )}

        {showMinutes && (showSeconds || showMilliseconds) && renderColon()}

        {showSeconds && (
          <div className="ucc-segment">
            {renderDigitPair(formatVal(time.seconds))}
            {showLabels && <span className="ucc-label">{mergedLabels.seconds}</span>}
          </div>
        )}

        {showMilliseconds && (
          <>
            <div className="ucc-digital-colon" style={{ alignSelf: 'flex-end', marginBottom: '8px' }}>
              <div className="ucc-digital-dot" />
            </div>
            <div className="ucc-segment">
              {renderDigitPair(padZero(Math.floor(time.milliseconds / 10), 2))}
              {showLabels && <span className="ucc-label">{mergedLabels.millis}</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
