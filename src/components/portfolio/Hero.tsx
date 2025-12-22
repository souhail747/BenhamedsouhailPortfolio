import { motion, useInView } from "framer-motion";
import { useRef, Suspense, useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

const HeroBackground3D = React.lazy(() => import("./HeroBackground3D"));
const isMobile = () => {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const socialLinks = [
  { icon: Github, href: "https://github.com/souhail747", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/souhail-benhamed-569826242/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: isMobile()
      ? "mailto:souhailleaders2003@gmail.com"
      : "https://mail.google.com/mail/?view=cm&fs=1&to=souhailleaders2003@gmail.com",
    label: "Email",
  },
];
const words = [
  "Full-stack Websites",
  "React Applications",
  "Node.js APIs",
  "RESTful Services",
  "Real-time Dashboards",
  "E-commerce Platforms",
  "Interactive UI Components",
  "Responsive Layouts",
  "Modern Web Apps",
  "Frontend Designs",
  "Backend Integrations",
  "Database-driven Apps",
  "Cloud Deployments",
  "Performance Optimizations",
  "SEO-friendly Sites",
  "Scalable Architectures",
  "Mobile-first Websites",
  "Custom Web Solutions",
  "AI-powered Web Apps",
  "Real-time Chat Systems",
  "Interactive Dashboards",
  "Modern UI/UX Designs"
];


const Hero = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: false, margin: "-200px" });
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const maxLength = Math.max(...words.map((w) => w.length));

  useEffect(() => {
        if (!isInView) return; // start typing only when in view

    const currentWord = words[index];
    let timer;

    if (!isDeleting && text.length < currentWord.length) {
      timer = setTimeout(
        () => setText(currentWord.slice(0, text.length + 1)),
        150
      );
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(
        () => setText(currentWord.slice(0, text.length - 1)),
        100
      );
    } else if (!isDeleting && text.length === currentWord.length) {
      timer = setTimeout(() => setIsDeleting(true), 800);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [text,isInView, isDeleting, index]);
  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background select-none"
      style={{ userSelect: "none" }} // enforce no selection
    >
      {/* 3D Background */}
      {isInView && (
        <Suspense fallback={null}>
          <div style={{ pointerEvents: "none" }}>
            <HeroBackground3D />
          </div>
        </Suspense>
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50 z-[1]"
        style={{ pointerEvents: "none" }}
      />

      <h1
        style={{
          position: "fixed",
          left: "20%",
          top: "85%",
          transform: "translate(-50%, -50%) rotate(-6deg)",
          fontSize: "80px",
          fontWeight: "bold",
          pointerEvents: "none",
          userSelect: "none",
          color: "white",
          opacity: 0.03,
        }}
      >
        {"< Souhail />"}
      </h1>

      <motion.h1
        style={{
          position: "fixed",
          left: "20%",
          top: "85%",
          transform: "translate(-50%, -50%) rotate(-6deg)",
          fontSize: "80px",
          fontWeight: "bold",
          pointerEvents: "none",
          userSelect: "none",
          color: "white",
          opacity: 0.03,
        }}
      >
        {"< Souhail />"}
      </motion.h1>

      {/* FULLSTACK JS */}
      <motion.h1
        style={{
          position: "fixed",
          left: "85%",
          top: "50%",
          transform: "translate(-50%, -50%) rotate(-40deg)",
          fontSize: "60px",
          fontWeight: "bold",
          pointerEvents: "none",
          userSelect: "none",
          width: "500px",
          color: "#FFD700",
          textAlign: "center",
          lineHeight: 1.3,
        }}
        animate={{ opacity: isInView ? 0.4 : 0.04 }} // opacity 1 in view, 0.4 out of view
        transition={{ duration: 0.4 }}
      >
        FULLSTACK JS
        <span style={{ display: "block", fontSize: "60px" }}>Developer</span>
      </motion.h1>

      {/* H    
      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          <span className="gradient-text">Souhail Benhamed</span>
        </h1>
        {/* effect */}

        <h1 className="text-2xl font-bold  pl-24 text-center flex justify-center items-center">
          {/* Static part */}
          <span className="text-gray-500" style={{ flexShrink: 0 }}>
            I build&nbsp;
          </span>

          {/* Dynamic part with fixed width to prevent shifting */}
          <span
            style={{
              display: "inline-block",
              width: `${maxLength}ch`,
              whiteSpace: "pre",
              overflow: "hidden",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            <span className="text-white-500">{text}</span>
            <span className="inline-block w-1 h-6 bg-gray-5 00 animate-blink ml-1" />
          </span>

          {/* Blinking cursor */}
        </h1>

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground mb-6">
          Full-Stack JavaScript Developer
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
          I create modern, high-performance web applications using the latest
          JavaScript technologies. With expertise in React, Node.js, and
          full-stack development, I deliver seamless and scalable digital
          solutions.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" size="lg" asChild>
            <a href="#projects">View My Work</a>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <a href="#contact">Contact Me</a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <social.icon size={40} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <a
          href="#about"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
