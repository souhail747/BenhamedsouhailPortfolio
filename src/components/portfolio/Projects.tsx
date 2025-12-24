import { ExternalLink, Github, Folder } from "lucide-react";
import edix from "../../edix.png";
import ecom from "../../luxe.png";

const featuredProjects = [
  {
    id: 1,
    title: "EdixAcademy",
    description:
      "Comprehensive full-stack e-learning platform enabling students to enroll in courses, access video lectures, PDFs, and interactive quizzes. Tutors can efficiently create, manage, and track courses while overseeing student progress and performance.",
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

  id: 1,
  title: "Luxe Shop",
  description:
    "Full-featured e-commerce platform built with modern technologies. Includes product browsing, secure authentication, shopping cart, wishlist, smooth animations, dark/light theme, seamless payment integration, and an admin dashboard for managing products, orders, and users efficiently.",
  tech: ["React", "TailwindCSS", "Node.js", "Framer Motion", "Zustand"],
  github: "https://github.com/souhail747/luxe",
  external: "https://shopluxe74.vercel.app", 
  image: ecom,
}

];

const otherProjects = [
  {
    title: "Prayer App",
    description:
      "Displays daily prayer times for any city in Tunisia with countdown timer.",
    tech: ["React", "OpenWeather API"],
    github: "https://github.com/souhail747/prayer-app",
    external: "",
  },
  {
    title: "Fun4Games",
    description:
"Four web-based games featuring interactive gameplay and responsive design."
,    tech: ["JavaScript", "NextJS"],
    github: "https://github.com/souhail747/Games",
    external: "",
  },
  {
    title: "Mobile Access Scanner",
    description:
      "Scans QR codes to verify access. Admins monitor entries and limits.",
    tech: ["React Native", "Firebase", "Framer Motion"],
    github: "https://github.com/souhail747/mbobileApp",
    external: "",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 max-w-4xl mx-auto">
          <div className="h-px bg-border flex-1 max-w-xs" />
          <h2 className="text-3xl md:text-4xl border-b-2 border-primary font-bold">
            Projects
          </h2>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        {/* Featured */}
        <h3 className="gradient-text my-2 w-full">Featured Projects</h3>
        <div className="space-y-5 mb-24">
          {featuredProjects.map((project, i) => (
            <div
              key={project.title}
              className={`grid md:grid-cols-12 gap-6 items-center`}
            >
              <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <a
                  href={project.external || project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative rounded-lg overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-70 transition-opacity duration-200">
                    <span className="flex items-center gap-2 text-primary font-semibold">
                      <ExternalLink size={20} />{" "}
                      {project.id === 1 ? "View Live" : "Github"}
                    </span>
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </a>
              </div>

              <div className={`md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}>
                <a
                  href={project.external || project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold mb-4 block text-foreground hover:text-[#669bbc] transition-colors duration-700"
                >
                  {project.title}
                </a>

                <div className="bg-card p-6 rounded-lg border border-border group hover:border-primary mb-4 transition-colors duration-300">
                  <p className="text-muted-foreground group-hover:text-blue-200 transition-colors duration-300">
                    {project.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-3 font-mono text-sm text-muted-foreground mb-4">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="transition-all duration-200 hover:font-black"
                    >
                      {tech}
                    </li>
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
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={30} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other */}
        <h3 className="text-2xl font-bold mb-6">Other Projects</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => (
            <a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-card p-6 rounded-lg border border-border group hover:border-primary transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <Folder className="text-primary" size={40} />
                </div>
                <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
