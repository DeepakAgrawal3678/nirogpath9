import React from 'react';
import { format } from 'date-fns';
import type { BloodSugarReading } from '../../hooks/useBloodSugar';

interface BloodSugarChartProps {
  readings: BloodSugarReading[];
}

export function BloodSugarChart({ readings }: BloodSugarChartProps) {
  if (readings.length < 2) {
    return (
      <div className="h-[200px] flex items-center justify-center text-slate-300">
        Add at least two readings to see the trend
      </div>
    );
  }

  // Take last 7 readings and reverse for chronological order
  const data = readings.slice(0, 7).reverse();
  const height = 200;
  const maxValue = 400;

  // Calculate points for both lines
  const beforePoints = data.map((reading, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: (1 - parseInt(reading.beforeFood) / maxValue) * height
  }));

  const afterPoints = data.map((reading, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: (1 - parseInt(reading.afterFood) / maxValue) * height
  }));

  // Create SVG path commands
  const beforePath = `M ${beforePoints.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const afterPath = `M ${afterPoints.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <div className="space-y-4">
      <div className="relative h-[200px]">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-white/10 w-full h-0" />
          ))}
        </div>

        {/* Target range */}
        <div 
          className="absolute inset-x-0 bg-green-500/5 border-y border-green-500/20"
          style={{
            top: `${(1 - 180/maxValue) * 100}%`,
            height: `${(180 - 80)/maxValue * 100}%`
          }}
        />

        {/* Y-axis labels */}
        <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-slate-400">
          {[maxValue, 300, 200, 100, 0].map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>

        {/* Graph */}
        <div className="absolute inset-0 ml-8">
          <svg
            width="100%"
            height={height}
            className="overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Before food line */}
            <path
              d={beforePath}
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {beforePoints.map((point, i) => (
              <circle
                key={`before-${i}`}
                cx={`${point.x}%`}
                cy={point.y}
                r="4"
                fill="#f97316"
              />
            ))}

            {/* After food line */}
            <path
              d={afterPath}
              fill="none"
              stroke="#e11d48"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {afterPoints.map((point, i) => (
              <circle
                key={`after-${i}`}
                cx={`${point.x}%`}
                cy={point.y}
                r="4"
                fill="#e11d48"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="ml-8 flex justify-between text-xs text-slate-400">
        {data.map((reading, i) => (
          <div key={i}>
            {format(new Date(reading.timestamp), 'MMM d')}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-slate-300">Before Food</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="text-slate-300">After Food</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="text-slate-300">Target Range (80-180 mg/dL)</span>
        </div>
      </div>
    </div>
  );
}