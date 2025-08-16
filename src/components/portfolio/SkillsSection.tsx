import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Cloud, Smartphone } from "lucide-react";

export const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Backend Development",
      icon: <Code className="h-6 w-6" />,
      skills: ["Java", "Spring Boot", "Node.js", "TypeScript", "C++"],
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Frontend & Mobile",
      icon: <Smartphone className="h-6 w-6" />,
      skills: ["React", "React Native", "Redux.js", "JavaScript", "HTML/CSS"],
      color: "from-green-500/20 to-blue-500/20"
    },
    {
      title: "Database & Cloud",
      icon: <Database className="h-6 w-6" />,
      skills: ["SQL", "AWS", "REST APIs", "Microservices", "Docker"],
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Testing & Tools",
      icon: <Cloud className="h-6 w-6" />,
      skills: ["Jest", "JUnit", "Git", "Jenkins", "Agile", "Data Structures"],
      color: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Proficient in modern technologies and frameworks for building scalable applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-glow transition-smooth group hover:scale-105 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-smooth`} />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="text-xs hover:bg-primary/20 transition-smooth"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-6">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["Algorithms", "System Design", "Microservices", "API Development", "Performance Optimization", "Code Review", "Mentoring", "Agile Development"].map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-4 py-2 hover:bg-primary/10 transition-smooth"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};