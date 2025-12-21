import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense, lazy } from "react";

const HeroBackground3D = lazy(() => import("./HeroBackground3D"));

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <HeroBackground3D />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50 z-[1]" />
        <h1
          style={{
            position: "fixed",
            left: "22%",
            top: "88%",
            transform: "translate(-50%, -50%) rotate(-6deg)",
            fontSize: "100px",
            fontWeight: "bold",
            pointerEvents: "none",
            userSelect: "none",
            color: "white", 
            WebkitBackgroundClip: "text",
            opacity: 0.04,
          }}
        >
          {"< Souhail />"}
        </h1>
        <h1
          style={{
            position: "fixed",
            left: "90%",
            top: "48%",
            width: "800px",
            transform: "translate(-50%, -50%) rotate(-40deg)",
            fontSize: "70px",
            fontWeight: "bold",
            pointerEvents: "none",
            userSelect: "none",
            color: "#FFD700",
            WebkitBackgroundClip: "text",
            opacity: 0.06,
          }}
        >
          {"FULLSTACK JS"}
        </h1>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="gradient-text">Souhail Benhamed</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground mb-6"
          >
            Full-Stack JavaScript Developer
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            I create modern, high-performance web applications using the latest
            JavaScript technologies. With expertise in React, Node.js, and
            full-stack development, I deliver seamless and scalable digital
            solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center gap-6"
          >
            {[
              { icon: Github, href: "https://github.com/souhail747", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/souhail-benhamed-569826242/", label: "LinkedIn" },
              { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=souhailleaders2003@gmail.com", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon size={40} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown size={24} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
