import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";

const featuredProjects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, Stripe payment integration, and an admin dashboard. Built with performance and scalability in mind.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    github: "https://github.com",
    external: "https://example.com",
    image: "gradient",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative project management tool featuring real-time updates, drag-and-drop kanban boards, team chat, and automated workflow triggers.",
    tech: ["React", "Socket.io", "Express", "MongoDB", "Docker"],
    github: "https://github.com",
    external: "https://example.com",
    image: "gradient",
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered content creation platform that generates blog posts, social media content, and marketing copy using GPT-4 API with custom fine-tuning.",
    tech: ["TypeScript", "OpenAI API", "NestJS", "React", "Tailwind"],
    github: "https://github.com",
    external: "https://example.com",
    image: "gradient",
  },
];

const otherProjects = [
  {
    title: "Weather Dashboard",
    description: "Real-time weather app with location detection, 7-day forecasts, and beautiful data visualizations.",
    tech: ["React", "Chart.js", "OpenWeather API"],
    github: "https://github.com",
    external: "https://example.com",
  },
  {
    title: "Crypto Portfolio Tracker",
    description: "Track cryptocurrency investments with live price updates and portfolio analytics.",
    tech: ["Vue.js", "Node.js", "CoinGecko API"],
    github: "https://github.com",
  },
  {
    title: "Recipe Finder",
    description: "Search and save recipes from around the world with nutritional information and meal planning.",
    tech: ["React", "Firebase", "Spoonacular API"],
    github: "https://github.com",
    external: "https://example.com",
  },
  {
    title: "Markdown Editor",
    description: "A minimal markdown editor with live preview, syntax highlighting, and export options.",
    tech: ["TypeScript", "React", "CodeMirror"],
    github: "https://github.com",
  },
  {
    title: "URL Shortener",
    description: "Custom URL shortening service with analytics tracking and QR code generation.",
    tech: ["Node.js", "MongoDB", "Redis"],
    github: "https://github.com",
    external: "https://example.com",
  },
  {
    title: "Chat Application",
    description: "Real-time messaging app with room creation, file sharing, and message encryption.",
    tech: ["Socket.io", "Express", "React"],
    github: "https://github.com",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-12 max-w-4xl mx-auto">
            <span className="font-mono text-primary">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <div className="h-px bg-border flex-1 max-w-xs" />
          </div>

          {/* Featured Projects */}
          <div className="space-y-24 mb-24">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative grid md:grid-cols-12 gap-4 items-center ${
                  index % 2 === 1 ? "md:text-right" : ""
                }`}
              >
                {/* Project Image */}
                <div
                  className={`md:col-span-7 ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <div className="relative group rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 rounded-lg" />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                </div>

                {/* Project Content */}
                <div
                  className={`md:col-span-6 ${
                    index % 2 === 1
                      ? "md:order-1 md:col-start-1"
                      : "md:col-start-6"
                  } md:absolute md:w-1/2 ${index % 2 === 1 ? "md:left-0" : "md:right-0"}`}
                >
                  <p className="font-mono text-primary text-sm mb-2">
                    Featured Project
                  </p>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <div className="bg-card p-6 rounded-lg card-shadow border border-border mb-4">
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <ul
                    className={`flex flex-wrap gap-3 font-mono text-sm text-muted-foreground mb-4 ${
                      index % 2 === 1 ? "md:justify-end" : ""
                    }`}
                  >
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <div
                    className={`flex gap-4 ${
                      index % 2 === 1 ? "md:justify-end" : ""
                    }`}
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold">Other Noteworthy Projects</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-card p-6 rounded-lg card-shadow border border-border group hover:border-primary/50 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <Folder className="text-primary" size={40} />
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
