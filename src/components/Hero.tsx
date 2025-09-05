import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import heroImage from "@/assets/discover event.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
            <h1 className="hero-text leading-tight">
              One Platform for Every{" "}
              <span className="bg-church-gradient bg-clip-text text-transparent">
                Community Event
              </span>
            </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Stay connected, discover upcoming activities, and participate—whether you're online or offline—with the PC's TACC Community event hub.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="cta-primary text-lg px-8 py-6 rounded-xl">
                <ArrowRight className="mr-2 h-5 w-5" />
                Join the Community
              </Button>
              <Button size="lg" variant="outline" className="cta-secondary text-lg px-8 py-6 rounded-xl">
                <Calendar className="mr-2 h-5 w-5" />
                See Upcoming Events
              </Button>
            </div>

            {/* Trust Signal */}
            <p className="text-sm text-muted-foreground">
              Built for the PC's TACC Community Cameroon
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Community members at event"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-church-gradient opacity-5"></div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;