import { motion } from 'framer-motion';
import TerminalWindow from './TerminalWindow';
import TerminalCommand from './TerminalCommand';

const AboutSection = () => {
  const stats = [
    { label: "Education", value: "M.Sc Data Science", icon: "🎓" },
    { label: "CGPA", value: "3.378/4", icon: "📊" },
    { label: "Experience", value: "AI Intern", icon: "💼" },
    { label: "Focus", value: "AI & ML", icon: "🤖" },
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <TerminalCommand command="cat about.md" typingSpeed={60} resultDelay={300} prompt="~">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="highlight-cyan"># </span>
              About Me
            </h2>
          </TerminalCommand>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          <TerminalWindow title="about.sh">
            <TerminalCommand command="./about.sh" typingSpeed={50} resultDelay={400}>
              <div className="space-y-3 md:space-y-4 text-xs md:text-sm leading-relaxed">
                <p className="text-foreground">
                  I am a highly motivated <span className="highlight-cyan">Data Science graduate student</span> with 
                  expertise in Python, SQL, and Machine Learning.
                </p>
                <p className="text-foreground">
                  With hands-on experience in <span className="highlight-purple">exploratory data analysis</span>, 
                  <span className="highlight-cyan"> machine learning</span>, and 
                  <span className="highlight-purple"> full-stack web development</span>, I excel in leveraging 
                  data to derive insights and create impactful solutions.
                </p>
                <p className="text-foreground">
                  Passionate about driving innovation and solving real-world problems through 
                  <span className="highlight-green"> technology</span>.
                </p>
                <p className="text-terminal-green mt-4">
                  ✓ Process completed successfully.
                </p>
              </div>
            </TerminalCommand>
          </TerminalWindow>

          <div className="space-y-4 md:space-y-6">
            <TerminalWindow title="stats.json">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 md:p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/50 
                             transition-all duration-300 group card-lift glass-card click-feedback"
                  >
                    <span className="text-xl md:text-2xl mb-2 block">{stat.icon}</span>
                    <p className="text-[10px] md:text-xs text-muted-foreground font-mono">{stat.label}</p>
                    <p className="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </TerminalWindow>

            <TerminalWindow title="education.log">
              <div className="space-y-3 md:space-y-4 text-xs md:text-sm">
                <div className="pb-3 md:pb-4 border-b border-border">
                  <p className="text-muted-foreground text-[10px] md:text-xs">Aug 2023 - Jun 2025</p>
                  <p className="text-foreground font-semibold text-sm md:text-base">M.Sc in Data Science</p>
                  <p className="text-terminal-cyan text-[10px] md:text-xs">CHRIST University, Pune Lavasa</p>
                  <p className="text-terminal-green text-[10px] md:text-xs mt-1">CGPA: 3.378/4</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] md:text-xs">Jul 2020 - Jul 2023</p>
                  <p className="text-foreground font-semibold text-sm md:text-base">B.Sc in Mathematics</p>
                  <p className="text-terminal-cyan text-[10px] md:text-xs">Nirmalagiri College, Kannur</p>
                  <p className="text-terminal-green text-[10px] md:text-xs mt-1">CGPA: 8.693/10</p>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
