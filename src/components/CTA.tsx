import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-hero-gradient">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Decorative icons */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="p-4 bg-primary-soft rounded-full animate-bounce delay-0">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="p-4 bg-secondary-soft border border-primary/10 rounded-full animate-bounce delay-150">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <div className="p-4 bg-primary-soft rounded-full animate-bounce delay-300">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h2 className="section-title">
            Ready to Be Part of Every Event?
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Join hundreds of community members who never miss an event. 
            Stay connected, stay informed, stay engaged.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="cta-primary text-lg px-8 py-6 rounded-xl">
              <ArrowRight className="mr-2 h-5 w-5" />
              <Link
                to="/create-account"
                className="inline-flex items-center justify-center rounded-lg bg-royal-blue text-pure-white hover:bg-royal-blue/90 font-button font-semibold h-12 px-6 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue focus:ring-offset-2"
              ></Link>
              Join the Community
            </Button>
            <Button size="lg" variant="outline" className="cta-secondary text-lg px-8 py-6 rounded-xl">
              <Calendar className="mr-2 h-5 w-5" />
              See Upcoming Events
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex justify-center items-center space-x-8 pt-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">500+ Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-150"></div>
              <span className="text-sm text-muted-foreground">100+ Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
              <span className="text-sm text-muted-foreground">Always Free</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;