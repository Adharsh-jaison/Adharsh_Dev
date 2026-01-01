import { motion } from 'framer-motion';
import TerminalWindow from './TerminalWindow';
import TerminalCommand from './TerminalCommand';

const SkillsSection = () => {
  const skillCategories = [
    {
      name: "AI & Machine Learning",
      icon: "🤖",
      color: "terminal-cyan",
      skills: ["Python", "Machine Learning", "NLP", "LLMs", "RAG", "LangChain", "Gemini API"]
    },
    {
      name: "Web Development",
      icon: "🌐",
      color: "terminal-purple",
      skills: ["Django", "Flask", "HTML", "CSS", "JavaScript", "SQLite"]
    },
    {
      name: "Data & Analytics",
      icon: "📊",
      color: "terminal-green",
      skills: ["Python", "Power BI", "MySQL", "Data Analysis", "Visualization"]
    },
    {
      name: "Tools & Technologies",
      icon: "🛠️",
      color: "terminal-yellow",
      skills: ["BeautifulSoup", "OCR", "Web Scraping", "FAISS", "Git"]
    }
  ];

  const softSkills = [
    "Curiosity & Continuous Learning",
    "Time Management", 
    "Collaboration & Teamwork",
    "Creativity",
    "Adaptability"
  ];

  return (
    <section id="skills" className="py-24 bg-terminal-bg/50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <TerminalCommand command="ls -la ./skills/" typingSpeed={60} resultDelay={300} prompt="~">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="highlight-purple"># </span>
              Core Skills
            </h2>
          </TerminalCommand>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <TerminalWindow title={`${category.name.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')}.sh`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{category.icon}</span>
                    <span className={`font-semibold text-${category.color}`}>{category.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                        className="skill-tag"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalWindow title="soft_skills.txt">
            <TerminalCommand command="cat soft_skills.txt" typingSpeed={50} resultDelay={300}>
              <div className="flex flex-wrap gap-3">
                {softSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-lg 
                             text-secondary text-sm font-mono hover:border-secondary 
                             transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </TerminalCommand>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
