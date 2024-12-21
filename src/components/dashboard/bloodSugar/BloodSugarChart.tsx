import React from 'react';
import { format } from 'date-fns';
import type { BloodSugarReading } from '../../../hooks/useBloodSugar';
import { LineGraph } from './LineGraph';

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

  const data = readings.slice(0, 7).reverse();

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
            top: '55%',
            height: '25%'
          }}
        />

        {/* Y-axis labels */}
        <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-slate-400">
          {[400, 300, 200, 100, 0].map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>

        {/* Graph */}
        <div className="absolute inset-0 ml-8">
          <LineGraph readings={data} />
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