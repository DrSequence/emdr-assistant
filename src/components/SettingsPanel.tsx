import React from 'react';

export const SettingsPanel: React.FC<{
  onPlayPause: () => void;
  onStop: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  duration: number;
  onDurationChange: (duration: number) => void;
  isPlaying: boolean;
}> = ({ onPlayPause, onStop, speed, onSpeedChange, duration, onDurationChange, isPlaying }) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1a1a1a',
      padding: 'min(40px, 5vw)',
      borderRadius: '15px',
      border: '2px solid #4a90e2',
      minWidth: 'min(400px, 90vw)',
      maxWidth: '95vw',
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    }}
  >
    <h2 style={{ marginTop: 0, marginBottom: '30px', color: '#4a90e2' }}>Настройки сеанса</h2>
    
    <div style={{ marginBottom: '25px' }}>
      <div style={{ marginBottom: '15px' }}>
        <span style={{ marginRight: '10px', fontSize: '16px' }}>Скорость:</span>
        <button 
          onClick={() => onSpeedChange(Math.max(5, speed - 1))}
          style={{
            padding: '8px 15px',
            fontSize: '16px',
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #555',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <span style={{ margin: '0 15px', minWidth: '30px', display: 'inline-block', fontSize: '18px' }}>
          {speed}
        </span>
        <button 
          onClick={() => onSpeedChange(Math.min(25, speed + 1))}
          style={{
            padding: '8px 15px',
            fontSize: '16px',
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #555',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
      </div>
      
      <div style={{ marginBottom: '20px', width: '100%' }}>
        <div style={{ marginBottom: '10px', fontSize: '16px' }}>
          <span>Длительность: {duration} сек</span>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '12px', color: '#aaa' }}>
          <span>15</span>
          <span>60</span>
        </div>
      </div>
    </div>
    
    <div>
      <button 
        onClick={onPlayPause} 
        style={{ 
          margin: '0 10px',
          padding: '12px 30px',
          fontSize: '16px',
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {isPlaying ? '⏸️ Pause' : '▶️ Start'}
      </button>
      <button 
        onClick={onStop} 
        style={{ 
          margin: '0 10px',
          padding: '12px 30px',
          fontSize: '16px',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ⏹️ Stop
      </button>
    </div>
  </div>
);
