import React, { useState } from 'react';
import { auth } from '../../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Button } from '../ui/Button';
import { Phone } from 'lucide-react';

export function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      setVerificationId(confirmation.verificationId);
      setStep('otp');
    } catch (error) {
      console.error('Error sending code:', error);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmation.confirm(verificationCode);
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  if (step === 'phone') {
    return (
      <form onSubmit={handleSendCode} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
              placeholder="+1 (555) 000-0000"
              required
            />
            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Send Code
        </Button>
        <div id="recaptcha-container"></div>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerifyCode} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Verification Code
        </label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          placeholder="Enter 6-digit code"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Verify Code
      </Button>
    </form>
  );
}