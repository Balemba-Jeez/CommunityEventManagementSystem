import { Calendar, Bell, Radio, Video, CreditCard, BarChart } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Event Schedule & Discovery",
    description: "All upcoming programs in one place with dates, times, and details."
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get event reminders and updates via SMS, WhatsApp, email, or directly on the platform."
  },
  {
    icon: Radio,
    title: "Live Updates",
    description: "Stay informed with real-time event progress as it happens."
  },
  {
    icon: Video,
    title: "Live Streaming of Events",
    description: "Watch community programs online and never miss a moment."
  },
  {
    icon: CreditCard,
    title: "Contribution Tracking",
    description: "Transparent and simple payment tracking for events."
  },
  {
    icon: BarChart,
    title: "Organizer Tools",
    description: "Create and publish events with a professional look in just a few steps."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay connected with your community events in one powerful platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card group">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-soft rounded-xl mr-4 group-hover:bg-primary/5 group-hover:border group-hover:border-primary/20 transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold font-display">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;