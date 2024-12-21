import type { Reward } from '../../../types/gamification';

export type RewardCategory = Reward['category'];

export interface RewardPartner {
  id: string;
  name: string;
  logo: string;
  description: string;
}