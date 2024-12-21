export interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: string;
  category: 'activity' | 'nutrition' | 'blood-sugar' | 'streak';
  level: 'bronze' | 'silver' | 'gold';
  criteria: {
    type: string;
    value: number;
  };
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: 'health' | 'lifestyle' | 'entertainment';
  partner: string;
  expiryDays: number;
  image?: string;
}

export interface UserProgress {
  points: number;
  achievements: string[];
  streaks: {
    bloodSugar: number;
    activity: number;
    nutrition: number;
  };
  level: number;
  redeemedRewards: string[];
}