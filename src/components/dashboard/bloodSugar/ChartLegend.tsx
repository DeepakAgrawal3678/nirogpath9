import React from 'react';
import { BLOOD_SUGAR_RANGES } from '../../../constants/bloodSugar';

export function ChartLegend() {
  return (
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
        <span className="text-slate-300">
          Target Range ({BLOOD_SUGAR_RANGES.TARGET.MIN}-{BLOOD_SUGAR_RANGES.TARGET.MAX} mg/dL)
        </span>
      </div>
    </div>
  );
}