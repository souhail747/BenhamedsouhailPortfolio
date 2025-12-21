import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SouPhoto from "../../sou.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative bg-secondary/10">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-primary text-lg">01.</span>
            <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
            <div className="h-px bg-border flex-1 max-w-xs" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
         

            {/* Text Content */}
            <div className="md:w-1/2 space-y-4 text-muted-foreground text-lg">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
              >
                <p>
                  Hello! I'm Souhail Ben Hamed, a passionate full-stack JavaScript developer. I enjoy creating interactive and visually engaging web applications using modern technologies like React, Node.js, and PostgreSQL.
                </p>
                <p>
                  My journey into web development started during my studies at ISIMM, where I completed my Diploma in Computer Science. Since then, I’ve worked on freelance projects and internships, honing my skills in full-stack development.
                </p>
                <p>
                  Here are a few technologies I've been working with recently:
                </p>

                {/* Tech List */}
                <ul className="grid grid-cols-2 gap-2 font-mono text-sm mt-4">
                  {[
                    "JavaScript (ES6+)",
                    "TypeScript",
                    "React",
                    "Node.js",
                    "Next.js",
                    "PostgreSQL",
                    "MongoDB",
                    "GraphQL",
                  ].map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span className="text-primary">▹</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
               {/* Profile Image */}
            <div className="md:w-1/2 flex justify-start">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[400px]"
              >
                <img
                  src={SouPhoto}
                  alt="Souhail"
                  className="rounded-lg object-cover w-full h-full border-4 border-primary shadow-lg"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
