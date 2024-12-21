import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Pill, Clock, List } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { saveMedication } from '../../lib/db';
import { useMedication } from '../../hooks/useMedication';
import { format } from 'date-fns';

interface MedicationFormData {
  medicineName: string;
  medicineFrequency: string;
  insulinUnits: string;
  insulinFrequency: string;
}

const FREQUENCY_OPTIONS = [
  'Once a day',
  'Twice a day',
  'Three times a day'
] as const;

export function Medication() {
  const { user } = useAuth();
  const { medications, loading } = useMedication();
  const [showMedications, setShowMedications] = useState(false);
  const [formData, setFormData] = useState<MedicationFormData>({
    medicineName: '',
    medicineFrequency: '',
    insulinUnits: '',
    insulinFrequency: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;

    try {
      const timestamp = new Date().toISOString();
      await saveMedication(user.email, {
        ...formData,
        timestamp,
      });
      
      // Reset form after successful submission
      setFormData({
        medicineName: '',
        medicineFrequency: '',
        insulinUnits: '',
        insulinFrequency: '',
      });
      alert('Medication details saved successfully!');
    } catch (error) {
      console.error('Error saving medication details:', error);
      alert('Failed to save medication details. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Medication Details</h1>
        <Button
          variant="secondary"
          onClick={() => setShowMedications(!showMedications)}
          className="flex items-center gap-2"
        >
          <List className="w-4 h-4" />
          {showMedications ? 'Hide' : 'Display'} Medications
        </Button>
      </div>
      
      {showMedications && (
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Medication History</h2>
          {loading ? (
            <p className="text-slate-300">Loading medications...</p>
          ) : medications.length === 0 ? (
            <p className="text-slate-300">No medications recorded yet</p>
          ) : (
            <div className="space-y-4">
              {medications.map((medication, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{medication.medicineName}</h3>
                      <p className="text-slate-300">Frequency: {medication.medicineFrequency}</p>
                    </div>
                    <span className="text-sm text-slate-400">
                      {format(new Date(medication.timestamp), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-slate-300">
                      Insulin Units: {medication.insulinUnits}
                    </p>
                    <p className="text-slate-300">
                      Insulin Frequency: {medication.insulinFrequency}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Medicine Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.medicineName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  medicineName: e.target.value
                }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                placeholder="Enter medicine name"
                required
              />
              <Pill className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Medicine Frequency
            </label>
            <div className="relative">
              <select
                value={formData.medicineFrequency}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  medicineFrequency: e.target.value
                }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                required
              >
                <option value="">Select frequency</option>
                {FREQUENCY_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <Clock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Insulin Units
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.insulinUnits}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  insulinUnits: e.target.value
                }))}
                min="0"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                placeholder="Enter insulin units"
                required
              />
              <Pill className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Insulin Frequency
            </label>
            <div className="relative">
              <select
                value={formData.insulinFrequency}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  insulinFrequency: e.target.value
                }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                required
              >
                <option value="">Select frequency</option>
                {FREQUENCY_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <Clock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Medication Details
          </Button>
        </form>
      </Card>
    </div>
  );
}