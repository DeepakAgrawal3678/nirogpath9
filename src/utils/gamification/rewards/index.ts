import { HEALTH_REWARDS } from './categories/health';
import { LIFESTYLE_REWARDS } from './categories/lifestyle';
import { ENTERTAINMENT_REWARDS } from './categories/entertainment';
import type { Reward } from '../../../types/gamification';
import type { RewardCategory } from './types';

export const REWARDS = [
  ...HEALTH_REWARDS,
  ...LIFESTYLE_REWARDS,
  ...ENTERTAINMENT_REWARDS
];

export function getRewardsByCategory(category: RewardCategory): Reward[] {
  return REWARDS.filter(reward => reward.category === category);
}

export function getAffordableRewards(points: number): Reward[] {
  return REWARDS.filter(reward => reward.pointsCost <= points);
}

export function calculatePointsNeeded(reward: Reward, userPoints: number): number {
  return Math.max(0, reward.pointsCost - userPoints);
}