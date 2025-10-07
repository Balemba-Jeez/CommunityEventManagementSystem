// import Navigation from "@/components/Navigation";
// import Hero from "@/components/Hero";
// import Features from "@/components/Features";
// import CTA from "@/components/CTA";
// import Footer from "@/components/Footer";

// const Index = () => {
//   return (
//     <main className="min-h-screen">
//       <Navigation />
//       <Hero />
//       <Features />
//       <CTA />
//       <Footer />
//     </main>
//   );
// };

// export default Index;

"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/Logo"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import moment1 from "@/assets/moment1.jpg";
import moment2 from "@/assets/moment2.jpg";
import moment3 from "@/assets/moment3.jpg";
import moment4 from "@/assets/monent4.jpg";
import moment5 from "@/assets/moment5.jpg";
import { useAuth } from "@/context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { TestimonialCarousel } from "@/components/testimonial-caroussel"

export default function PCCommunityPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3
  const moments = [moment1, moment2, moment3, moment4];
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleExploreEvents = () => {
    if (user && token) {
      console.log(user, token);
      navigate('/events/all');
    } else {
      navigate('/login');
    }
  }

 const handleHostEvent = () => {
  if (user && token) {
    navigate('/events/create'); 
  } else {
    navigate('/login');
  }
}

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#e9ebf4] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo/>
          {/* <div className="text-xl font-serif italic">Logo</div> */}

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-[#000000] hover:opacity-70">
              Events
            </a>
            <a href="#" className="text-sm text-[#000000] hover:opacity-70">
              Members
            </a>
            <a href="#" className="text-sm text-[#000000] hover:opacity-70">
              Community
            </a>
            <button className="flex items-center gap-1 text-sm text-[#000000] hover:opacity-70">
              Profile
              <ChevronDown className="w-4 h-4" />
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-transparent border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white rounded-[6px]"
              onClick={() => window.location.href = '/login'}
            >
              Login
            </Button>
            <Button className="bg-[#2c3e94] text-white hover:bg-[#2c3e94]/90 rounded-[6px]"
            onClick={() => window.location.href = '/create-account'}
            >
              Join
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#e9ebf4] px-6  md:pb-0 ">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="pb-24">
            <h1 className="text-5xl md:text-6xl font-bold text-[#000000] mb-6 leading-tight text-balance">
              Where PC Community events come to life.
            </h1>
            <p className="text-[#000000] mb-8 text-lg">
              Discover upcoming gatherings or host your own — connecting Apostolic Pentecost Children across every zone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#2c3e94] text-white hover:bg-[#2c3e94]/90 px-6 rounded-[6px]"
                      onClick={handleExploreEvents}
              >
                Explore Events
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white px-6 rounded-[6px]"
              >
                Host an Event
              </Button>
            </div>
          </div>

          {/* Bento Grid */}
          {/* <div className="grid grid-cols-2 gap-3 h-[500px]">
            <div className="space-y-3">
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[331.71px]">
                <img
                  src="/people-eating-together-at-table.jpg"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[331.71px]">
                <img src="/person-in-green-shirt-working-at-desk-with-coffee.jpg" alt="Person working" className="w-full h-full object-cover" />
              </div>
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[331.71px]">
                <img src="/person-in-green-shirt-working-at-desk-with-coffee.jpg" alt="Person working" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[331.71px]">
                <img
                  src="/family-working-together-on-laptop.jpg"
                  alt="Family collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[331.71px]">
                <img src="/two-people-collaborating-at-desk.jpg" alt="Collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[331.71px]">
                <img src="/person-working-laptop.png" alt="Working" className="w-full h-full object-cover" />
              </div>
            </div>
          </div> */}
          {/* Bento Grid */}
          <div className="grid grid-cols-2 gap-3 w-[470px] h-[700px] overflow-hidden ml-auto">
            <div className="space-y-3">
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[240px] -mt-[60px]">
                <img
                  src="../../public/images/jim-nyamao-iu5u3JrguHU-unsplash.jpg"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[240px]">
                <img src="../../public/images/nichika-sakurai-e2ecxDTVRG8-unsplash.jpg" alt="Person working" className="w-full h-full object-cover" />
              </div>
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[240px]">
                <img src="../../public/images/wanyoike-mbugua-dsFrAJUrUuU-unsplash.jpg" alt="Family collaboration" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-3 ">
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[240px]">
                <img
                  src="../../public/images/barak-paul-munuo-K5F_iHnR-Mg-unsplash.jpg"
                  alt="Collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[240px]">
                <img src="../../public/images/salem-ochidi-2KqJOb-6Kd4-unsplash.jpg" alt="Group collaboration" className="w-full h-full object-cover" />
              </div>
              <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden h-[240px] mb-[-110px]">
                <img src="../../public/images/salem-ochidi-2KqJOb-6Kd4-unsplash.jpg" alt="Working" className="w-full h-[220px] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-[#d9d9d9] rounded-[32px] overflow-hidden aspect-[4/3]">
            {/* <svg className="w-24 h-24 text-[#f2f2f2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg> */}
            <img src="../../public/images/iwaria-inc-K8g07Oaguqw-unsplash.jpg" alt="" className="w-full h-full object cover"/>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-[#000000] mb-3">Manage Zone Events Easily</h2>
              <p className="text-[#000000]/70">
                Create, update, and oversee your zone's events with a few clicks — keeping everything organized and
                accessible online.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#000000] mb-3">Stay Connected with Your Community</h2>
              <p className="text-[#000000]/70">
                Explore events from your zone and others, receive updates, and never miss a moment of fellowship.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#000000] mb-3">Strengthen Fellowship Across Zones</h2>
              <p className="text-[#000000]/70">
                Experience a unified space that brings Apostolic Pentecost Children together across every zone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Moments Section */}
      <section className="bg-[#3f2812] px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our moments</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              A private look at the gatherings, worship, and fellowship that strengthen the PC Community across every
              zone.
            </p>
          </div>

        {/* Carousel */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-16">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {moments.map((image, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 basis-1/3">
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden">
                    <img
                      src={image}
                      alt={`Moment ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 md:left-[-26px] w-12 h-12 text-white rounded-sm border-2 border-[#fff] bg-[#3f2812] backdrop-blur-sm hover:bg-[#4b3016] hover:border-[#e5e5e5] hover:text-white hover:scale-110 transition-all duration-300" />
            <CarouselNext className="right-4 md:right-[-26px] w-12 h-12 text-white rounded-sm border-2 border-[#fff] bg-[#3f2812] backdrop-blur-sm hover:bg-[#4b3016] hover:border-[#e5e5e5] hover:text-white hover:scale-110 transition-all duration-300" />
          </Carousel>
        </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0d122c] px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-balance">
            Growing Together, Across Every Zone
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Total Members */}
            <div className="border-2 border-white/20 rounded-2xl p-8 text-center">
              <div className="mb-4">
                <div className="text-sm text-white/70 mb-2">Total Members</div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-4">1,240+</div>
                <div className="text-sm text-white/70">Pastoral networks expanding across Cameroon.</div>
              </div>
            </div>

            {/* Average Members per Zone */}
            <div className="border-2 border-white/20 rounded-2xl p-8 text-center">
              <div className="mb-4">
                <div className="text-sm text-white/70 mb-2">Average Members per Zone</div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-4">120</div>
                <div className="text-sm text-white/70">
                  Active members on average in each zone, connecting and participating in events.
                </div>
              </div>
            </div>

            {/* New Members This Month */}
            <div className="border-2 border-white/20 rounded-2xl p-8 text-center">
              <div className="mb-4">
                <div className="text-sm text-white/70 mb-2">New Members This Month</div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-4">35</div>
                <div className="text-sm text-white/70">
                  Apostolic Pentecost Children who joined and got welcomed to the admin this month.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialCarousel />

      {/* Stats Section */}
      <section className="bg-[#D4D8E9] py-28 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className=" text-[44px] leading-[120%] tracking-[0.44px] font-semibold text-dark-text mb-20 max-w-3xl">
            Our Events, Our Strength
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="border-2 border-[#080203] rounded-[32px] bg-[#D4D8E9] p-8 flex flex-col gap-12">
              <h3 className=" text-[22px] leading-[140%] tracking-[0.22px] font-semibold text-dark-text">
                Total Events Hosted
              </h3>
              <div className="flex flex-col gap-4">
                <p className=" text-[80px] leading-[120%] font-bold text-dark-text text-right">
                  120
                </p>
                <div className="h-0.5 bg-dark-text"></div>
                <p className=" text-base leading-[160%] text-dark-text text-right border-t-black border-t-2 pt-2">
                  20 unforgettable events brought our community together across all zones!
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="border-2 border-[#080203] rounded-[32px] bg-[#D4D8E9] p-8 flex flex-col gap-12">
              <h3 className=" text-[22px] leading-[140%] tracking-[0.22px] font-semibold text-dark-text">
                Upcoming Events
              </h3>
              <div className="flex flex-col gap-4">
                <p className=" text-[80px] leading-[120%] font-bold text-dark-text text-right ">
                  8
                </p>
                <div className="h-0.5 bg-dark-text"></div>
                <p className=" text-base leading-[160%] text-dark-text text-right border-t-black border-t-2 pt-2">
                  Join the fun! 8 exciting events await you this season.
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="border-2 border-[#080203] rounded-[32px] bg-[#D4D8E9] p-8 flex flex-col gap-12">
              <h3 className=" text-[22px] leading-[140%] tracking-[0.22px] font-semibold text-dark-text">
                Events Completed This Year
              </h3>
              <div className="flex flex-col gap-4">
                <p className=" text-[80px] leading-[120%] font-bold text-dark-text text-right">
                  45
                </p>
                <div className="h-0.5 bg-dark-text"></div>
                <p className=" text-base leading-[160%] text-dark-text text-right border-t-black border-t-2 pt-2">
                  45 events in 2025 sparked joy and connection among members!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-off-white py-28 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">
            <div className="max-w-3xl flex-1">
              <p className=" text-base leading-[150%] font-semibold text-dark-text mb-4">
                What's Next for Our Community
              </p>
              <h2 className=" text-[52px] leading-[120%] tracking-[0.52px] font-semibold text-dark-text mb-4">
                Upcoming Events to Connect & Celebrate
              </h2>
              <p className=" text-lg leading-[160%] text-dark-text">
                Discover exciting opportunities to join fellow members for unforgettable moments of fun, learning, and connection.
              </p>
            </div>
            <button className="border-2 border-dark-text rounded-md px-3 py-1.5  text-base text-dark-text">
              View all
            </button>
          </div>

          {/* Event Cards */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Event Card 1 */}
              <div className="border-2 border-dark-text rounded-[32px] bg-off-white overflow-hidden">
                <div className="relative">
                  <div className="h-[270px] bg-gray-300"></div>
                  <div className="absolute top-4 right-4 bg-off-white rounded-3xl px-1 py-3 w-28 text-center bg-[#F2F2F2]">
                    <p className=" text-sm text-dark-text">Tue</p>
                    <p className=" text-4xl font-semibold text-dark-text leading-[140%] tracking-[0.36px]">06</p>
                    <p className=" text-sm text-dark-text">Feb 2024</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="border-2 border-dark-text rounded px-2.5 py-1 inline-block w-fit">
                    <span className=" text-sm font-semibold text-dark-text">Fellowship</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className=" text-[28px] leading-[140%] tracking-[0.28px] font-semibold text-dark-text">
                      Pastoral leadership summit
                    </h3>
                    <p className=" text-base text-dark-text">Douala</p>
                    <p className=" text-base leading-[160%] text-dark-text">
                      Empowering next generation church leaders through shared wisdom and experience
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-dark-text  pt-2">
                    View event
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="border-2 border-dark-text rounded-[32px] bg-off-white overflow-hidden">
                <div className="relative">
                  <div className="h-[270px] bg-gray-300"></div>
                  <div className="absolute top-4 right-4 bg-off-white rounded-3xl px-1 py-3 w-28 text-center bg-[#F2F2F2]">
                    <p className=" text-sm text-dark-text">Wed</p>
                    <p className=" text-4xl font-semibold text-dark-text leading-[140%] tracking-[0.36px]">07</p>
                    <p className=" text-sm text-dark-text">Feb 2024</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="border-2 border-dark-text rounded px-2.5 py-1 inline-block w-fit">
                    <span className=" text-sm font-semibold text-dark-text">Worship</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className=" text-[28px] leading-[140%] tracking-[0.28px] font-semibold text-dark-text">
                      Youth ministry conference
                    </h3>
                    <p className=" text-base text-dark-text">Yaoundé</p>
                    <p className=" text-base leading-[160%] text-dark-text">
                      Bridging spiritual connections and nurturing young faith leaders across Cameroon
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-dark-text  pt-2">
                    View event
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Event Card 3 */}
              <div className="border-2 border-dark-text rounded-[32px] bg-off-white overflow-hidden">
                <div className="relative">
                  <div className="h-[270px] bg-gray-300"></div>
                  <div className="absolute top-4 right-4 bg-off-white rounded-3xl px-1 py-3 w-28 text-center bg-[#F2F2F2]">
                    <p className=" text-sm text-dark-text">Thu</p>
                    <p className=" text-4xl font-semibold text-dark-text leading-[140%] tracking-[0.36px]">08</p>
                    <p className=" text-sm text-dark-text">Feb 2024</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="border-2 border-dark-text rounded px-2.5 py-1 inline-block w-fit">
                    <span className=" text-sm font-semibold text-dark-text">Mission</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className=" text-[28px] leading-[140%] tracking-[0.28px] font-semibold text-dark-text">
                      Community outreach planning
                    </h3>
                    <p className=" text-base text-dark-text">Bamenda</p>
                    <p className=" text-base leading-[160%] text-dark-text">
                      Strategic discussions on expanding spiritual impact and serving local communities
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-dark-text  pt-2">
                    View event
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            
          </div>

          {/* Slider Controls */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#080203]"></div>
              <div className="w-2 h-2 rounded-full bg-[#080203] opacity-20"></div>
              <div className="w-2 h-2 rounded-full bg-[#080203] opacity-20"></div>
              <div className="w-2 h-2 rounded-full bg-[#080203] opacity-20"></div>
              <div className="w-2 h-2 rounded-full bg-[#080203] opacity-20"></div>
              <div className="w-2 h-2 rounded-full bg-dark-text opacity-20"></div>
            </div>
            <div className="flex gap-4">
              <button className="border-2 border-[#080203] rounded p-3 bg-off-white">
                <ChevronLeft className="w-6 h-6 text-dark-text" />
              </button>
              <button className="border-2 border-[#080203] rounded p-3 bg-off-white">
                <ChevronRight className="w-6 h-6 text-dark-text" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
