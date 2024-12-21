import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function transcribeSpeech(audioBlob: Blob): Promise<string> {
  try {
    // Convert blob to base64
    const reader = new FileReader();
    const base64Audio = await new Promise<string>((resolve) => {
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]);
      };
      reader.readAsDataURL(audioBlob);
    });

    // Call OpenAI Whisper API
    const response = await openai.audio.transcriptions.create({
      file: new File([audioBlob], 'audio.webm', { type: 'audio/webm' }),
      model: 'whisper-1',
    });

    return response.text;
  } catch (error) {
    console.error('Error transcribing speech:', error);
    throw error;
  }
}