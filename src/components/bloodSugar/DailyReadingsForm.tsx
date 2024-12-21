import React from 'react';
import { Calendar, Clock, Droplet } from 'lucide-react';
import { Button } from '../ui/Button';
import { format } from 'date-fns';

interface DailyReadingsFormProps {
  formData: {
    beforeFood: string;
    afterFood: string;
    date: string;
    time: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
}

export function DailyReadingsForm({ formData, onSubmit, onChange }: DailyReadingsFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Blood Sugar Before Food (mg/dL)
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.beforeFood}
            onChange={(e) => onChange('beforeFood', e.target.value)}
            min="0"
            max="600"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
            placeholder="Enter blood sugar level"
            required
          />
          <Droplet className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Blood Sugar After Food (mg/dL)
        </label>
        <div className="relative">
          <input
            type="number"
            value={formData.afterFood}
            onChange={(e) => onChange('afterFood', e.target.value)}
            min="0"
            max="600"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
            placeholder="Enter blood sugar level"
            required
          />
          <Droplet className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => onChange('date', e.target.value)}
            max={format(new Date(), 'yyyy-MM-dd')}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
            required
          />
          <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Time
        </label>
        <div className="relative">
          <input
            type="time"
            value={formData.time}
            onChange={(e) => onChange('time', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
            required
          />
          <Clock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Readings
      </Button>
    </form>
  );
}