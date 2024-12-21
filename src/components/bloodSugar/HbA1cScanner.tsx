import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { extractHbA1cFromImage } from '../../utils/bloodSugar/reportScanner';
import type { HbA1cResult } from '../../types/bloodSugar';

interface HbA1cScannerProps {
  onResultExtracted: (result: HbA1cResult) => void;
}

export function HbA1cScanner({ onResultExtracted }: HbA1cScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    setPreview(URL.createObjectURL(file));
    setScanning(true);
    setError(null);

    try {
      const result = await extractHbA1cFromImage(file);
      onResultExtracted(result);
    } catch (err) {
      setError('Could not extract HbA1c value. Please ensure the report is clear and properly oriented.');
    } finally {
      setScanning(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">HbA1c Report Scanner</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label 
              className={`flex flex-col items-center justify-center h-40 px-4 border-2 border-dashed rounded-lg cursor-pointer ${
                scanning ? 'bg-orange-500/10 border-orange-500' : 'border-white/10 hover:border-orange-500/50'
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Report preview" 
                    className="h-24 object-contain mb-2"
                  />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-3 text-slate-400" />
                    <p className="mb-2 text-sm text-slate-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                      Supported formats: PNG, JPG, PDF
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileUpload}
                disabled={scanning}
              />
            </label>
          </div>

          <div className="w-64 p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Scanning Tips</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Ensure report is well-lit and clear</li>
              <li>• Include the entire HbA1c section</li>
              <li>• Avoid glare or shadows</li>
              <li>• Keep report flat while scanning</li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {scanning && (
          <div className="text-center text-sm text-slate-400">
            Scanning report...
          </div>
        )}
      </div>
    </Card>
  );
}