import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';
import TerminalCommand from './TerminalCommand';

const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:jaisonadharsh87@gmail.com", label: "Email" },
  ];

  return (
    <section id="hero" className="min-h-[calc(100vh-72px)] flex items-center relative overflow-hidden px-4 md:px-0">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-terminal-bg" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left"
          >
            <TerminalCommand command="whoami" typingSpeed={80} resultDelay={400}>
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="gradient-text glow-text">Adharsh Jaison</span>
              </motion.h1>
            </TerminalCommand>

            <TerminalCommand command="cat role.txt" typingSpeed={60} resultDelay={300}>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground">
                Data Scientist | AI Developer | Full-Stack Engineer
              </p>
            </TerminalCommand>

            <TerminalCommand command="echo $MISSION" typingSpeed={50} resultDelay={300}>
              <p className="text-sm md:text-base text-terminal-text leading-relaxed max-w-lg mx-auto lg:mx-0">
                Building intelligent systems with cutting-edge AI and scalable architecture. 
                Passionate about transforming data into actionable insights.
              </p>
            </TerminalCommand>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-3 md:gap-4 pt-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#projects"
                className="group px-4 md:px-6 py-2.5 md:py-3 bg-primary text-primary-foreground font-mono text-xs md:text-sm rounded-lg 
                         hover:bg-primary/90 transition-all duration-300 glow-border btn-glow click-feedback flex items-center gap-2"
              >
                <span>./view_projects.sh</span>
              </a>
              <a
                href="#contact"
                className="group px-4 md:px-6 py-2.5 md:py-3 border border-secondary text-secondary font-mono text-xs md:text-sm rounded-lg
                         hover:bg-secondary/10 transition-all duration-300 glow-border-purple btn-glow click-feedback flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 md:w-4 md:h-4 icon-hover" />
                <span>download_resume</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-3 md:gap-4 pt-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 md:p-3 border border-border rounded-lg text-muted-foreground hover:text-primary 
                           hover:border-primary transition-all duration-300 hover:glow-border click-feedback neon-focus"
                >
                  <link.icon className="w-4 h-4 md:w-5 md:h-5 icon-hover" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl scale-110" />
              
              {/* Terminal Frame */}
              <div className="terminal-window glass-card p-1 relative">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                  </div>
                  <span className="terminal-title">profile.png</span>
                  <div className="w-14" />
                </div>
                <div className="p-2 bg-terminal-bg/80">
                  <img
                    src={profilePhoto}
                    alt="Adharsh Jaison"
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded 
                             grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 px-2 md:px-3 py-1 bg-terminal-green/20 border border-terminal-green 
                         rounded text-terminal-green text-[10px] md:text-xs font-mono glass-card"
              >
                status: online
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 px-2 md:px-3 py-1 bg-terminal-purple/20 border border-terminal-purple 
                         rounded text-terminal-purple text-[10px] md:text-xs font-mono glass-card"
              >
                AI-powered
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
