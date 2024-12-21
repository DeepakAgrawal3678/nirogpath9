import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onTranscription: (text: string) => void;
  onError: (error: string) => void;
  isRecording: boolean;
}

export function useSpeechRecognition({ 
  onTranscription, 
  onError,
  isRecording 
}: UseSpeechRecognitionProps) {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      let finalTranscript = '';

      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            onTranscription(finalTranscript.trim());
            finalTranscript = '';
          } else {
            interimTranscript += transcript;
          }
        }
      };

      recognitionInstance.onerror = (event) => {
        if (event.error === 'not-allowed') {
          onError('Microphone access denied. Please allow microphone access to use speech recognition.');
        } else {
          onError(`Speech recognition error: ${event.error}`);
        }
      };

      recognitionInstance.onend = () => {
        if (isRecording) {
          recognitionInstance.start();
        }
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
      onError('Speech recognition is not supported in this browser');
    }
  }, [onTranscription, onError]);

  useEffect(() => {
    if (recognition) {
      try {
        if (isRecording) {
          recognition.start();
        } else {
          recognition.stop();
        }
      } catch (error) {
        // Handle the error when start() is called while already recording
        if (error instanceof Error && error.name === 'InvalidStateError') {
          recognition.stop();
          setTimeout(() => {
            if (isRecording) {
              recognition.start();
            }
          }, 100);
        } else {
          onError('Failed to start recording. Please try again.');
        }
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition, isRecording, onError]);

  return {
    isSupported
  };
}