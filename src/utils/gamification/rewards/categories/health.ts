import type { Reward } from '../../../../types/gamification';

export const HEALTH_REWARDS: Reward[] = [
  {
    id: 'stevia-pack',
    name: 'Sugar-Free Stevia Pack',
    description: 'A month supply of premium stevia sweetener',
    pointsCost: 500,
    category: 'health',
    partner: 'Stevia Natural',
    expiryDays: 30,
    image: 'https://images.unsplash.com/photo-1515012b5-1ba12b6e2d22?auto=format&fit=crop&w=300'
  }
];