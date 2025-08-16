import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap, Award } from "lucide-react";

export const AboutSection = () => {
  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies", value: "15+" },
    { label: "Revenue Impact", value: "₹100Cr+" },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate software engineer with a strong foundation in computer science and 
            experience building scalable applications for India's leading financial institutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-glow transition-smooth group">
                <CardContent className="p-0 text-center">
                  <div className="text-3xl font-bold text-gradient mb-2 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            <Card className="p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Education</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">Indian Institute of Technology, Roorkee</div>
                    <div className="text-sm text-muted-foreground">B.Tech Electrical Engineering (2018-2022)</div>
                    <Badge variant="secondary" className="mt-1">CGPA: 8.25</Badge>
                  </div>
                  <div>
                    <div className="font-medium">Springdales Children's School, Kota</div>
                    <div className="text-sm text-muted-foreground">12th CBSE</div>
                    <Badge variant="secondary" className="mt-1">94.6%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Key Achievements</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>Kotak Business DNA Award</strong> for contributions to mobile banking application
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>JEE Advanced AIR-1406</strong> among 230,000+ candidates in 2018
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>Featured in Local Newspaper</strong> for creating Covid Help website
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};