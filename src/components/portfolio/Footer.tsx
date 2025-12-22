import { Github, Linkedin, Heart, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/souhail747"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/souhail-benhamed-569826242/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="https://www.facebook.com/souhail.leaderi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Facebook size={28} />
            </a>
          </div>
          {/* Footer Text Centered */}
          <p className="text-lg md:text-xl font-bold text-muted-foreground font-mono flex flex-col items-center gap-1 mt-4 md:mt-0">
            <span>🪄 صنع بـسحر &nbsp;|&nbsp; Made with magic</span>
          </p>

          {/* Footer Text */}
          <p className="text-sm text-muted-foreground font-mono flex items-center gap-1">
            © {new Date().getFullYear()} Made by
            <span className="font-bold text-primary bg-clip-text  ">
              Souhail
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
