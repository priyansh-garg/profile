import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin, MapPin, Download } from "lucide-react";

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "priyanshgarg.iitr@gmail.com",
      href: "mailto:priyanshgarg.iitr@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Phone",
      value: "+91-6377802393",
      href: "tel:+916377802393"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      label: "LinkedIn",
      value: "garg-priyansh",
      href: "https://www.linkedin.com/in/garg-priyansh/"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: "Location",
      value: "Bangalore, India",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. 
            Let's connect and discuss how we can work together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-glow transition-smooth group cursor-pointer"
                onClick={() => info.href && window.open(info.href, '_blank')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-smooth">
                      {info.icon}
                    </div>
                    <div>
                      <div className="font-medium">{info.label}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <Card className="shadow-card p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-0 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Ready to collaborate?</h3>
                  <p className="text-muted-foreground">
                    Whether you're looking for a skilled developer for your team or have an exciting 
                    project in mind, I'd love to hear from you.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full group"
                    onClick={() => window.open('mailto:priyanshgarg.iitr@gmail.com', '_blank')}
                  >
                    <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Send Email
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full group"
                  >
                    <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Download Resume
                  </Button>
                  
                  <Button 
                    variant="glass" 
                    size="lg" 
                    className="w-full group"
                    onClick={() => window.open('https://www.linkedin.com/in/garg-priyansh/', '_blank')}
                  >
                    <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Connect on LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};