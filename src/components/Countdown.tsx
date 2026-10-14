import React from 'react';
import { CountdownProps, CountdownType } from '../types';
import { useCountdown } from '../hooks/useCountdown';

import { FlipCountdown } from './themes/FlipCountdown';
import { CircularCountdown } from './themes/CircularCountdown';
import { CyberpunkCountdown } from './themes/CyberpunkCountdown';
import { DigitalCountdown } from './themes/DigitalCountdown';
import { GlassmorphismCountdown } from './themes/GlassmorphismCountdown';
import { MinimalCountdown } from './themes/MinimalCountdown';
import { ArcadeCountdown } from './themes/ArcadeCountdown';
import { LuxuryCountdown } from './themes/LuxuryCountdown';
import { NeumorphicCountdown } from './themes/NeumorphicCountdown';
import { CompactCountdown } from './themes/CompactCountdown';

const THEME_COMPONENTS: Record<CountdownType, React.FC<any>> = {
  flip: FlipCountdown,
  circular: CircularCountdown,
  cyberpunk: CyberpunkCountdown,
  digital: DigitalCountdown,
  glassmorphism: GlassmorphismCountdown,
  minimal: MinimalCountdown,
  arcade: ArcadeCountdown,
  luxury: LuxuryCountdown,
  neumorphic: NeumorphicCountdown,
  compact: CompactCountdown
};

export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  initialSeconds,
  type = 'flip',
  size = 'md',
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  showMilliseconds = false,
  padWithZero = true,
  labels,
  showLabels = true,
  title,
  subtitle,
  primaryColor,
  secondaryColor,
  backgroundColor,
  textColor,
  accentColor,
  onComplete,
  onTick,
  completedContent,
  paused = false,
  className = '',
  style
}) => {
  const time = useCountdown({
    targetDate,
    initialSeconds,
    onComplete,
    onTick,
    paused,
    includeMilliseconds: showMilliseconds
  });

  if (time.isCompleted && completedContent) {
    return <div className={`ucc-completed-wrapper ${className}`}>{completedContent}</div>;
  }

  const ThemeComponent = THEME_COMPONENTS[type] || FlipCountdown;

  return (
    <ThemeComponent
      time={time}
      size={size}
      showDays={showDays}
      showHours={showHours}
      showMinutes={showMinutes}
      showSeconds={showSeconds}
      showMilliseconds={showMilliseconds}
      padWithZero={padWithZero}
      labels={labels}
      showLabels={showLabels}
      title={title}
      subtitle={subtitle}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      backgroundColor={backgroundColor}
      textColor={textColor}
      accentColor={accentColor}
      className={className}
      style={style}
    />
  );
};
