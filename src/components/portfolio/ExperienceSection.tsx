import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin, TrendingUp } from "lucide-react";

export const ExperienceSection = () => {
  const experiences = [
    {
      company: "Kotak Mahindra Bank Ltd.",
      role: "Software Development Engineer 1",
      location: "Bangalore",
      duration: "March 2023 - Present",
      type: "Full-time",
      highlights: [
        "Spearheaded edit maturity instruction feature contributing ₹100 crore annually to bank revenue",
        "Led full-stack development of nominee update feature with attribute-based access control",
        "Designed debit card controls feature handling 30K+ monthly updates",
        "Achieved 92% unit test coverage, pioneering testing practices across organization",
        "Optimized API performance reducing latency by 90ms (22% improvement)"
      ],
      technologies: ["Java", "Spring Boot", "React Native", "AWS", "Microservices"],
      color: "from-blue-600/20 to-purple-600/20"
    },
    {
      company: "Amazon",
      role: "Software Development Engineer 1 (Backend)",
      location: "Bangalore",
      duration: "July 2022 - March 2023",
      type: "Full-time",
      highlights: [
        "Designed and launched Defect Status Trail Store for improved traceability",
        "Created AWS service automating ticket creation, reducing dev effort by 75%",
        "Implemented alarms reducing defect resolution time by 50%",
        "Completed Anvil security certification for automation service",
        "Achieved 100% line coverage in Jest unit tests"
      ],
      technologies: ["Node.js", "AWS", "CDK", "Jest", "TypeScript"],
      color: "from-orange-600/20 to-yellow-600/20"
    },
    {
      company: "Frivet",
      role: "Software Developer",
      location: "Remote",
      duration: "February 2022 - June 2022",
      type: "Contract",
      highlights: [
        "Developed Android application from scratch using Flutter",
        "Built promotional website for app launch using Fullpage.js",
        "Implemented API integrations and chart visualizations using fl_chart library"
      ],
      technologies: ["Flutter", "Dart", "JavaScript", "REST APIs"],
      color: "from-green-600/20 to-teal-600/20"
    }
  ];

  const internships = [
    {
      company: "Oracle Financial Software Services",
      role: "Project Intern",
      duration: "June 2021 - July 2021",
      description: "Developed dynamic VBCS components reducing development time by 60%"
    },
    {
      company: "Flyzy",
      role: "Software Development Intern",
      duration: "September 2020 - November 2020",
      description: "Backend development with Node.js, API integrations, and Firebase messaging"
    }
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building scalable solutions and driving innovation across fintech and e-commerce platforms
          </p>
        </div>

        {/* Main Experiences */}
        <div className="space-y-8 mb-16">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-glow transition-smooth group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-100 transition-smooth`} />
              
              <CardHeader className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                      {exp.role}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.duration}</span>
                    </div>
                    <Badge variant="secondary">{exp.type}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Internships */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="text-gradient">Internships</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {internships.map((intern, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-smooth">
                <CardHeader>
                  <CardTitle className="text-lg">{intern.role}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    <div className="font-medium">{intern.company}</div>
                    <div>{intern.duration}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{intern.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};