import { createContext, useContext, ReactNode } from 'react';
import useTypingSound from '@/hooks/useTypingSound';

interface SoundContextType {
  playKeySound: () => void;
  playEnterSound: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const soundHook = useTypingSound({ volume: 0.35, enabled: true });

  return (
    <SoundContext.Provider value={soundHook}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
