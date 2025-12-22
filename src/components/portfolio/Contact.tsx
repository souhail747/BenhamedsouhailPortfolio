import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin , Send, Dock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("souhailleaders2003@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact" className="relative bg-secondary/30 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6  inline-block">
            Get In Touch
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg mb-8">
            I'm always up for new opportunities, exciting projects, or even a
            quick hello! If you have an idea, a question, or just want to chat,
            my inbox is open—I'll get back to you as soon as I can.
          </p>

          {/* Contact Info */}
         <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
  {/* Email */}
  <div className="relative cursor-pointer" onClick={handleCopy}>
    <div className="flex items-center gap-2 text-muted-foreground">
      <Mail className="text-primary" size={20} />
      <span>souhailleaders2003@gmail.com</span>
    </div>

    {/* Tooltip */}
    {copied && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md"
      >
        Copied!
      </motion.div>
    )}
  </div>

  {/* Location */}
  <div className="flex items-center gap-2 text-muted-foreground">
    <MapPin className="text-primary" size={20} />
    <span>Teleporting Between Codes</span>
  </div>
</div>


      {/* Buttons */}
<div className="flex flex-col sm:flex-row w-full justify-center gap-5">
  <Button variant="hero" size="xl" asChild>
    <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=souhailleaders2003@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center"
    >
      <Send size={20} className="mr-2" />
      Say Hello
    </a>
  </Button>
  <Button variant="hero2" size="xl" asChild>
    <a
      href="https://wa.me/21629438905"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center"
    >
      <FaWhatsapp size={20} className="mr-2" />
      WhatsApp
    </a>
  </Button>
</div>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
