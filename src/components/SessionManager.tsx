import React, { useState, useEffect } from 'react';
import { StimulationDisplay } from './StimulationDisplay';
import { SettingsPanel } from './SettingsPanel';

export const SessionManager: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(5); // скорость от 5 до 15
  const [duration, setDuration] = useState(30); // длительность: 15-60
  const [remaining, setRemaining] = useState(30); // оставшееся время в секундах
  const [showSettings, setShowSettings] = useState(true); // показывать ли окно настроек

  // Обновляем remaining при изменении duration (если не идёт таймер)
  useEffect(() => {
    if (!isPlaying) {
      setRemaining(duration);
    }
  }, [duration, isPlaying]);

  // Скрываем/показываем окно настроек при запуске/остановке
  useEffect(() => {
    if (isPlaying) {
      setShowSettings(false);
    } else {
      setShowSettings(true);
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setRemaining(duration);
    setShowSettings(true);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setShowSettings(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const config = {
    type: 'eye' as const,
    speed,
    duration,
    pattern: 'horizontal' as const
  };

  return (
    <div style={{ textAlign: 'center', height: '100vh', background: '#2f2f2f', color: 'white', position: 'relative' }}>
      <StimulationDisplay config={config} isActive={isPlaying} />
      {showSettings && (
        <SettingsPanel
          onPlayPause={handlePlayPause}
          onStop={handleStop}
          speed={speed}
          onSpeedChange={setSpeed}
          duration={duration}
          onDurationChange={setDuration}
          isPlaying={isPlaying}
        />
      )}
      {/* Панель управления скоростью во время сеанса */}
      {isPlaying && (
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(26, 26, 26, 0.9)',
          padding: '20px 40px',
          borderRadius: '15px',
          border: '2px solid #4a90e2',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
        }}>
          <span style={{ fontSize: '18px', color: '#4a90e2' }}>Скорость:</span>
          <button 
            onClick={() => setSpeed(Math.max(5, speed - 1))}
            style={{
              padding: '8px 15px',
              fontSize: '18px',
              backgroundColor: '#333',
              color: 'white',
              border: '1px solid #555',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            -
          </button>
          <span style={{ minWidth: '40px', fontSize: '20px', fontWeight: 'bold' }}>
            {speed}
          </span>
          <button 
            onClick={() => setSpeed(Math.min(15, speed + 1))}
            style={{
              padding: '8px 15px',
              fontSize: '18px',
              backgroundColor: '#333',
              color: 'white',
              border: '1px solid #555',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            +
          </button>
          <button 
            onClick={handlePlayPause}
            style={{
              marginLeft: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ⏸️ Pause
          </button>
          <button 
            onClick={handleStop}
            style={{
              padding: '10px 20px',
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
      )}
    </div>
  );
};