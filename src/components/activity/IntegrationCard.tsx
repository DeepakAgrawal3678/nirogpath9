import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Check, X } from 'lucide-react';
import type { ActivityProvider } from '../../types/activity';

interface IntegrationCardProps {
  provider: ActivityProvider;
  onConnect: (provider: ActivityProvider) => void;
  onDisconnect: (provider: ActivityProvider) => void;
}

export function IntegrationCard({ provider, onConnect, onDisconnect }: IntegrationCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={provider.icon} 
            alt={provider.name} 
            className="w-10 h-10 rounded-lg"
          />
          <div>
            <h3 className="font-medium">{provider.name}</h3>
            <p className="text-sm text-slate-300">{provider.description}</p>
          </div>
        </div>
        {provider.connected ? (
          <div className="flex items-center gap-2">
            <span className="flex items-center text-sm text-green-500">
              <Check className="w-4 h-4 mr-1" />
              Connected
            </span>
            <Button 
              variant="secondary"
              onClick={() => onDisconnect(provider)}
              className="ml-4"
            >
              <X className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        ) : (
          <Button onClick={() => onConnect(provider)}>
            Connect
          </Button>
        )}
      </div>
    </Card>
  );
}