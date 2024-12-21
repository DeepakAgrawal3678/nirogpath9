import React from 'react';

interface ChartProps {
  title: string;
  children: React.ReactNode;
}

export function Chart({ title, children }: ChartProps) {
  return (
    <div className="glass-effect p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}