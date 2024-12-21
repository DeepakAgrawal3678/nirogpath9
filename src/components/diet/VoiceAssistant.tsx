import React from 'react';
import { Mic, MicOff, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useSpeechToSpeech } from '../../hooks/useSpeechToSpeech';
import { SUPPORTED_LANGUAGES } from '../../lib/openai/config';

export function VoiceAssistant() {
  const {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    config,
    setConfig
  } = useSpeechToSpeech();

  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Voice Assistant</h3>
        <Button
          variant="secondary"
          className="p-2 h-auto"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {showSettings && (
        <div className="mb-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Language
            </label>
            <select
              value={config.language}
              onChange={(e) => setConfig({ ...config, language: e.target.value })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
            >
              <optgroup label="Regional Languages">
                {Object.entries(SUPPORTED_LANGUAGES.regional).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </optgroup>
              <optgroup label="International Languages">
                {Object.entries(SUPPORTED_LANGUAGES.international).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Speech Rate
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={config.rate}
                onChange={(e) => setConfig({ ...config, rate: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Pitch
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={config.pitch}
                onChange={(e) => setConfig({ ...config, pitch: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="min-h-[100px] p-3 bg-white/5 rounded-lg text-slate-200 text-sm">
          {transcript || 'Say something...'}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={isListening ? stopListening : startListening}
            className={`p-4 rounded-full ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
          >
            {isListening ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </Button>
        </div>

        {isSpeaking && (
          <div className="text-center text-sm text-slate-300">
            Speaking...
          </div>
        )}
      </div>
    </Card>
  );
}