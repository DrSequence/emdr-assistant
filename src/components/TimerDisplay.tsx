import React from 'react';

export const TimerDisplay: React.FC<{ time: number }> = ({ time }) => (
  <div style={{ fontSize: '2rem', padding: '20px' }}>{time}s</div>
);