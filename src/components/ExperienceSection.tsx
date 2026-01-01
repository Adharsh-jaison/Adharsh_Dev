import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import TerminalWindow from './TerminalWindow';
import TerminalCommand from './TerminalCommand';
import CertificateModal from './CertificateModal';

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}

const ExperienceSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const certifications: Certificate[] = [
    {
      name: "Fundamentals of AI Agents Using RAG and LangChain",
      issuer: "Coursera",
      date: "Mar 2025",
      credentialUrl: "https://coursera.org/verify/example1"
    },
    {
      name: "Meta Back-end Developer Professional Certificate",
      issuer: "Coursera",
      date: "Mar 2025",
      credentialUrl: "https://coursera.org/verify/example2"
    }
  ];

  const handleCertificateClick = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
  };

  return (
    <section id="experience" className="py-24 bg-terminal-bg/50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <TerminalCommand command="git log --oneline experience" typingSpeed={50} resultDelay={300} prompt="~">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="highlight-yellow"># </span>
              Experience & Certifications
            </h2>
          </TerminalCommand>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TerminalWindow title="experience.log">
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-primary/50">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">Feb 2025 – Jun 2025</span>
                      <span className="px-2 py-0.5 text-xs font-mono bg-terminal-green/10 text-terminal-green 
                                     border border-terminal-green/30 rounded">current</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">AI Intern</h3>
                    <p className="text-sm text-terminal-cyan">Christ Infotech, Pune</p>
                    <div className="mt-4 space-y-3 text-sm text-terminal-text">
                      <div>
                        <p className="text-foreground font-semibold mb-1">→ Christ Utility Hub</p>
                        <p>Developed modular AI application with Q&A generator, converters, OCR model using Django & Gemini 1.5 Flash.</p>
                      </div>
                      <div>
                        <p className="text-foreground font-semibold mb-1">→ Chris Chatbot</p>
                        <p>Built RAG-powered chatbot with FAISS indexing and LangChain for context-aware responses.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TerminalWindow title="certifications.json">
              <TerminalCommand command="cat certifications.json | jq" typingSpeed={40} resultDelay={300}>
                <div className="font-mono text-sm space-y-2">
                  {certifications.map((cert, index) => (
                    <button
                      key={cert.name}
                      onClick={() => handleCertificateClick(cert)}
                      className="w-full text-left p-3 rounded-lg border border-border/50 
                               hover:border-primary/50 hover:bg-muted/30 transition-all 
                               group cursor-pointer click-feedback card-lift"
                      aria-label={`View certificate: ${cert.name}`}
                    >
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-terminal-yellow mt-0.5 icon-hover" />
                        <div className="flex-1">
                          <p className="text-terminal-cyan group-hover:text-primary transition-colors">
                            {cert.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </TerminalCommand>
            </TerminalWindow>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <TerminalWindow title="languages.conf">
                <div className="space-y-2 text-sm font-mono">
                  <p className="text-muted-foreground">
                    <span className="highlight-yellow"># Language Proficiency</span>
                  </p>
                  <p>
                    <span className="text-terminal-cyan">English</span>
                    <span className="text-muted-foreground"> = </span>
                    <span className="text-terminal-green">"Professional"</span>
                  </p>
                  <p>
                    <span className="text-terminal-cyan">Malayalam</span>
                    <span className="text-muted-foreground"> = </span>
                    <span className="text-terminal-green">"Native"</span>
                  </p>
                  <p>
                    <span className="text-terminal-cyan">Hindi</span>
                    <span className="text-muted-foreground"> = </span>
                    <span className="text-terminal-green">"Conversational"</span>
                  </p>
                </div>
              </TerminalWindow>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ExperienceSection;
