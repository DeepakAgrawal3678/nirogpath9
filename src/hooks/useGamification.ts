import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { calculateLevel, getNextLevelPoints, getLevelProgress } from '../utils/gamification/levels';
import { 
  ALL_ACHIEVEMENTS,
  calculateProgress,
  getAchievementsByCategory 
} from '../utils/gamification/achievements';
import { getRewardsByCategory, getAffordableRewards } from '../utils/gamification/rewards';
import { calculateActivityPoints } from '../utils/gamification/points/calculator';
import type { Achievement, Reward } from '../types/gamification';

export function useGamification() {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  useEffect(() => {
    if (user?.email) {
      // Initialize with mock data (in a real app, fetch from backend)
      setPoints(750);
      setAchievements(ALL_ACHIEVEMENTS);
      setAvailableRewards(getAffordableRewards(750));
      setUnlockedAchievements(['weekly-warrior']);
    }
  }, [user]);

  const level = calculateLevel(points);
  const nextLevelPoints = getNextLevelPoints(points);
  const progress = getLevelProgress(points);

  const getAchievementProgress = (achievement: Achievement) => {
    // Mock progress data (in a real app, fetch from backend)
    const mockProgress = {
      'weekly-warrior': 3,
      'fitness-master': 1200,
      'glucose-guardian': 4
    };
    return calculateProgress(achievement, mockProgress[achievement.id as keyof typeof mockProgress] || 0);
  };

  const isAchievementUnlocked = (achievementId: string) => {
    return unlockedAchievements.includes(achievementId);
  };

  return {
    points,
    level,
    nextLevelPoints,
    progress,
    achievements,
    availableRewards,
    getAchievementProgress,
    isAchievementUnlocked
  };
}