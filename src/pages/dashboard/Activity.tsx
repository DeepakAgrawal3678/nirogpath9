import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Clock, PlayCircle, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { saveActivity } from '../../lib/db';
import { format } from 'date-fns';

const ACTIVITIES = ['Running', 'Walking', 'Swimming', 'Yoga', 'Gym', 'Outdoor Sports'] as const;
type ActivityType = typeof ACTIVITIES[number];

interface ActivityFormData {
  type: ActivityType | '';
  sportName?: string;
  duration: string;
  date: string;
}

export function Activity() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ActivityFormData>({
    type: '',
    duration: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;

    try {
      const timestamp = new Date(formData.date).toISOString();
      await saveActivity(user.email, {
        ...formData,
        timestamp,
      });
      
      // Reset form after successful submission
      setFormData({
        type: '',
        duration: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      });
      alert('Activity saved successfully!');
    } catch (error) {
      console.error('Error saving activity:', error);
      alert('Failed to save activity. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Log Activity</h1>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Activity Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                type: e.target.value as ActivityType,
                sportName: undefined, // Reset sport name when changing activity
              }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              required
            >
              <option value="">Select an activity</option>
              {ACTIVITIES.map((activity) => (
                <option key={activity} value={activity}>{activity}</option>
              ))}
            </select>
          </div>

          {formData.type === 'Outdoor Sports' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Sport Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.sportName || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    sportName: e.target.value
                  }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                  placeholder="Enter sport name"
                  required
                />
                <PlayCircle className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date: e.target.value
                }))}
                max={format(new Date(), 'yyyy-MM-dd')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                required
              />
              <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Duration (minutes)
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  duration: e.target.value
                }))}
                min="1"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                placeholder="Enter duration in minutes"
                required
              />
              <Clock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Activity
          </Button>
        </form>
      </Card>
    </div>
  );
}