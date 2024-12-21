import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import type { MealPlan } from '../types/diet';

export function useMealPlanner() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const addPlan = useCallback((plan: MealPlan) => {
    setPlans(prev => [...prev, plan]);
  }, []);

  const updatePlan = useCallback((id: string, updates: Partial<MealPlan>) => {
    setPlans(prev => prev.map(plan => 
      plan.id === id ? { ...plan, ...updates } : plan
    ));
  }, []);

  const deletePlan = useCallback((id: string) => {
    setPlans(prev => prev.filter(plan => plan.id !== id));
  }, []);

  return {
    plans,
    selectedDate,
    setSelectedDate,
    addPlan,
    updatePlan,
    deletePlan
  };
}