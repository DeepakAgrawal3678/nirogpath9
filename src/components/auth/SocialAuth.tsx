import React from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '../../lib/auth';

export function SocialAuth() {
  const { signInWithGoogle, signInWithMicrosoft } = useAuth();

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-slate-300 bg-[#1a0f2e]">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Google
        </Button>
        <Button
          variant="secondary"
          onClick={signInWithMicrosoft}
          className="flex items-center justify-center gap-2"
        >
          <img src="https://www.microsoft.com/favicon.ico" alt="Microsoft" className="w-5 h-5" />
          Microsoft
        </Button>
      </div>
    </div>
  );
}