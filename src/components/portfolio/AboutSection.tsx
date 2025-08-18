import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap, Award } from "lucide-react";

export const AboutSection = () => {
  const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies", value: "15+" },
    { label: "Revenue Impact", value: "₹100Cr+" },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Passionate software engineer with a strong foundation in computer science and 
            experience building scalable applications for India's leading financial institutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 sm:p-6 shadow-card hover:shadow-glow transition-smooth group">
                <CardContent className="p-0 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1 sm:mb-2 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <h3 className="text-lg sm:text-xl font-semibold">Education</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-sm sm:text-base">Indian Institute of Technology, Roorkee</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">B.Tech Electrical Engineering (2018-2022)</div>
                    <Badge variant="secondary" className="mt-1 text-xs">CGPA: 8.25</Badge>
                  </div>
                  <div>
                    <div className="font-medium text-sm sm:text-base">Springdales Children's School, Kota</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">12th CBSE</div>
                    <Badge variant="secondary" className="mt-1 text-xs">94.6%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6 shadow-card">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <h3 className="text-lg sm:text-xl font-semibold">Key Achievements</h3>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
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