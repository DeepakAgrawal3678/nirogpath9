import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

export function CallToAction() {
  const navigate = useNavigate();

  return (
    <div className="glass-effect py-16 sm:py-20 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
          <span className="gradient-text">Start Your Journey to Better Health Today</span>
        </h2>
        <p className="text-lg sm:text-xl mb-8 sm:mb-10 text-slate-300">
          Join thousands of others who have successfully taken control of their diabetes
        </p>
        <Button 
          onClick={() => navigate('/login')} 
          className="px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:opacity-90 transition transform hover:scale-105 inline-flex items-center"
        >
          Get Started Now
          <ArrowRight className="ml-2 w-5 sm:w-6 h-5 sm:h-6" />
        </Button>
      </div>
    </div>
  );
}