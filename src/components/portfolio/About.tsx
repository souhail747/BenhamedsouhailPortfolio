import { useRef } from "react";
import { useInView } from "framer-motion";
import SouPhoto from "../../sou.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative bg-secondary/10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl md:text-5xl border-b-2 border-primary font-bold">About Me</h2>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-4 text-muted-foreground text-lg">
            <p>
              Hello! I'm Souhail Ben Hamed, a passionate full-stack JavaScript developer. I enjoy creating interactive web applications using React, Node.js, and PostgreSQL.
            </p>
            <p>
              My journey started at ISIMM, completing my Diploma in Computer Science. Since then, I’ve worked on freelance projects and internships.
            </p>
            <p>Technologies I use recently:</p>
            <ul className="grid grid-cols-2 gap-2 font-mono text-sm mt-4">
              {["JavaScript", "TypeScript", "React", "Node.js", "Next.js", "PostgreSQL", "MongoDB", "GraphQL"].map((tech) => (
                <li key={tech} className="flex items-center gap-2">
                  <span className="text-primary">▹</span>{tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-start relative w-full max-w-[400px]">
            <img
              src={SouPhoto}
              alt="Souhail"
              className="rounded-lg object-cover w-full h-full border-4 border-primary shadow-lg"
              loading="lazy"
            />
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
