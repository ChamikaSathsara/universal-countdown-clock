// Import and bundle styles
import './styles/countdown.css';

// Main Component
import { Countdown } from './components/Countdown';
export { Countdown };
export { Countdown as UniversalCountdown } from './components/Countdown';
export default Countdown;

// Individual Theme Components (for tree-shaking & direct usage)
export { FlipCountdown } from './components/themes/FlipCountdown';
export { CircularCountdown } from './components/themes/CircularCountdown';
export { CyberpunkCountdown } from './components/themes/CyberpunkCountdown';
export { DigitalCountdown } from './components/themes/DigitalCountdown';
export { GlassmorphismCountdown } from './components/themes/GlassmorphismCountdown';
export { MinimalCountdown } from './components/themes/MinimalCountdown';
export { ArcadeCountdown } from './components/themes/ArcadeCountdown';
export { LuxuryCountdown } from './components/themes/LuxuryCountdown';
export { NeumorphicCountdown } from './components/themes/NeumorphicCountdown';
export { CompactCountdown } from './components/themes/CompactCountdown';
export { Digit7Segment } from './components/themes/Digit7Segment';

// Headless Hook
export { useCountdown } from './hooks/useCountdown';

// Utilities
export {
  calculateTimeRemaining,
  parseTargetTime,
  padZero,
  DEFAULT_LABELS
} from './utils/time';

// Type Definitions
export type {
  CountdownProps,
  CountdownType,
  CountdownSize,
  TimeRemaining,
  CountdownLabels,
  BaseCountdownThemeProps,
  UseCountdownOptions,
  UseCountdownReturn
} from './types';
