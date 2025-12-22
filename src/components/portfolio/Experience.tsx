import { motion } from "framer-motion";
import { useState } from "react";

const experiences = [
  {
    company: "Freelance",
    title: "Full-Stack JavaScript",
    period: "2025 - Present",
    description: [
      "Built custom full-stack JavaScript applications using React and Node.js.",
      "Delivered projects with a focus on responsive design, performance, and maintainability.",
      "Managed multiple client projects, ensuring on-time delivery and high satisfaction.",
    ],
  },
  {
    company: "SheShares",
    title: "Full-Stack Developer Intern",
    period: "2024",
    description: [
      "Developed internal tools and web applications using React and Node.js.",
      "Collaborated with the team to implement new features and optimize performance.",
      "Gained hands-on experience in professional software development workflows.",
    ],
  },
  {
    company: "BSc in Computer Science - ISIMM",
    title: "Student",
    period: "2020 - 2024",
    description: [
      "Completed a 3-year diploma program in computer science with a focus on software development, algorithms, and web technologies.",
    ],
  },
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="experience"
      className="bg-secondary/30 relative flex justify-end min-h-screen"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Title */}
        <div className="flex items-center pt-24 gap-4 mt-7 mb-24 ">
          <div className="h-px bg-border flex-1 max-w-xs" />
          <h2 className="text-3xl md:text-4xl font-bold border-b-2 border-primary">
            Experience
          </h2>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        {/* Tabs */}
        <div className="flex flex-col  md:flex-row gap-0 md:gap-8">
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
            className="md:py-0"
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
      </div>
    </section>
  );
};

export default Experience;
