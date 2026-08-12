'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LoginFormProps {
  /**
   * Callback function invoked upon successful validation.
   * Connect your backend authentication API call (e.g., Supabase auth, REST API, NextAuth) here.
   */
  onSuccess?: (userData: { email: string }) => void;
  /**
   * Optional custom redirect path after successful login.
   */
  redirectUrl?: string;
}

export default function LoginForm({ onSuccess, redirectUrl = '/dashboard' }: LoginFormProps) {
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Status & Validation states
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Email format validation helper
  const validateEmail = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  // Form submission & validation handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Client-Side Validation
    const newErrors: { email?: string; password?: string; general?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address (e.g., user@example.com).';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous errors & initiate loading state
    setErrors({});
    setIsLoading(true);

    try {
      // --------------------------------------------------------------------------
      // BACKEND AUTHENTICATION API PLACEHOLDER
      // Replace the block below with your actual API endpoint or SDK call:
      //
      // Example 1 (Supabase Auth):
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;
      //
      // Example 2 (REST API):
      // const res = await fetch('/api/v1/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, rememberMe }),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || 'Login failed');
      // --------------------------------------------------------------------------

      await handleLogin(email, password, rememberMe);

      setIsLoading(false);
      setIsSuccess(true);

      if (onSuccess) {
        onSuccess({ email });
      }

      // Redirect after short delay to display success animation
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = redirectUrl;
        }
      }, 750);
    } catch (err: any) {
      setIsLoading(false);
      setErrors({
        general: err?.message || 'Authentication failed. Please check your credentials and try again.',
      });
    }
  };

  /**
   * Placeholder function simulating backend authentication API call.
   */
  const handleLogin = async (emailVal: string, passwordVal: string, remember: boolean): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock successful login check
        if (passwordVal === 'wrongpass') {
          reject(new Error('Invalid email or password. Please try again.'));
        } else {
          // Store dummy token or session indicator
          if (typeof window !== 'undefined') {
            localStorage.setItem('mapuz_auth', 'true');
            localStorage.setItem('mapuz_user_email', emailVal);
          }
          resolve();
        }
      }, 1000);
    });
  };

  return (
    <div className="w-full max-w-md bg-[#151515] p-6 sm:p-9 rounded-[28px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative z-10 backdrop-blur-xl transition-all">
      {/* Header Title */}
      <div className="text-center mb-7">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-[#A1A1AA] mt-1.5 leading-relaxed">
          Sign in to your dashboard to manage your business links and analytics
        </p>
      </div>

      {/* General Error Banner */}
      {errors.general && (
        <div className="mb-5 p-3.5 rounded-[16px] bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center flex items-center justify-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* Success Notification Banner */}
      {isSuccess && (
        <div className="mb-5 p-3.5 rounded-[16px] bg-[#B7FF00]/10 border border-[#B7FF00]/30 text-[#B7FF00] text-xs font-extrabold text-center flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Authenticated successfully! Redirecting...</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">
            Email Address / Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1A1AA]">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="admin@example.com"
              disabled={isLoading || isSuccess}
              className={`w-full bg-[#0A0A0A] border rounded-[18px] pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#A1A1AA]/40 outline-none transition-all ${
                errors.email
                  ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                  : 'border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00]'
              } disabled:opacity-50`}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-[11px] text-red-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
              Password
            </label>
            <a
              href="#forgot-password"
              onClick={(e) => {
                e.preventDefault();
                alert('Password reset link sent or feature triggered.');
              }}
              className="text-[11px] font-semibold text-[#B7FF00] hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1A1AA]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="••••••••"
              disabled={isLoading || isSuccess}
              className={`w-full bg-[#0A0A0A] border rounded-[18px] pl-11 pr-11 py-3.5 text-white text-sm placeholder-[#A1A1AA]/40 outline-none transition-all ${
                errors.password
                  ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                  : 'border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00]'
              } disabled:opacity-50`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading || isSuccess}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A1A1AA] hover:text-white transition-colors"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-[11px] text-red-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading || isSuccess}
            className="w-4 h-4 rounded border-white/20 bg-[#0A0A0A] text-[#B7FF00] focus:ring-[#B7FF00] focus:ring-offset-0 cursor-pointer accent-[#B7FF00]"
          />
          <label htmlFor="rememberMe" className="text-xs text-[#A1A1AA] font-medium cursor-pointer selection:bg-transparent">
            Remember me on this device
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full flex items-center justify-center gap-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#0A0A0A] font-extrabold py-4 rounded-[22px] text-sm sm:text-base transition-all duration-200 shadow-[0_0_25px_rgba(183,255,0,0.35)] hover:shadow-[0_0_35px_rgba(183,255,0,0.5)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
