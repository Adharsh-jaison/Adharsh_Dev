import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useTypingSound from '@/hooks/useTypingSound';

interface BootLoaderProps {
  onComplete: () => void;
}

const BootLoader = ({ onComplete }: BootLoaderProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const { playKeySound, playEnterSound } = useTypingSound({ volume: 0.35 });

  const bootSequence = [
    { text: "Booting DevOps Engine...", delay: 60 },
    { text: "Loading Cloud Modules...", delay: 50 },
    { text: "Starting AI Services...", delay: 40 },
    { text: "Access Granted ✔", delay: 30 },
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine >= bootSequence.length) {
      playEnterSound();
      setTimeout(() => {
        onComplete();
      }, 800);
      return;
    }

    const line = bootSequence[currentLine];
    let charIndex = 0;
    setDisplayedText('');

    const typeInterval = setInterval(() => {
      if (charIndex < line.text.length) {
        setDisplayedText(line.text.slice(0, charIndex + 1));
        playKeySound();
        charIndex++;
      } else {
        clearInterval(typeInterval);
        playEnterSound();
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
        }, 400);
      }
    }, line.delay);

    return () => clearInterval(typeInterval);
  }, [currentLine, playKeySound, playEnterSound]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#050505' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl px-6">
        {/* Terminal Window */}
        <div className="glass-card rounded-lg overflow-hidden border border-border/50">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-border/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-terminal-red shadow-[0_0_8px_hsl(var(--terminal-red)/0.5)]" />
              <div className="w-3 h-3 rounded-full bg-terminal-yellow shadow-[0_0_8px_hsl(var(--terminal-yellow)/0.5)]" />
              <div className="w-3 h-3 rounded-full bg-terminal-green shadow-[0_0_8px_hsl(var(--terminal-green)/0.5)]" />
            </div>
            <span className="ml-auto mr-auto text-sm font-mono text-muted-foreground">
              system_boot.sh
            </span>
            <div className="w-14" />
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm space-y-2 min-h-[200px]">
            {bootSequence.slice(0, currentLine).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span className="text-terminal-green">user@devops-ai</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-terminal-cyan">~</span>
                <span className="text-muted-foreground">$</span>
                <span className={`ml-2 ${line.text.includes('✔') ? 'text-terminal-green' : 'text-foreground'}`}>
                  {line.text}
                </span>
              </motion.div>
            ))}

            {currentLine < bootSequence.length && (
              <div className="flex items-center gap-2">
                <span className="text-terminal-green">user@devops-ai</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-terminal-cyan">~</span>
                <span className="text-muted-foreground">$</span>
                <span className="ml-2 text-foreground">{displayedText}</span>
                <span 
                  className={`inline-block w-2 h-4 bg-primary transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>

        {/* Loading Bar */}
        <div className="mt-6">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentLine) / bootSequence.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3 font-mono">
            {Math.round((currentLine / bootSequence.length) * 100)}% complete
          </p>
        </div>

        {/* Click hint for audio */}
        <p className="text-center text-xs text-muted-foreground/50 mt-4 font-mono">
          Click anywhere to enable sound effects
        </p>
      </div>
    </motion.div>
  );
};

export default BootLoader;
