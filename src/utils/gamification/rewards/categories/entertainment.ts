import type { Reward } from '../../../../types/gamification';

export const ENTERTAINMENT_REWARDS: Reward[] = [
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