import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-primary">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <div className="h-px bg-border flex-1 max-w-xs" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Text Content */}
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p>
                Hello! I'm John, a passionate full-stack JavaScript developer based in 
                San Francisco. I enjoy creating things that live on the internet, whether 
                that be websites, applications, or anything in between.
              </p>
              <p>
                My journey into web development started back in 2015 when I decided to try 
                customizing a Tumblr theme — turns out hacking together a custom reblog 
                button taught me a lot about HTML & CSS!
              </p>
              <p>
                Fast-forward to today, and I've had the privilege of working at a 
                start-up, a large corporation, and a design agency. My main focus these 
                days is building accessible, inclusive products and digital experiences.
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
            </div>

            {/* Profile Image */}
            <div className="relative group">
              <div className="relative z-10 rounded-lg overflow-hidden border-gradient">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <span className="font-mono text-6xl text-primary/50">JD</span>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
