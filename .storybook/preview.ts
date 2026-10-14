import type { Preview } from '@storybook/react';
import '../src/styles/countdown.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'charcoal',
      values: [
        { name: 'charcoal', value: '#0b0f19' },
        { name: 'dark', value: '#111827' },
        { name: 'pure-black', value: '#000000' },
        { name: 'light', value: '#f1f5f9' },
        { name: 'pure-white', value: '#ffffff' }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
