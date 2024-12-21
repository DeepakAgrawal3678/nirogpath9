import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { saveDiet } from '../lib/db';
import { calculateMealNutrition, calculateDailyNutrition } from '../utils/nutrition/calculator';
import type { DietFormData, NutritionalInfo } from '../types/diet';

const INITIAL_FORM_DATA: DietFormData = {
  breakfast: '',
  lunch: '',
  eveningSnacks: '',
  dinner: ''
};

export function useDietForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<DietFormData>(INITIAL_FORM_DATA);
  const [activeField, setActiveField] = useState<keyof DietFormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [nutrition, setNutrition] = useState<NutritionalInfo>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  // Update nutrition whenever form data changes
  useEffect(() => {
    const newNutrition = calculateDailyNutrition(formData);
    setNutrition(newNutrition);
  }, [formData]);

  const handleFormChange = useCallback((field: keyof DietFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;

    // Check if at least one meal is filled
    const hasMeal = Object.values(formData).some(value => value.trim() !== '');
    if (!hasMeal) {
      setError('Please enter at least one meal');
      return;
    }

    try {
      const timestamp = new Date().toISOString();
      await saveDiet(user.email, {
        ...formData,
        timestamp,
        totalNutrition: nutrition
      });
      
      setFormData(INITIAL_FORM_DATA);
      setError('Diet information saved successfully!');
      setTimeout(() => setError(null), 3000);
    } catch (error) {
      console.error('Error saving diet information:', error);
      setError('Failed to save diet information. Please try again.');
    }
  }, [user, formData, nutrition]);

  const toggleRecording = useCallback((field: keyof DietFormData) => {
    setIsRecording(prev => {
      if (prev && activeField === field) {
        setActiveField(null);
        return false;
      } else {
        setActiveField(field);
        return true;
      }
    });
  }, [activeField]);

  return {
    formData,
    activeField,
    error,
    isRecording,
    nutrition,
    handleFormChange,
    toggleRecording,
    handleSubmit
  };
}