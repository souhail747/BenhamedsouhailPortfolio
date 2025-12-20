import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Section Title */}
          <span className="font-mono text-primary text-sm mb-4 block">
            05. What's Next?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>

          <p className="text-muted-foreground text-lg mb-8">
            I'm currently looking for new opportunities. Whether you have a
            question, a project idea, or just want to say hi, my inbox is always
            open. I'll do my best to get back to you!
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="text-primary" size={20} />
              <span>hello@johndoe.dev</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="text-primary" size={20} />
              <span>San Francisco, CA</span>
            </div>
          </div>

          <Button variant="hero" size="xl" asChild>
            <a href="mailto:hello@johndoe.dev">
              <Send size={20} />
              Say Hello
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
