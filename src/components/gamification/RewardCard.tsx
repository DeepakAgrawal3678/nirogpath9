import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Reward } from '../../types/gamification';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (reward: Reward) => void;
}

export function RewardCard({ reward, userPoints, onRedeem }: RewardCardProps) {
  const canAfford = userPoints >= reward.pointsCost;

  return (
    <Card className="h-[200px] flex flex-col">
      <div className="h-24 relative">
        <img
          src={reward.image}
          alt={reward.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-1 left-2">
          <p className="text-[10px] font-medium text-white">{reward.partner}</p>
        </div>
      </div>
      
      <div className="p-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-white text-xs line-clamp-1">{reward.name}</h3>
          <p className="text-[10px] text-slate-300 line-clamp-2 mt-0.5">{reward.description}</p>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-orange-400 font-medium">
              {reward.pointsCost} points
            </span>
            <span className="text-slate-400">
              {reward.expiryDays}d
            </span>
          </div>

          <Button
            onClick={() => onRedeem(reward)}
            disabled={!canAfford}
            className="w-full h-6 text-[10px] leading-none flex items-center justify-center"
          >
            {canAfford ? 'Redeem' : `Need ${reward.pointsCost - userPoints} more`}
          </Button>
        </div>
      </div>
    </Card>
  );
}