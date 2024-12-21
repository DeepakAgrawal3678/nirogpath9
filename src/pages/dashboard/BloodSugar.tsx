import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { saveBloodSugar, saveHbA1cReading } from '../../lib/db';
import { format } from 'date-fns';
import { HbA1cScanner } from '../../components/bloodSugar/HbA1cScanner';
import { DailyReadingsForm } from '../../components/bloodSugar/DailyReadingsForm';
import type { HbA1cResult } from '../../types/bloodSugar';

interface BloodSugarFormData {
  beforeFood: string;
  afterFood: string;
  date: string;
  time: string;
}

export function BloodSugar() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<BloodSugarFormData>({
    beforeFood: '',
    afterFood: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;

    try {
      const timestamp = new Date(`${formData.date}T${formData.time}`).toISOString();
      await saveBloodSugar(user.email, {
        ...formData,
        timestamp,
      });
      
      setFormData({
        beforeFood: '',
        afterFood: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: format(new Date(), 'HH:mm'),
      });
      alert('Blood sugar readings saved successfully!');
    } catch (error) {
      console.error('Error saving blood sugar readings:', error);
      alert('Failed to save readings. Please try again.');
    }
  };

  const handleHbA1cResult = async (result: HbA1cResult) => {
    if (!user?.email) return;

    try {
      await saveHbA1cReading(user.email, {
        ...result,
        timestamp: new Date().toISOString(),
      });
      alert('HbA1c reading saved successfully!');
    } catch (error) {
      console.error('Error saving HbA1c reading:', error);
      alert('Failed to save HbA1c reading. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Blood Sugar Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Readings Section */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Daily Blood Sugar Readings</h2>
            <DailyReadingsForm 
              formData={formData}
              onSubmit={handleSubmit}
              onChange={handleFormChange}
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Target Ranges</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="text-xs text-slate-400">Before Meals</div>
                  <div className="font-medium text-green-400">80-130 mg/dL</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">After Meals</div>
                  <div className="font-medium text-green-400">Less than 180 mg/dL</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Before Bedtime</div>
                  <div className="font-medium text-green-400">100-140 mg/dL</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Test Frequency</div>
                  <div className="font-medium">2-3 times daily</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* HbA1c Section */}
        <div className="space-y-6">
          <HbA1cScanner onResultExtracted={handleHbA1cResult} />
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">About HbA1c</h3>
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                HbA1c provides your average blood sugar level over the past 2-3 months.
                Regular testing helps track your long-term diabetes management.
              </p>
              <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="text-xs text-slate-400">Normal Range</div>
                  <div className="font-medium text-green-400">Below 5.7%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Prediabetes</div>
                  <div className="font-medium text-orange-400">5.7% - 6.4%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Diabetes</div>
                  <div className="font-medium text-red-400">6.5% or above</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Test Frequency</div>
                  <div className="font-medium">Every 3 months</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}