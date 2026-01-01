import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BootLoader from '@/components/BootLoader';
import SoundToggle from '@/components/SoundToggle';
import useTypingSound from '@/hooks/useTypingSound';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isMuted, toggleMute } = useTypingSound();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <BootLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-background relative animate-fade-in">
          {/* Noise Overlay */}
          <div className="noise-overlay" />
          
          {/* Cursor Glow Effect */}
          <CursorGlow />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content with navbar offset */}
          <main className="pt-[72px] md:pt-[72px]">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>
          
          {/* Footer */}
          <Footer />

          {/* Sound Toggle */}
          <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
        </div>
      )}
    </>
  );
};

export default Index;
