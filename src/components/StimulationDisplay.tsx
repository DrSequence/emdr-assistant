import React, { useEffect, useRef, useState } from 'react';
import type { StimulationConfig } from '../types';
import './StimulationDisplay.css';

export const StimulationDisplay: React.FC<{
  config: StimulationConfig;
  isActive: boolean;
}> = ({ config, isActive }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [amplitude, setAmplitude] = useState(() => window.innerWidth * 0.35);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef<number | null>(null);
  const speedRef = useRef(config.speed);

  useEffect(() => {
    const updateAmplitude = () => {
      setAmplitude(window.innerWidth * 0.35);
    };

    window.addEventListener('resize', updateAmplitude);
    return () => window.removeEventListener('resize', updateAmplitude);
  }, []);

  useEffect(() => {
    speedRef.current = config.speed;
  }, [config.speed]);

  useEffect(() => {
    if (!isActive || !ref.current) {
      lastFrameTimeRef.current = null;
      return;
    }

    let animationFrame: number;
    const el = ref.current;

    const animate = (currentTime: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = currentTime;
      }
      
      // Вычисляем дельту времени в секундах
      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = currentTime;
      
      // Базовая частота
      const baseFrequency = 1;
      const currentSpeed = speedRef.current;
      
      // Накопление времени с учетом скорости
      timeRef.current += deltaTime * baseFrequency * currentSpeed * 0.5;
      
      // Прямая позиция из синусоиды без интерполяции (убираем шлейф)
      const position = Math.sin(timeRef.current) * amplitude;
      
      // Используем translate3d для аппаратного ускорения
      el.style.transform = `translate3d(${-15 + position}px, -15px, 0)`;
      
      animationFrame = requestAnimationFrame(animate);
    };

    lastFrameTimeRef.current = null;
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      lastFrameTimeRef.current = null;
    };
  }, [isActive, amplitude]);

  return <div ref={ref} className="stimulus" />;
};