import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const NAVBAR_HEIGHT = 64;
const SCROLL_OFFSET = 72;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { label: "about", href: "#about" },
    { label: "skills", href: "#skills" },
    { label: "projects", href: "#projects" },
    { label: "experience", href: "#experience" },
    { label: "contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const sections = navItems.map(item => item.label);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -50% 0px`, threshold: 0 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - SCROLL_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsOpen(false);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300`}
      style={{ height: `${NAVBAR_HEIGHT}px` }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={`h-full transition-all duration-300 ${
        scrolled ? 'glass-card border-b border-border/50' : ''
      }`}>
        <div className="container mx-auto px-4 md:px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-2 font-mono text-primary click-feedback"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Go to top"
            >
              <Terminal className="w-4 h-4 md:w-5 md:h-5 icon-hover" />
              <span className="font-bold text-sm md:text-base">adharsh.dev</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1" role="menubar">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 md:px-4 py-2 font-mono text-xs md:text-sm transition-colors 
                           relative group click-feedback ${
                             activeSection === item.label 
                               ? 'text-primary' 
                               : 'text-muted-foreground hover:text-primary'
                           }`}
                  role="menuitem"
                  aria-current={activeSection === item.label ? 'page' : undefined}
                >
                  <span className={`text-primary transition-opacity ${
                    activeSection === item.label ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>./</span>
                  {item.label}
                  {activeSection === item.label && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors click-feedback"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-b border-border/50"
            role="menu"
          >
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-3 py-2.5 font-mono text-sm hover:bg-muted/50 
                           rounded-lg transition-all click-feedback ${
                             activeSection === item.label 
                               ? 'text-primary bg-muted/30' 
                               : 'text-muted-foreground hover:text-primary'
                           }`}
                  role="menuitem"
                >
                  <span className="text-primary">$ </span>
                  cd ./{item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
