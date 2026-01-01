import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ isMuted, onToggle }: SoundToggleProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={onToggle}
      className="fixed bottom-4 right-4 z-[998] p-3 rounded-full glass-card border border-border/50 
                 hover:border-primary/50 transition-all click-feedback neon-focus group"
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      ) : (
        <Volume2 className="w-5 h-5 text-primary" />
      )}
    </motion.button>
  );
};

export default SoundToggle;
