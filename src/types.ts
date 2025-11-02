// src/types.ts
export type StimulationType = 'eye' | 'tactile' | 'audio';
export type MovementPattern = 'horizontal' | 'vertical' | 'circle';

export interface StimulationConfig {
  type: StimulationType;
  speed: number;      // 1-10
  duration: number;   // в секундах
  pattern: MovementPattern;
}

export interface ProtocolStep {
  duration: number;
  stimulation: StimulationConfig;
  instruction?: string;
}

export interface Protocol {
  id: string;
  name: string;
  steps: ProtocolStep[];
}

export interface Session {
  id: string;
  protocol: Protocol;
  startTime: Date;
  currentStepIndex: number;
}

export interface AppState {
  currentSession: Session | null;
  isPlaying: boolean;
  currentStep: number;
  remainingTime: number;
}

export const KEYBOARD_SHORTCUTS = {
  Space: 'pause/resume',
  ArrowRight: 'next_step',
  ArrowLeft: 'previous_step',
  Escape: 'emergency_stop'
} as const;