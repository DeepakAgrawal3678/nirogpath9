import type { Reward } from '../../types/gamification';

export const REWARDS: Reward[] = [
  {
    id: 'stevia-pack',
    name: 'Sugar-Free Stevia Pack',
    description: 'A month supply of premium stevia sweetener',
    pointsCost: 500,
    category: 'health',
    partner: 'Stevia Natural',
    expiryDays: 30,
    image: 'https://images.unsplash.com/photo-1515012b5-1ba12b6e2d22?auto=format&fit=crop&w=300'
  },
  {
    id: 'gym-pass',
    name: 'One Month Gym Pass',
    description: 'Access to premium fitness facilities',
    pointsCost: 1000,
    category: 'lifestyle',
    partner: 'FitLife Gyms',
    expiryDays: 45,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300'
  },
  {
    id: 'movie-tickets',
    name: 'Movie Tickets (2)',
    description: 'Two premium movie tickets',
    pointsCost: 300,
    category: 'entertainment',
    partner: 'CineMax',
    expiryDays: 60,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300'
  }
];

export function getRewardsByCategory(category: Reward['category']): Reward[] {
  return REWARDS.filter(reward => reward.category === category);
}

export function getAffordableRewards(points: number): Reward[] {
  return REWARDS.filter(reward => reward.pointsCost <= points);
}