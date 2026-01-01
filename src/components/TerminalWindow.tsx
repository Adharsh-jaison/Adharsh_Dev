import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title = "bash", children, className = "" }: TerminalWindowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`terminal-window ${className}`}
    >
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <span className="terminal-title">{title}</span>
        <div className="w-14" />
      </div>
      <div className="terminal-body scanline">
        {children}
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
