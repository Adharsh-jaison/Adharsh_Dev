import { motion } from 'framer-motion';
import { Terminal, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-terminal-bg/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <Terminal className="w-4 h-4 text-primary" />
            <span>© 2025 Adharsh Jaison</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-terminal-red animate-pulse" />
            <span>and</span>
            <span className="text-primary">React + TypeScript</span>
          </div>

          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-terminal-green">$ </span>
            <span className="typing-cursor">exit 0</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
