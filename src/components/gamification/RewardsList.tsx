import React from 'react';
import { RewardCard } from './RewardCard';
import type { Reward } from '../../types/gamification';

interface RewardsListProps {
  userPoints: number;
  onRedeem: (reward: Reward) => void;
}

export function RewardsList({ userPoints, onRedeem }: RewardsListProps) {
  const rewards = [
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
    },
    {
      id: 'health-check',
      name: 'Health Check-up',
      description: 'Comprehensive health screening',
      pointsCost: 800,
      category: 'health',
      partner: 'HealthFirst',
      expiryDays: 90,
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=300'
    }
  ];

  return (
    <>
      {rewards.map((reward) => (
        <RewardCard
          key={reward.id}
          reward={reward as Reward}
          userPoints={userPoints}
          onRedeem={onRedeem}
        />
      ))}
    </>
  );
}