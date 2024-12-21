import React from 'react';
import { PointsOverview } from '../../components/gamification/PointsOverview';
import { RewardsList } from '../../components/gamification/RewardsList';
import { AchievementCarousel } from '../../components/gamification/AchievementCarousel';
import { LeaderboardCard } from '../../components/gamification/LeaderboardCard';
import { useGamification } from '../../hooks/useGamification';
import type { Reward } from '../../types/gamification';

export function Rewards() {
  const {
    points,
    level,
    nextLevelPoints,
    achievements,
    getAchievementProgress,
    isAchievementUnlocked
  } = useGamification();
  
  const leaderboardEntries = [
    { rank: 1, name: 'Rahul M.', points: 2450, change: 120 },
    { rank: 2, name: 'Priya S.', points: 2280, change: 80 },
    { rank: 3, name: 'Amit K.', points: 2150, change: -30 },
    { rank: 4, name: 'Deepa R.', points: 1980, change: 200 },
    { rank: 5, name: 'Vikram P.', points: 1820, change: 50 }
  ];

  const handleRedeem = (reward: Reward) => {
    console.log('Redeeming reward:', reward);
  };

  return (
    <div className="container py-4">
      <h1 className="text-xl font-bold text-white mb-4">Rewards & Achievements</h1>

      {/* Top Section - Equal height cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <PointsOverview
          points={points}
          level={level}
          nextLevelPoints={nextLevelPoints}
        />
        <LeaderboardCard entries={leaderboardEntries} />
        <AchievementCarousel
          achievements={achievements}
          isAchievementUnlocked={isAchievementUnlocked}
          getAchievementProgress={getAchievementProgress}
        />
      </div>

      {/* Rewards Section */}
      <div className="grid grid-cols-4 gap-4">
        <RewardsList
          userPoints={points}
          onRedeem={handleRedeem}
        />
      </div>
    </div>
  );
}