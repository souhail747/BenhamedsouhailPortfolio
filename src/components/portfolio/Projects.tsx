import { color, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder, Bold } from "lucide-react";
import edix from "../../edix.png";
import ecom from "../../ecomm.png";

const featuredProjects = [
  {
    id: 1,
    title: "EdixAcademy",
    description:
      "A full-stack e-learning platform connecting students and tutors. Students can enroll in courses, access videos, PDFs, quizzes, and track their progress. Tutors can create courses, manage students, and conduct live sessions. Built for scalability, interactivity, and a seamless learning experience.",
    tech: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Socket.io",
      "AWS",
    ],
    github: "https://github.com/souhail747/study",
    external: "https://edixacademy.com/",
    image: edix,
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce web application featuring product browsing, secure user authentication, shopping cart, and online payments. Includes an admin dashboard for managing products, orders, and users. Built with performance, scalability, and a smooth user experience in mind.",
    tech: ["React", "Firebase", "node ", "Framer Motion"],
    github: "https://github.com/souhail747/e-comm/tree/main/e-com",
    image: ecom,
  },
];

const otherProjects = [
  {
    title: "prayer ",
    description:
      "A React.js web application that displays daily prayer times for any city in Tunisia, shows the next upcoming prayer, and includes a live countdown timer. Users can select their city ",
    tech: ["React", "OpenWeather API"],
    github: "https://github.com/souhail747/prayer-app",
  },
  {
    title: "Fun4Games",
    description:
      "A portfolio of 4 web-based games including FlipFlaap, XO, and others, developed with JavaScript. These games showcase interactive gameplay, responsive design.",

    tech: ["JavaScript", "NextJS"],
    github: "https://github.com/souhail747/Games",
  },
  {
    title: "Mobile Access Scanner",
    description:
      "A mobile app that scans QR codes to verify user access. Responsible persons can grant access, while admins can monitor who entered and manage the number of allowed accesses.",
    tech: ["React Native", "Firebase", "Framer Motion"],
    github: "https://github.com/souhail747/mbobileApp",
    external: "",
  },
];

const Projects = () => {
  const featuredRef = useRef(null);
  const otherRef = useRef(null);
  const isFeaturedInView = useInView(featuredRef, {
    once: true,
    margin: "-100px",
  });
  const isOtherInView = useInView(otherRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6  ">
        {/* Featured Projects */}
        <motion.div
          ref={featuredRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-1 max-w-4xl  mx-auto"
        >
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
          <h2 className="text-3xl md:text-4xl font-bold  "> Projects</h2>
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
        </motion.div>

        <div className="space-y-5 mb-24 ">
          <h3 className="gradient-text  my-2 w-full">Featured Projects</h3>

          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="grid md:grid-cols-12 gap-6 items-center"
            >
              {/* Project Image */}
              <div
                className={`md:col-span-7 ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <a
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group rounded-lg overflow-hidden cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg"
                  >
                    <span className="flex items-center gap-2 text-primary font-semibold">
                      <ExternalLink size={20} />
                      {project.id === 1 ? "View Live" : "Github"}
                    </span>
                  </motion.div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </a>
              </div>

              {/* Project Content */}
              <div
                className={`md:col-span-5 ${
                  index % 2 === 1 ? "md:order-1 " : ""
                }`}
              >
                <motion.a
                  href={project.id===1 ?project.external:project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold mb-4 block origin-center text-foreground" // default color
                  whileHover={{ color: "#669bbc" }} 
                  transition={{ duration: 0.7 }} 
                >
                  {project.title}
                </motion.a>

                <div className="bg-card p-6 rounded-lg border border-border group hover:border-primary mb-4 transition-colors duration-300">
                  <p className="text-muted-foreground group-hover:text-blue-200 transition-colors duration-300">
                    {project.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-3 font-mono text-sm text-muted-foreground mb-4">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <Github size={30} />
                  </a>
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    { project.external && <ExternalLink size={30} /> }
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          ref={otherRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isOtherInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold">Other Projects</h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => (
            <a
              key={project.title}
              href={project.github} // go to GitHub
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isOtherInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="bg-card p-6 hover:font-55 rounded-lg border border-border group hover:border-primary transition-colors cursor-pointer"
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
                <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                <p
                  className="text-muted-foreground text-sm mb-4"
                  style={{ transition: "color 0.3s" }}
                >
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
