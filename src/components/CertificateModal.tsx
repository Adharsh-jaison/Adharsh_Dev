import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, ExternalLink, Maximize2 } from 'lucide-react';

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal = ({ certificate, isOpen, onClose }: CertificateModalProps) => {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isFullscreen) {
        setIsFullscreen(false);
      } else {
        onClose();
      }
    }
    if (e.key === '+' || e.key === '=') {
      setZoom((prev) => Math.min(prev + 0.25, 3));
    }
    if (e.key === '-') {
      setZoom((prev) => Math.max(prev - 0.25, 0.5));
    }
  }, [onClose, isFullscreen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setZoom(1);
      setImageError(false);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));

  const handleDownload = () => {
    if (certificate?.image) {
      const link = document.createElement('a');
      link.href = certificate.image;
      link.download = `${certificate.name.replace(/\s+/g, '_')}.png`;
      link.click();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setZoom(1);
  };

  return (
    <AnimatePresence>
      {isOpen && certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-title"
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-lg" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative glass-card rounded-xl overflow-hidden flex flex-col ${
              isFullscreen 
                ? 'w-full h-full max-w-none max-h-none rounded-none' 
                : 'w-full max-w-4xl max-h-[90vh]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 shrink-0">
              <div className="flex-1 min-w-0">
                <h2 id="certificate-title" className="text-lg font-bold text-foreground truncate">
                  {certificate.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {certificate.issuer} • {certificate.date}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-muted transition-colors click-feedback neon-focus"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted transition-colors click-feedback neon-focus"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificate Image/Placeholder */}
            <div 
              className="relative overflow-auto flex-1 bg-terminal-bg/50 flex items-center justify-center"
              style={{ minHeight: isFullscreen ? '0' : '400px' }}
            >
              {certificate.image && !imageError ? (
                <motion.div
                  className="relative"
                  style={{ 
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center center'
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={certificate.image}
                    alt={certificate.name}
                    className="max-w-full max-h-full object-contain cursor-zoom-in"
                    onError={() => setImageError(true)}
                    onClick={handleZoomIn}
                  />
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="terminal-window p-8 max-w-md">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-3xl">🏆</span>
                      </div>
                      <div>
                        <p className="font-mono text-lg text-terminal-cyan mb-2">
                          {certificate.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Issued by <span className="text-terminal-green">{certificate.issuer}</span>
                        </p>
                        <p className="text-sm mt-2 text-terminal-yellow font-mono">
                          {certificate.date}
                        </p>
                      </div>
                      {certificate.credentialUrl && (
                        <a
                          href={certificate.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Verify Credential
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Controls */}
            <div className="flex items-center justify-between p-4 border-t border-border/50 bg-muted/30 shrink-0">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-lg border border-border hover:border-primary 
                           hover:text-primary transition-all click-feedback neon-focus
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Zoom out"
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm font-mono text-muted-foreground min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-lg border border-border hover:border-primary 
                           hover:text-primary transition-all click-feedback neon-focus
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Zoom in"
                  disabled={zoom >= 3}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border 
                             hover:border-primary hover:text-primary transition-all click-feedback neon-focus
                             font-mono text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Verify</span>
                  </a>
                )}
                {certificate.image && !imageError && (
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary 
                             text-primary-foreground hover:bg-primary/90 transition-all 
                             click-feedback btn-glow font-mono text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                )}
              </div>
            </div>

            {/* Keyboard hints */}
            <div className="absolute bottom-20 left-4 text-xs text-muted-foreground/50 font-mono hidden md:block">
              ESC to close • +/- to zoom
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
