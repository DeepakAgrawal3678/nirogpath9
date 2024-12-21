import React from 'react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      age: 45,
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80",
      quote: "After 8 months of using DiabetesGuard, my A1C dropped from 8.2 to 6.1. The lifestyle changes suggested by the app transformed not just my health, but my entire family's approach to wellness.",
      achievement: "Reversed Type 2 Diabetes",
      rating: 5
    },
    {
      name: "Michael Chen",
      age: 52,
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
      quote: "I thought managing diabetes was impossible until I found this app. The real-time tracking and personalized recommendations helped me take control of my health. My kids are proud of my progress!",
      achievement: "Lost 30 pounds, Medication reduced",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      age: 38,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      quote: "The community support within DiabetesGuard kept me motivated. From daily glucose tracking to meal planning, everything became manageable. My energy levels are through the roof now!",
      achievement: "Off insulin medication",
      rating: 5
    }
  ];

  return (
    <div className="py-16 sm:py-20" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
          <span className="gradient-text">Success Stories That Inspire</span>
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-effect p-6 sm:p-8 rounded-xl card-hover relative">
              <Quote className="absolute top-4 right-4 w-6 sm:w-8 h-6 sm:h-8 text-orange-500 opacity-50" />
              <div className="flex flex-col items-center">
                <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden mb-4 sm:mb-6 ring-2 ring-orange-500/20">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500 fill-current" />
                  ))}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {testimonial.name}, {testimonial.age}
                </h3>
                <div className="primary-button px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
                  {testimonial.achievement}
                </div>
                <p className="text-slate-300 text-center italic text-sm sm:text-base mb-4">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 sm:mt-16 text-center">
          <div className="glass-effect inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-xl">
            <p className="text-xl sm:text-2xl font-semibold gradient-text mb-2">Join 10,000+ Success Stories</p>
            <p className="text-slate-300 text-sm sm:text-base">Our users have achieved remarkable improvements in their health</p>
          </div>
        </div>
      </div>
    </div>
  );
}