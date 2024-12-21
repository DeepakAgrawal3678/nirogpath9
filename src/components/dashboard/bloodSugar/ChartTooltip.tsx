import React from 'react';
import { format } from 'date-fns';

interface ChartTooltipProps {
  value: string;
  date: string;
  type: 'before' | 'after';
  x: number;
  y: number;
}

export function ChartTooltip({ value, date, type, x, y }: ChartTooltipProps) {
  return (
    <div 
      className="absolute z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-sm transform -translate-x-1/2 -translate-y-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}px` }}
    >
      <div className="font-semibold">{value} mg/dL</div>
      <div className="text-xs text-slate-300">
        {format(new Date(date), 'MMM d, h:mm a')}
      </div>
    </div>
  );
}