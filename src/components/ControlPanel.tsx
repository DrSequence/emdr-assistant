import React from 'react';

export const ControlPanel: React.FC<{
  onPlayPause: () => void;
  onStop: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  duration: number;
  onDurationChange: (duration: number) => void;
  isPlaying: boolean;
}> = ({ onPlayPause, onStop, speed, onSpeedChange, duration, onDurationChange, isPlaying }) => (
  <div style={{ position: 'absolute', bottom: 30, width: '100%', textAlign: 'center' }}>
    <div style={{ marginBottom: '20px' }}>
      <span style={{ marginRight: '10px' }}>Скорость:</span>
      <button onClick={() => onSpeedChange(Math.max(1, speed - 1))}>-</button>
      <span style={{ margin: '0 15px', minWidth: '30px', display: 'inline-block' }}>
        {speed}
      </span>
      <button onClick={() => onSpeedChange(Math.min(10, speed + 1))}>+</button>
    </div>
    <div style={{ marginBottom: '20px', width: '100%', maxWidth: '400px', margin: '0 auto 20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <span>Таймер: {duration} сек</span>
      </div>
      <input
        type="range"
        min="15"
        max="60"
        step="5"
        value={duration}
        onChange={(e) => onDurationChange(Number(e.target.value))}
        disabled={isPlaying}
        style={{
          width: '100%',
          height: '8px',
          borderRadius: '5px',
          outline: 'none',
          opacity: isPlaying ? 0.5 : 1,
          cursor: isPlaying ? 'not-allowed' : 'pointer'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '12px' }}>
        <span>15</span>
        <span>60</span>
      </div>
    </div>
    <div>
      <button onClick={onPlayPause} style={{ margin: '0 15px' }}>
        {isPlaying ? '⏸️ Pause' : '▶️ Start'}
      </button>
      <button onClick={onStop} style={{ margin: '0 15px' }}>⏹️ Stop</button>
    </div>
  </div>
);