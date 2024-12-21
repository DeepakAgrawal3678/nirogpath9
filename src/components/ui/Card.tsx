import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("glass-effect p-6 sm:p-8 rounded-xl card-hover", className)}>
      {children}
    </div>
  );
}