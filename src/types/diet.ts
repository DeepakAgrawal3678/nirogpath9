export interface DietFormData {
  breakfast: string;
  lunch: string;
  eveningSnacks: string;
  dinner: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DietEntry extends DietFormData {
  timestamp: string;
  totalNutrition?: NutritionalInfo;
}

export interface DietGoal {
  type: 'weight-loss' | 'weight-gain' | 'maintenance';
  startDate: string;
  endDate: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
}

export interface MealPlan {
  id: string;
  date: string;
  meals: {
    [K in keyof DietFormData]: {
      planned: string;
      actual?: string;
    };
  };
}