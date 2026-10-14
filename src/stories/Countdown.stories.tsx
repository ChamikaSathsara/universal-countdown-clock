import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Countdown } from '../components/Countdown';
import { CountdownType } from '../types';

const futureDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 42 * 60 * 1000 + 15 * 1000);

const meta: Meta<typeof Countdown> = {
  title: 'Components/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A universal, feature-rich countdown clock component supporting 10 visually distinct themes, customizable props, zero UI runtime dependencies, and headless hook integration.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'flip',
        'circular',
        'cyberpunk',
        'digital',
        'glassmorphism',
        'minimal',
        'arcade',
        'luxury',
        'neumorphic',
        'compact'
      ] as CountdownType[],
      description: 'The visual theme variant for the countdown clock'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size scaling of digits and cards'
    },
    showDays: { control: 'boolean' },
    showHours: { control: 'boolean' },
    showMinutes: { control: 'boolean' },
    showSeconds: { control: 'boolean' },
    showMilliseconds: { control: 'boolean' },
    padWithZero: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    primaryColor: { control: 'color' },
    secondaryColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    paused: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof Countdown>;

// 1. Interactive Playground
export const Playground: Story = {
  args: {
    targetDate: futureDate,
    type: 'flip',
    size: 'md',
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    showMilliseconds: false,
    padWithZero: true,
    showLabels: true,
    title: 'GLOBAL PRODUCT LAUNCH',
    subtitle: 'Streaming worldwide on all platforms'
  }
};

// 2. 3D Split-Flap Flip Clock
export const FlipClock: Story = {
  args: {
    targetDate: futureDate,
    type: 'flip',
    size: 'lg',
    title: 'FLIGHT DEPARTURE IN',
    subtitle: 'Terminal 4 • Gate B22'
  }
};

// 3. Radial / Circular Rings
export const CircularProgress: Story = {
  args: {
    targetDate: futureDate,
    type: 'circular',
    size: 'lg',
    primaryColor: '#06b6d4',
    secondaryColor: '#a855f7',
    title: 'MISSION COUNTDOWN',
    subtitle: 'Orbital Insertion Window'
  }
};

// 4. Cyberpunk / Sci-Fi HUD
export const CyberpunkHUD: Story = {
  args: {
    targetDate: futureDate,
    type: 'cyberpunk',
    size: 'md',
    title: 'MATRIX SYSTEM OVERRIDE',
    subtitle: 'FIREWALL BREACH IMMINENT'
  }
};

// 5. Retro 7-Segment LED
export const DigitalLED: Story = {
  args: {
    targetDate: futureDate,
    type: 'digital',
    size: 'lg',
    primaryColor: '#ef4444',
    title: 'CHAMPIONSHIP TIMER',
    subtitle: 'FINAL QUARTER REMAINING'
  }
};

// 6. Frosted Glassmorphism
export const Glassmorphism: Story = {
  args: {
    targetDate: futureDate,
    type: 'glassmorphism',
    size: 'md',
    title: 'SPECIAL EVENT',
    subtitle: 'Exclusive VIP Access'
  }
};

// 7. Swiss Editorial Minimal
export const MinimalEditorial: Story = {
  args: {
    targetDate: futureDate,
    type: 'minimal',
    size: 'lg',
    title: 'SUMMER EXHIBITION',
    subtitle: 'Modern Art Pavilion'
  }
};

// 8. 8-Bit Retro Arcade
export const ArcadeRetro: Story = {
  args: {
    targetDate: futureDate,
    type: 'arcade',
    size: 'md',
    title: 'BOSS BATTLE',
    subtitle: 'STAGE 8-4'
  }
};

// 9. Metallic Gold Luxury
export const LuxuryGold: Story = {
  args: {
    targetDate: futureDate,
    type: 'luxury',
    size: 'lg',
    title: 'ROYAL GALA EVENING',
    subtitle: 'THE GRAND HERITAGE COLLECTION'
  }
};

// 10. Soft Neumorphic Tactile Clay
export const NeumorphicClay: Story = {
  args: {
    targetDate: futureDate,
    type: 'neumorphic',
    size: 'md',
    primaryColor: '#38bdf8',
    title: 'DEVICE PAIRING SESSION',
    subtitle: 'Hold to sync'
  }
};

// 11. Compact Live E-Commerce Badge
export const CompactBadge: Story = {
  args: {
    targetDate: futureDate,
    type: 'compact',
    size: 'md',
    title: 'FLASH SALE'
  }
};

// 12. High-Precision Milliseconds Ticker
export const HighPrecisionMillis: Story = {
  args: {
    targetDate: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
    type: 'cyberpunk',
    size: 'md',
    showDays: false,
    showMilliseconds: true,
    title: 'SPEEDRUN TIMER'
  }
};

// 13. Custom Localized Labels
export const LocalizedSpanish: Story = {
  args: {
    targetDate: futureDate,
    type: 'glassmorphism',
    size: 'md',
    title: 'OFERTA DE TEMPORADA',
    labels: {
      days: 'Días',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos'
    }
  }
};

// 14. Completed State with Custom Content
export const CompletedState: Story = {
  args: {
    initialSeconds: 0,
    type: 'flip',
    completedContent: (
      <div
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          padding: '1.5rem 3rem',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)'
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>🎉 Time is Up!</h2>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          The event has officially begun. Welcome!
        </p>
      </div>
    )
  }
};

// 15. All 10 Themes Gallery Showcase
export const AllThemesShowcase: Story = {
  render: () => {
    const allTypes: { type: CountdownType; label: string }[] = [
      { type: 'flip', label: '1. 3D Flip Clock' },
      { type: 'circular', label: '2. Radial SVG Progress Rings' },
      { type: 'cyberpunk', label: '3. Cyberpunk Sci-Fi HUD' },
      { type: 'digital', label: '4. Retro 7-Segment LED' },
      { type: 'glassmorphism', label: '5. Modern Glassmorphism' },
      { type: 'minimal', label: '6. Swiss Minimal Monospace' },
      { type: 'arcade', label: '7. 8-Bit Arcade Gaming' },
      { type: 'luxury', label: '8. Metallic Gold Luxury' },
      { type: 'neumorphic', label: '9. Neumorphic 3D Clay' },
      { type: 'compact', label: '10. Compact Live Sale Ticker' }
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          alignItems: 'center',
          padding: '2rem',
          maxWidth: '1000px',
          width: '100%'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #38bdf8, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 0.5rem 0'
            }}
          >
            Universal Countdown Clock
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: 0 }}>
            10 Distinct Visual Themes • Fully Responsive • Customizable Props
          </p>
        </div>

        {allTypes.map(({ type, label }) => (
          <div
            key={type}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem 1.5rem',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: '#60a5fa',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
                textTransform: 'uppercase'
              }}
            >
              {label}
            </span>
            <Countdown targetDate={futureDate} type={type} size="md" />
          </div>
        ))}
      </div>
    );
  }
};
