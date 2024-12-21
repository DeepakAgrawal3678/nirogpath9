import React from 'react';
import type { BloodSugarReading } from '../../../hooks/useBloodSugar';
import { transformReadings } from '../../../utils/chart/dataTransform';
import { createSmoothLine } from '../../../utils/chart/lineGraph';

interface LineGraphProps {
  readings: BloodSugarReading[];
}

export function LineGraph({ readings }: LineGraphProps) {
  const beforePoints = transformReadings(readings, 'before');
  const afterPoints = transformReadings(readings, 'after');

  return (
    <svg
      width="100%"
      height="200"
      className="overflow-visible"
      preserveAspectRatio="none"
    >
      {/* Before food line */}
      <g>
        <path
          d={createSmoothLine(beforePoints)}
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />
        {beforePoints.map((point, i) => (
          <circle
            key={`before-${i}`}
            cx={`${point.x}%`}
            cy={point.y}
            r="4"
            fill="#f97316"
            className="transition-all duration-300"
          />
        ))}
      </g>

      {/* After food line */}
      <g>
        <path
          d={createSmoothLine(afterPoints)}
          fill="none"
          stroke="#e11d48"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />
        {afterPoints.map((point, i) => (
          <circle
            key={`after-${i}`}
            cx={`${point.x}%`}
            cy={point.y}
            r="4"
            fill="#e11d48"
            className="transition-all duration-300"
          />
        ))}
      </g>
    </svg>
  );
}