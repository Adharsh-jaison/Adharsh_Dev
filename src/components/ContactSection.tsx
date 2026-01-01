import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, Phone } from 'lucide-react';
import TerminalWindow from './TerminalWindow';
import TerminalCommand from './TerminalCommand';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "jaisonadharsh87@gmail.com", href: "mailto:jaisonadharsh87@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 6238966360", href: "tel:+916238966360" },
    { icon: Github, label: "GitHub", value: "github.com/adharsh", href: "https://github.com/" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/adharsh", href: "https://linkedin.com/" },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <TerminalCommand command="./send_message.sh" typingSpeed={60} resultDelay={300} prompt="~">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="highlight-cyan"># </span>
              Get In Touch
            </h2>
          </TerminalCommand>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TerminalWindow title="compose_message.sh">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-mono text-muted-foreground mb-1.5 md:mb-2">
                    <span className="highlight-cyan">$NAME</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-muted/30 border border-border rounded-lg font-mono text-xs md:text-sm
                             text-foreground placeholder-muted-foreground neon-focus transition-all glass-card"
                    placeholder="Enter your name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-mono text-muted-foreground mb-1.5 md:mb-2">
                    <span className="highlight-cyan">$EMAIL</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-muted/30 border border-border rounded-lg font-mono text-xs md:text-sm
                             text-foreground placeholder-muted-foreground neon-focus transition-all glass-card"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-mono text-muted-foreground mb-1.5 md:mb-2">
                    <span className="highlight-cyan">$MESSAGE</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-muted/30 border border-border rounded-lg font-mono text-xs md:text-sm
                             text-foreground placeholder-muted-foreground neon-focus transition-all resize-none glass-card"
                    placeholder="Write your message here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 md:py-3 px-4 md:px-6 bg-primary text-primary-foreground font-mono text-xs md:text-sm rounded-lg
                           hover:bg-primary/90 transition-all duration-300 glow-border btn-glow click-feedback flex items-center 
                           justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 md:w-4 md:h-4 icon-hover" />
                      <span>./send_message</span>
                    </>
                  )}
                </button>
              </form>
            </TerminalWindow>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            <TerminalWindow title="contact_info.sh">
              <TerminalCommand command="cat contact_info.txt" typingSpeed={50} resultDelay={300}>
                <div className="space-y-2 md:space-y-3">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/20 rounded-lg border border-border
                               hover:border-primary/50 transition-all duration-300 group card-lift glass-card click-feedback"
                    >
                      <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-4 h-4 md:w-5 md:h-5 text-primary icon-hover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] md:text-xs text-muted-foreground font-mono">{info.label}</p>
                        <p className="text-xs md:text-sm text-foreground group-hover:text-primary transition-colors truncate">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </TerminalCommand>
            </TerminalWindow>

            <TerminalWindow title="availability.status">
              <div className="text-center py-3 md:py-4">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-terminal-green animate-pulse" />
                  <span className="text-terminal-green font-mono text-xs md:text-sm">Available for opportunities</span>
                </div>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Open to internships, collaborations, and exciting AI/ML projects.
                </p>
              </div>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
