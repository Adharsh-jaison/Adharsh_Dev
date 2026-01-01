import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import TerminalWindow from './TerminalWindow';
import TerminalCommand from './TerminalCommand';

const ProjectsSection = () => {
  const projects = [
    {
      name: "Chris Chatbot",
      description: "Smart chatbot for Christ University Lavasa using Retrieval-Augmented Generation (RAG), FAISS indexing, and Google Gemini 1.5 Flash. Delivers context-aware intelligent responses.",
      tech: ["Python", "RAG", "LangChain", "FAISS", "Gemini API", "BeautifulSoup"],
      status: "completed",
      type: "AI/ML"
    },
    {
      name: "Christ Utility Hub",
      description: "Web-based modular application integrating AI tools: Q&A generator, PDF/audio converters, OCR model, letter generator, and text rewriter powered by Google Gemini.",
      tech: ["Django", "Python", "Gemini API", "HTML", "CSS", "JavaScript"],
      status: "completed",
      type: "Full-Stack"
    },
    {
      name: "DriveFIX",
      description: "Web platform connecting vehicle owners with service centers. Features NLP feedback analysis, location-based search, and personalized user accounts.",
      tech: ["Django", "Python", "NLP", "SQLite", "JavaScript"],
      status: "completed",
      type: "Full-Stack"
    },
    {
      name: "Data Analysis Dashboard",
      description: "Dynamic Excel dashboard analyzing 360+ data points to uncover customer purchase behavior patterns and generate actionable insights.",
      tech: ["Python", "Excel", "Data Visualization", "Analytics"],
      status: "completed",
      type: "Analytics"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AI/ML": return "terminal-cyan";
      case "Full-Stack": return "terminal-purple";
      case "Analytics": return "terminal-green";
      default: return "terminal-text";
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <TerminalCommand command="ls -la" typingSpeed={70} resultDelay={300} prompt="~/projects">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="highlight-green"># </span>
              Featured Projects
            </h2>
          </TerminalCommand>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalWindow title={`${project.name.toLowerCase().replace(/ /g, '-')}/README.md`}>
                <div className="space-y-3 md:space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-foreground mb-1">{project.name}</h3>
                      <span className={`text-[10px] md:text-xs font-mono px-2 py-0.5 rounded bg-${getTypeColor(project.type)}/10 
                                      text-${getTypeColor(project.type)} border border-${getTypeColor(project.type)}/30`}>
                        {project.type}
                      </span>
                    </div>
                    <div className="flex gap-1 md:gap-2">
                      <button className="p-1.5 md:p-2 text-muted-foreground hover:text-primary transition-colors icon-hover click-feedback">
                        <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                      <button className="p-1.5 md:p-2 text-muted-foreground hover:text-primary transition-colors icon-hover click-feedback">
                        <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-terminal-text leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="pt-2 border-t border-border">
                    <p className="text-[10px] md:text-xs text-muted-foreground mb-2 font-mono">
                      <span className="highlight-yellow">dependencies:</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="skill-tag text-[10px] md:text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-terminal-green animate-pulse" />
                    <span className="text-[10px] md:text-xs font-mono text-terminal-green">
                      status: {project.status}
                    </span>
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
