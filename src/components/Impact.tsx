import React from 'react';
import { Heart, Brain, Users } from 'lucide-react';

export function Impact() {
  const impacts = [
    {
      icon: <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-orange-500" />,
      title: "Heart Health",
      description: "Uncontrolled diabetes significantly increases the risk of heart disease and stroke."
    },
    {
      icon: <Brain className="w-10 sm:w-12 h-10 sm:h-12 text-rose-500" />,
      title: "Mental Well-being",
      description: "Diabetes can affect your mental health, leading to anxiety and depression."
    },
    {
      icon: <Users className="w-10 sm:w-12 h-10 sm:h-12 text-orange-500" />,
      title: "Family Impact",
      description: "Your health affects your loved ones. Take control for them and yourself."
    }
  ];

  return (
    <div className="py-16 sm:py-20" id="impact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">
          <span className="gradient-text">Understanding the Impact</span>
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="glass-effect p-6 sm:p-8 rounded-xl card-hover">
              <div className="flex justify-center mb-4 sm:mb-6 accent-glow">{impact.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 text-center">
                {impact.title}
              </h3>
              <p className="text-slate-300 text-center text-sm sm:text-base">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}