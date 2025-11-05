import React, { useEffect, useRef, useState } from 'react';
import type { StimulationConfig } from '../types';
import './StimulationDisplay.css';

export const StimulationDisplay: React.FC<{
  config: StimulationConfig;
  isActive: boolean;
}> = ({ config, isActive }) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const leftBlinkRef = useRef<HTMLDivElement>(null);
  const rightBlinkRef = useRef<HTMLDivElement>(null);
  const [amplitude, setAmplitude] = useState(() => {
    const width = window.innerWidth;
    // Для горизонтального движения: половина ширины минус радиус шарика (15px)
    // Это позволит шарику доходить до краев экрана
    return (width / 2) - 15;
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef<number | null>(null);
  const speedRef = useRef(config.speed);
  const blinkTimeRef = useRef(0);
  const lastBlinkFrameTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      // Для горизонтального движения: половина ширины минус радиус шарика (15px)
      setAmplitude((width / 2) - 15);
      setScreenWidth(width);
    };

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    speedRef.current = config.speed;
  }, [config.speed]);

  // Режим шарика
  useEffect(() => {
    if (config.mode !== 'ball' || !isActive || !ballRef.current) {
      if (ballRef.current) {
        ballRef.current.style.display = 'none';
      }
      lastFrameTimeRef.current = null;
      return;
    }

    ballRef.current.style.display = 'block';
    let animationFrame: number;
    const el = ballRef.current;

    const animate = (currentTime: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = currentTime;
      }
      
      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = currentTime;
      
      const baseFrequency = 1;
      const currentSpeed = speedRef.current;
      
      timeRef.current += deltaTime * baseFrequency * currentSpeed * 0.5;
      
      const position = Math.sin(timeRef.current) * amplitude;
      
      el.style.transform = `translate3d(${-15 + position}px, -15px, 0)`;
      
      animationFrame = requestAnimationFrame(animate);
    };

    lastFrameTimeRef.current = null;
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      lastFrameTimeRef.current = null;
    };
  }, [isActive, amplitude, config.mode]);

  // Режим моргания
  useEffect(() => {
    if (config.mode !== 'blink' || !isActive || !leftBlinkRef.current || !rightBlinkRef.current) {
      if (leftBlinkRef.current) leftBlinkRef.current.style.display = 'none';
      if (rightBlinkRef.current) rightBlinkRef.current.style.display = 'none';
      lastBlinkFrameTimeRef.current = null;
      return;
    }

    leftBlinkRef.current.style.display = 'block';
    rightBlinkRef.current.style.display = 'block';
    
    let animationFrame: number;
    const leftEl = leftBlinkRef.current;
    const rightEl = rightBlinkRef.current;

    const animate = (currentTime: number) => {
      if (lastBlinkFrameTimeRef.current === null) {
        lastBlinkFrameTimeRef.current = currentTime;
      }
      
      const deltaTime = (currentTime - lastBlinkFrameTimeRef.current) / 1000;
      lastBlinkFrameTimeRef.current = currentTime;
      
      const baseFrequency = 1;
      const currentSpeed = speedRef.current;
      
      blinkTimeRef.current += deltaTime * baseFrequency * currentSpeed * 0.5;
      
      // Синусоида для плавного моргания (от 0 до 1)
      // Левый блок: обычная синусоида
      const leftIntensity = (Math.sin(blinkTimeRef.current) + 1) / 2; // от 0 до 1
      // Правый блок: сдвиг фазы на π (180 градусов) для поочередного моргания
      const rightIntensity = (Math.sin(blinkTimeRef.current + Math.PI) + 1) / 2; // от 0 до 1
      
      // Устанавливаем opacity для плавного моргания по очереди
      leftEl.style.opacity = leftIntensity.toString();
      rightEl.style.opacity = rightIntensity.toString();
      
      animationFrame = requestAnimationFrame(animate);
    };

    lastBlinkFrameTimeRef.current = null;
    blinkTimeRef.current = 0;
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      lastBlinkFrameTimeRef.current = null;
      blinkTimeRef.current = 0;
    };
  }, [isActive, config.mode, screenWidth]);

  const blockWidth = screenWidth * 0.33; // 33% экрана

  return (
    <>
      {/* Режим шарика */}
      <div ref={ballRef} className="stimulus" style={{ display: config.mode === 'ball' ? 'block' : 'none' }} />
      
      {/* Режим моргания - левый блок */}
      <div
        ref={leftBlinkRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: `${blockWidth}px`,
          height: '100vh',
          background: `linear-gradient(to right, 
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.8) 15%,
            rgba(200, 200, 200, 0.6) 30%,
            rgba(100, 100, 100, 0.4) 50%,
            rgba(50, 50, 50, 0.2) 70%,
            rgba(20, 20, 20, 0.1) 85%,
            rgba(0, 0, 0, 0) 100%)`,
          pointerEvents: 'none',
          zIndex: 1,
          display: config.mode === 'blink' ? 'block' : 'none'
        }}
      />
      
      {/* Режим моргания - правый блок */}
      <div
        ref={rightBlinkRef}
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: `${blockWidth}px`,
          height: '100vh',
          background: `linear-gradient(to left, 
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.8) 15%,
            rgba(200, 200, 200, 0.6) 30%,
            rgba(100, 100, 100, 0.4) 50%,
            rgba(50, 50, 50, 0.2) 70%,
            rgba(20, 20, 20, 0.1) 85%,
            rgba(0, 0, 0, 0) 100%)`,
          pointerEvents: 'none',
          zIndex: 1,
          display: config.mode === 'blink' ? 'block' : 'none'
        }}
      />
    </>
  );
};