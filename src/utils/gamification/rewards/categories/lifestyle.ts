import type { Reward } from '../../../../types/gamification';

export const LIFESTYLE_REWARDS: Reward[] = [
  {
    id: 'gym-pass',
    name: 'One Month Gym Pass',
    description: 'Access to premium fitness facilities',
    pointsCost: 1000,
    category: 'lifestyle',
    partner: 'FitLife Gyms',
    expiryDays: 45,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300'
  }
];