import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition transform hover:scale-105 w-full sm:w-auto text-base sm:text-lg',
        variant === 'primary' ? 'primary-button text-white' : 'glass-effect hover:bg-white/10',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}