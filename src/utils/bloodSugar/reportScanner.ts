import { createWorker } from 'tesseract.js';

export interface HbA1cResult {
  value: number;
  date: string;
  labName?: string;
  reportId?: string;
}

export async function extractHbA1cFromImage(file: File): Promise<HbA1cResult> {
  // Create Tesseract worker
  const worker = await createWorker('eng');

  try {
    // Convert file to image data
    const imageData = await createImageData(file);
    
    // Perform OCR
    const { data: { text } } = await worker.recognize(imageData);
    
    // Extract HbA1c value using regex
    const hba1cMatch = text.match(/HbA1c[:\s]+(\d+\.?\d*)\s*%/i);
    if (!hba1cMatch) {
      throw new Error('Could not find HbA1c value in report');
    }

    // Extract date (assuming common date formats)
    const dateMatch = text.match(/\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/);
    const date = dateMatch ? dateMatch[0] : new Date().toISOString().split('T')[0];

    // Extract lab name if available
    const labMatch = text.match(/(?:lab|laboratory|clinic)[:|\s]+([^\n]+)/i);
    const labName = labMatch ? labMatch[1].trim() : undefined;

    // Extract report ID if available
    const reportMatch = text.match(/(?:report|ref|id)[\s#:]+([A-Z0-9-]+)/i);
    const reportId = reportMatch ? reportMatch[1].trim() : undefined;

    return {
      value: parseFloat(hba1cMatch[1]),
      date,
      labName,
      reportId
    };
  } finally {
    await worker.terminate();
  }
}

async function createImageData(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}