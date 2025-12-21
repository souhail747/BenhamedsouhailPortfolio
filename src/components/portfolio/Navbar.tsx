import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      let foundSection = "";
      navLinks.forEach((link) => {
        const section = document.querySelector(link.href) as HTMLElement | null;
        if (section) {
          const top = section.offsetTop - 100; // offset for navbar height
          const bottom = top + section.offsetHeight;
          if (window.scrollY >= top && window.scrollY < bottom) {
            foundSection = link.href;
          }
        }
      });
      setActiveSection(foundSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect  border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="font-mono text-xl font-bold gradient-text">
            {"<Souhail />"}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-all duration-300 relative"
                animate={{
                  scale: activeSection === link.href ? 1.1 : 1,
                  fontWeight: activeSection === link.href ? 700 : 500,
                  color: activeSection === link.href ? "#a1a1aa" : "#a1a1aa",
                }}
                whileHover={{
                  scale: 1.1,
                  fontWeight: 700,
                  color: "#a1a1aa",
                }}
                transition={{ duration: 0.3 }}
              >
                {link.name}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-200 rounded"
                  />
                )}
              </motion.a>
            ))}
            <Button variant="hero" size="sm" asChild>
              <a href="/BenHamedSouhailEnCV.pdf" download>
                Resume
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-2
               bg-white/10 backdrop-blur-md border border-border rounded-lg"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="block py-2 transition-colors"
                animate={{
                  color: activeSection === link.href ? "#a1a1aa" : "#a1a1aa",
                }}
                whileHover={{ color: "#ef4444" }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
            <Button variant="hero" size="sm" asChild>
              <a href="/BenHamedSouhailEnCV.pdf" download>
                Resume
              </a>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
