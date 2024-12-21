import React from 'react';
import { BLOOD_SUGAR_CATEGORIES } from '../../../constants/bloodSugar';

interface BloodSugarStatusProps {
  value: number;
}

export function BloodSugarStatus({ value }: BloodSugarStatusProps) {
  const getCategory = () => {
    for (const [key, range] of Object.entries(BLOOD_SUGAR_CATEGORIES)) {
      if (value >= range.min && value <= range.max) {
        return range;
      }
    }
    return BLOOD_SUGAR_CATEGORIES.VERY_HIGH;
  };

  const category = getCategory();

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      category.severity === 'danger' ? 'bg-red-500/10 text-red-400' :
      category.severity === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
      'bg-green-500/10 text-green-400'
    }`}>
      {category.label}
    </div>
  );
}