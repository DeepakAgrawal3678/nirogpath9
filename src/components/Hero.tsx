import React from 'react';
import { Button } from './ui/Button';
import { Shield, Activity } from 'lucide-react';

export function Hero() {
  return (
    <div className="hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-4">
            <Shield className="w-5 h-5 text-orange-500" />
            <span className="text-slate-300">Trusted by 10,000+ Users</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Take Control of Your
            <span className="gradient-text block mt-2">Health Journey</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A professional approach to diabetes management, backed by medical expertise 
            and proven success stories from people just like you.
          </p>

          <div className="flex justify-center max-w-md mx-auto">
            <Button variant="secondary">
              Watch Video
            </Button>
          </div>

          <div className="pt-8 sm:pt-12">
            <div className="flex items-center justify-center gap-8 text-slate-300">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                <span>FDA Registered</span>
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <div>HIPAA Compliant</div>
              <div className="w-px h-4 bg-slate-700" />
              <div>24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}