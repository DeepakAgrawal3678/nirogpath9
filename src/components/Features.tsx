import React from 'react';
import { LineChart, Clock, Trophy, Calendar } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <LineChart className="w-8 h-8 text-orange-500" />,
      title: "Glucose Tracking",
      description: "Easy and intuitive blood sugar monitoring with detailed insights"
    },
    {
      icon: <Clock className="w-8 h-8 text-rose-500" />,
      title: "Real-time Alerts",
      description: "Timely reminders for medications and glucose checks"
    },
    {
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
      title: "Progress Tracking",
      description: "Set goals and track your journey to better health"
    },
    {
      icon: <Calendar className="w-8 h-8 text-rose-500" />,
      title: "Lifestyle Planning",
      description: "Personalized diet and exercise recommendations"
    }
  ];

  return (
    <div className="py-16 sm:py-20" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 px-2">
          <span className="gradient-text">Features That Empower You</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-effect p-6 sm:p-8 rounded-xl card-hover">
              <div className="mb-4 sm:mb-6 accent-glow">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}