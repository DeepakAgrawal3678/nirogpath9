// Add HbA1c types to existing file
export interface HbA1cResult {
  value: number;
  date: string;
  labName?: string;
  reportId?: string;
}

export interface HbA1cReading {
  value: number;
  date: string;
  labName?: string;
  reportId?: string;
  reportUrl?: string;
  timestamp: string;
}