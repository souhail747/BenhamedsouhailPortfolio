import { motion, type Variants } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Vue.js", level: 50 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 88 },
      { name: "NestJS", level: 80 },
      { name: "Socket.io", level: 82 },
      { name: "REST APIs", level: 95 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 88 },
      { name: "Supabase", level: 82 },
      { name: "Firebase", level: 78 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git", level: 99 },
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 },
      { name: "CI/CD", level: 78 },
      { name: "Linux", level: 82 },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Skills = () => {
  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={containerVariants}
      className="py-24 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="flex items-center gap-4 mt-7 mb-24 ">
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
          <h2 className="text-3xl md:text-4xl font-bold">Skills & Expertise</h2>
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ scale: 1.015 }}
              className="bg-card/80 rounded-xl p-6 border border-border transition-transform"
            >
              <h3 className="text-primary font-mono text-lg font-semibold mb-6">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: "var(--gradient-primary)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
