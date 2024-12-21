import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SocialAuth } from '../components/auth/SocialAuth';
import { PhoneAuth } from '../components/auth/PhoneAuth';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { PasswordStrengthIndicator } from '../components/ui/PasswordStrengthIndicator';
import { validatePassword } from '../utils/validation';
import { useAuth } from '../hooks/useAuth';

export function Signup() {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validation = validatePassword(password);
    if (!validation.isValid) {
      setError('Please fix the password issues before continuing.');
      return;
    }

    try {
      await signUp(email, password);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Breadcrumb />
        <div className="glass-effect p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-6">
            <span className="gradient-text">Create Account</span>
          </h2>
          <p className="text-slate-300 text-center mb-8">
            Start your journey to better health today
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 rounded-lg transition ${
                authMethod === 'email'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 py-2 rounded-lg transition ${
                authMethod === 'phone'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Phone
            </button>
          </div>

          {authMethod === 'email' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                    placeholder="Enter your full name"
                    required
                  />
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                    placeholder="Enter your email"
                    required
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                    placeholder="Create a password"
                    required
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                </div>
                <PasswordStrengthIndicator password={password} />
              </div>

              <Button type="submit" className="w-full">
                Create Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          ) : (
            <PhoneAuth />
          )}

          <SocialAuth />

          <div className="mt-6 text-center">
            <p className="text-slate-300">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:text-orange-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}