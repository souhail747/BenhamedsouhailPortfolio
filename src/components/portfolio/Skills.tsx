import { motion } from "framer-motion";

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

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-secondary/30" style={{
   zIndex:50
  }}>
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mt-7 mb-24">
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
          <h2 className="text-3xl md:text-4xl border-b-2 border-primary font-bold">Skills & Expertise</h2>
          <div className="h-px bg-border flex-1 max-w-xs" />
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-card/80 rounded-xl p-6 border border-border">
              <h3 className="text-primary font-mono text-lg font-semibold mb-6">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: "var(--gradient-primary)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
