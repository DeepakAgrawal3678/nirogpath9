import React, { useMemo } from 'react';
import { format } from 'date-fns';
import type { BloodSugarReading } from '../../hooks/useBloodSugar';
import { createSmoothPath, createAreaPath } from '../../utils/chart/lineGraph';
import { transformReadingsToPoints } from '../../utils/chart/dataTransform';

interface BloodSugarLineGraphProps {
  readings: BloodSugarReading[];
}

export function BloodSugarLineGraph({ readings }: BloodSugarLineGraphProps) {
  const chartData = useMemo(() => {
    const height = 200;
    const beforePoints = transformReadingsToPoints(readings, 'before');
    const afterPoints = transformReadingsToPoints(readings, 'after');
    
    return { beforePoints, afterPoints, height };
  }, [readings]);

  if (readings.length < 2) {
    return (
      <div className="h-[200px] flex items-center justify-center text-slate-300">
        Add at least two readings to see the trend
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative h-[200px]">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="border-t border-white/10 w-full h-0"
            />
          ))}
        </div>

        {/* Target range indicator */}
        <div 
          className="absolute inset-x-0 bg-green-500/5 border-y border-green-500/20"
          style={{
            top: `${(1 - 180/400) * 100}%`,
            height: `${(180 - 80)/400 * 100}%`
          }}
        />

        {/* Before food line */}
        <svg
          width="100%"
          height={chartData.height}
          className="absolute inset-0"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="beforeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={createAreaPath(chartData.beforePoints, chartData.height)}
            fill="url(#beforeGradient)"
            className="transition-all duration-300"
          />
          <path
            d={createSmoothPath(chartData.beforePoints)}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          {chartData.beforePoints.map((point, i) => (
            <g key={i}>
              <circle
                cx={`${point.x}%`}
                cy={point.y}
                r="4"
                fill="#f97316"
                className="transition-all duration-300"
              />
              <circle
                cx={`${point.x}%`}
                cy={point.y}
                r="12"
                fill="#f97316"
                fillOpacity="0.1"
                className="transition-all duration-300"
              />
            </g>
          ))}
        </svg>

        {/* After food line */}
        <svg
          width="100%"
          height={chartData.height}
          className="absolute inset-0"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="afterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e11d48" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={createAreaPath(chartData.afterPoints, chartData.height)}
            fill="url(#afterGradient)"
            className="transition-all duration-300"
          />
          <path
            d={createSmoothPath(chartData.afterPoints)}
            fill="none"
            stroke="#e11d48"
            strokeWidth="2"
            className="transition-all duration-300"
          />
          {chartData.afterPoints.map((point, i) => (
            <g key={i}>
              <circle
                cx={`${point.x}%`}
                cy={point.y}
                r="4"
                fill="#e11d48"
                className="transition-all duration-300"
              />
              <circle
                cx={`${point.x}%`}
                cy={point.y}
                r="12"
                fill="#e11d48"
                fillOpacity="0.1"
                className="transition-all duration-300"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="ml-8 flex justify-between text-xs text-slate-400">
        {readings.slice(0, 7).reverse().map((reading, i) => (
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