import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { IntegrationCard } from '../../components/activity/IntegrationCard';
import { ACTIVITY_PROVIDERS } from '../../lib/integrations/providers';
import type { ActivityProvider, IntegrationStatus } from '../../types/activity';

export function ActivityIntegrations() {
  const [integrations, setIntegrations] = useState(ACTIVITY_PROVIDERS);
  const [status, setStatus] = useState<IntegrationStatus | null>(null);

  const handleConnect = async (provider: ActivityProvider) => {
    try {
      setStatus({
        provider: provider.name,
        connected: false,
        error: undefined
      });

      // In a real app, this would redirect to the provider's OAuth flow
      if (provider.authUrl) {
        window.open(provider.authUrl, '_blank');
      }

      // Update local state
      setIntegrations(prev => 
        prev.map(p => 
          p.id === provider.id ? { ...p, connected: true } : p
        )
      );

      setStatus({
        provider: provider.name,
        connected: true,
        lastSync: new Date().toISOString()
      });
    } catch (error) {
      setStatus({
        provider: provider.name,
        connected: false,
        error: 'Failed to connect. Please try again.'
      });
    }
  };

  const handleDisconnect = async (provider: ActivityProvider) => {
    try {
      // Update local state
      setIntegrations(prev => 
        prev.map(p => 
          p.id === provider.id ? { ...p, connected: false } : p
        )
      );

      setStatus({
        provider: provider.name,
        connected: false,
        lastSync: undefined
      });
    } catch (error) {
      setStatus({
        provider: provider.name,
        connected: true,
        error: 'Failed to disconnect. Please try again.'
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Activity Tracking Integrations</h1>

      {status && (
        <div className={`mb-6 p-4 rounded-lg ${
          status.error
            ? 'bg-red-500/10 border border-red-500/20 text-red-400'
            : status.connected
            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
            : 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
        }`}>
          {status.error || (
            status.connected
              ? `Successfully connected to ${status.provider}`
              : `Disconnected from ${status.provider}`
          )}
        </div>
      )}

      <div className="space-y-4">
        {integrations.map(provider => (
          <IntegrationCard
            key={provider.id}
            provider={provider}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        ))}
      </div>

      <Card className="mt-8 p-6">
        <h2 className="text-lg font-semibold mb-4">About Activity Tracking</h2>
        <div className="space-y-4 text-slate-300">
          <p>
            Connect your favorite fitness devices and apps to automatically sync your activities.
            This helps maintain accurate health records and provides better insights for managing
            your diabetes.
          </p>
          <p>
            Your data is securely synchronized and you can control what information is shared.
            You can disconnect these integrations at any time.
          </p>
        </div>
      </Card>
    </div>
  );
}