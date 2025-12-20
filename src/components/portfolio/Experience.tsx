import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
  {
    company: "Tech Corp",
    title: "Senior Full-Stack Developer",
    period: "2022 - Present",
    description: [
      "Lead development of core platform features using React, Node.js, and PostgreSQL, improving system performance by 40%",
      "Mentored a team of 5 junior developers, conducting code reviews and establishing best practices",
      "Architected and implemented microservices infrastructure handling 1M+ daily requests",
      "Collaborated with product and design teams to deliver user-centric solutions",
    ],
  },
  {
    company: "StartUp Inc",
    title: "Full-Stack Developer",
    period: "2020 - 2022",
    description: [
      "Built and maintained full-stack web applications using React, Express, and MongoDB",
      "Implemented real-time features using WebSocket and Socket.io for collaborative tools",
      "Developed RESTful APIs and integrated third-party services including Stripe and Twilio",
      "Reduced page load times by 60% through code splitting and lazy loading optimizations",
    ],
  },
  {
    company: "Digital Agency",
    title: "Frontend Developer",
    period: "2018 - 2020",
    description: [
      "Developed responsive web applications for 20+ clients across various industries",
      "Created reusable component libraries that reduced development time by 30%",
      "Implemented pixel-perfect designs from Figma and collaborated closely with designers",
      "Introduced automated testing practices, increasing code coverage from 20% to 80%",
    ],
  },
  {
    company: "Freelance",
    title: "Web Developer",
    period: "2016 - 2018",
    description: [
      "Designed and developed custom websites for small businesses and entrepreneurs",
      "Built e-commerce solutions using WooCommerce and custom Node.js backends",
      "Provided ongoing maintenance and support for client websites",
      "Managed projects from initial client meetings through to deployment",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Section Title */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-primary">04.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
            <div className="h-px bg-border flex-1 max-w-xs" />
          </div>

          {/* Tabs */}
          <div className="flex flex-col md:flex-row gap-0 md:gap-8">
            {/* Tab List */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
              {experiences.map((exp, index) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-3 font-mono text-sm whitespace-nowrap transition-all duration-300 text-left ${
                    activeTab === index
                      ? "text-primary bg-primary/10 border-b-2 md:border-b-0 md:border-l-2 border-primary md:-ml-px"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="py-4 md:py-0"
            >
              <h3 className="text-xl font-semibold mb-1">
                {experiences[activeTab].title}{" "}
                <span className="text-primary">
                  @ {experiences[activeTab].company}
                </span>
              </h3>
              <p className="font-mono text-sm text-muted-foreground mb-4">
                {experiences[activeTab].period}
              </p>
              <ul className="space-y-3">
                {experiences[activeTab].description.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-muted-foreground text-sm"
                  >
                    <span className="text-primary mt-1.5">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
