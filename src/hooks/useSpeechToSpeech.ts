import { useState, useCallback } from 'react';
import { openai } from '../lib/openai/config';
import { useBloodSugar } from './useBloodSugar';
import { useProfile } from './useProfile';
import { getMealSuggestions } from '../utils/mealSuggestions/suggestionEngine';
import { saveBloodSugar } from '../lib/db';
import { useAuth } from './useAuth';

interface SpeechConfig {
  language: string;
  voiceName?: string;
  rate?: number;
  pitch?: number;
}

export function useSpeechToSpeech() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { readings } = useBloodSugar();
  const { formData: profile } = useProfile();
  const { user } = useAuth();
  const [config, setConfig] = useState<SpeechConfig>({
    language: 'en',
    rate: 1,
    pitch: 1
  });

  // Speech recognition setup
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = config.language;

  const startListening = useCallback(() => {
    setIsListening(true);
    recognition.start();
  }, [recognition]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    recognition.stop();
  }, [recognition]);

  const speak = useCallback(async (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = config.language;
    utterance.rate = config.rate || 1;
    utterance.pitch = config.pitch || 1;
    if (config.voiceName) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.name === config.voiceName);
      if (voice) utterance.voice = voice;
    }

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => setIsSpeaking(false);
  }, [config]);

  const processUserInput = useCallback(async (input: string) => {
    // Basic greeting handling
    if (input.toLowerCase().includes('hi') || input.toLowerCase().includes('hello')) {
      return 'I am doing good. How can I help you with meal suggestions today?';
    }

    // Check for blood sugar readings
    const bloodSugarMatch = input.match(/(\d{2,3})/g);
    if (bloodSugarMatch && user?.email) {
      const [beforeFood, afterFood] = bloodSugarMatch;
      await saveBloodSugar(user.email, {
        beforeFood,
        afterFood,
        timestamp: new Date().toISOString()
      });
      return 'Thank you for providing your blood sugar readings. Let me suggest some meals based on this.';
    }

    // Get meal suggestions
    const latestReading = readings[0];
    if (!latestReading) {
      return 'Please provide your blood sugar readings before and after meals so I can suggest appropriate meals.';
    }

    const suggestions = getMealSuggestions({
      bloodSugar: parseInt(latestReading.beforeFood),
      activityLevel: 'moderate',
      mealType: 'lunch',
      dietaryPreferences: profile.foodPreference ? [profile.foodPreference] : undefined
    });

    if (suggestions.length === 0) {
      return 'I couldn\'t find any suitable meal suggestions at the moment.';
    }

    const suggestion = suggestions[0];
    return `Based on your blood sugar level and dietary preferences, I recommend ${suggestion.name}. 
            This meal contains ${suggestion.nutritionalInfo.calories} calories, 
            ${suggestion.nutritionalInfo.protein}g protein, and 
            ${suggestion.nutritionalInfo.carbs}g carbs.`;
  }, [readings, profile, user]);

  recognition.onresult = async (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    setTranscript(transcript);

    if (event.results[current].isFinal) {
      const response = await processUserInput(transcript);
      speak(response);
    }
  };

  return {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    setConfig,
    config
  };
}