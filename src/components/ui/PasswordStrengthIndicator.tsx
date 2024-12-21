import React from 'react';
import { validatePassword } from '../../utils/validation';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const validation = validatePassword(password);
  
  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {validation.errors.map((error, index) => (
        <p key={index} className="text-sm text-red-400">
          {error}
        </p>
      ))}
      {validation.isValid && (
        <p className="text-sm text-green-400">
          Password meets all requirements
        </p>
      )}
    </div>
  );
}