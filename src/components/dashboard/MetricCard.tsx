import React from 'react';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({ title, value, icon: Icon, trend, className }: MetricCardProps) {
  return (
    <div className={cn("glass-effect p-6 rounded-xl", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-200">{title}</p>
          <h3 className="text-2xl font-semibold mt-2 text-white">{value}</h3>
          {trend && (
            <p className={cn(
              "text-sm mt-2",
              trend.isPositive ? "text-green-400" : "text-red-400"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 text-orange-500" />
      </div>
    </div>
  );
}