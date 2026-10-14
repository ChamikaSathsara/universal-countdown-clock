import React from 'react';
import { BaseCountdownThemeProps } from '../../types';
import { padZero } from '../../utils/time';

export const CompactCountdown: React.FC<BaseCountdownThemeProps> = ({
  time,
  size = 'md',
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  showMilliseconds = false,
  padWithZero = true,
  title = 'FLASH DEAL',
  primaryColor,
  backgroundColor,
  className = '',
  style = {}
}) => {
  const formatVal = (v: number) => (padWithZero ? padZero(v) : String(v));

  const customStyle: React.CSSProperties = {
    ...style,
    ...(backgroundColor ? { background: backgroundColor } : {}),
    ...(primaryColor ? { borderColor: primaryColor } : {})
  };

  return (
    <div className={`ucc-root ucc-theme-compact ucc-size-${size} ${className}`} style={customStyle}>
      <div className="ucc-compact-badge">
        <span className="ucc-compact-dot" />
        <span>{title}</span>
      </div>

      <div className="ucc-compact-time">
        {showDays && (
          <>
            <span className="ucc-compact-pill">
              {formatVal(time.days)}
              <span className="ucc-compact-unit-tag">d</span>
            </span>
            {(showHours || showMinutes || showSeconds) && <span className="ucc-divider">:</span>}
          </>
        )}

        {showHours && (
          <>
            <span className="ucc-compact-pill">
              {formatVal(time.hours)}
              <span className="ucc-compact-unit-tag">h</span>
            </span>
            {(showMinutes || showSeconds) && <span className="ucc-divider">:</span>}
          </>
        )}

        {showMinutes && (
          <>
            <span className="ucc-compact-pill">
              {formatVal(time.minutes)}
              <span className="ucc-compact-unit-tag">m</span>
            </span>
            {showSeconds && <span className="ucc-divider">:</span>}
          </>
        )}

        {showSeconds && (
          <span className="ucc-compact-pill">
            {formatVal(time.seconds)}
            <span className="ucc-compact-unit-tag">s</span>
          </span>
        )}

        {showMilliseconds && (
          <>
            <span className="ucc-divider">.</span>
            <span className="ucc-compact-pill">
              {formatVal(Math.floor(time.milliseconds / 10))}
              <span className="ucc-compact-unit-tag">ms</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
};
