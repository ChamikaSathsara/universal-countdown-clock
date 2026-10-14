import React from 'react';

interface Digit7SegmentProps {
  digit: string | number;
  className?: string;
}

// 7-segment activation table for 0-9
// Segments: a, b, c, d, e, f, g
const SEGMENTS: Record<string, boolean[]> = {
  '0': [true, true, true, true, true, true, false],
  '1': [false, true, true, false, false, false, false],
  '2': [true, true, false, true, true, false, true],
  '3': [true, true, true, true, false, false, true],
  '4': [false, true, true, false, false, true, true],
  '5': [true, false, true, true, false, true, true],
  '6': [true, false, true, true, true, true, true],
  '7': [true, true, true, false, false, false, false],
  '8': [true, true, true, true, true, true, true],
  '9': [true, true, true, true, false, true, true]
};

export const Digit7Segment: React.FC<Digit7SegmentProps> = ({ digit, className = '' }) => {
  const dStr = String(digit);
  const activeSegs = SEGMENTS[dStr] || [false, false, false, false, false, false, false];

  return (
    <svg
      viewBox="0 0 24 44"
      className={`ucc-digital-svg ${className}`}
      aria-label={`Digit ${dStr}`}
    >
      {/* Segment A - Top */}
      <polygon
        points="3,4 6,1 18,1 21,4 18,7 6,7"
        className={`ucc-digital-seg ${activeSegs[0] ? 'ucc-digital-seg-on' : 'ucc-digital-seg-off'}`}
      />
      {/* Segment B - Top Right */}
      <polygon
        points="21,5 24,8 24,19 21,22 18,19 18,8"
        className={`ucc-digital-seg ${activeSegs[1] ? 'ucc-digital-seg-on' : 'ucc-digital-seg-off'}`}
      />
      {/* Segment C - Bottom Right */}
      <polygon
        points="21,23 24,26 24,37 21,40 18,37 18,26"
        className={`ucc-digital-seg ${activeSegs[2] ? 'ucc-digital-seg-on' : 'ucc-digital-seg-off'}`}
      />
      {/* Segment D - Bottom */}
      <polygon
        points="3,41 6,38 18,38 21,41 18,44 6,44"
        className={`ucc-digital-seg ${activeSegs[3] ? 'ucc-digital-seg-on' : 'ucc-digital-seg-off'}`}
      />
      {/* Segment E - Bottom Left */}
      <polygon
        points="3,23 6,26 6,37 3,40 0,37 0,26"
        className={`ucc-digital-seg ${activeSegs[4] ? 'ucc-digital-seg-on' : 'ucc-digital-seg-off'}`}
      />
      {/* Segment F - Top Left */}
      <polygon
        points="3,5 6,8 6,19 3,22 0,19 0,8"
        className={`ucc-digital-seg ${activeSegs[5] ? 'ucc-digital-seg-on' : 'ucc-digital-seg-off'}`}
      />
      {/* Segment G - Middle */}
      <polygon
        points="3,22.5 6,20 18,20 21,22.5 18,25 6,25"
        className={`ucc-digital-seg ${activeSegs[6] ? 'ucc-digital-seg-on' : 'ucc-digital-seg-off'}`}
      />
    </svg>
  );
};
