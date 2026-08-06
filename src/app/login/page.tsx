'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }
    setLoading(true);
    // Simulate login & redirect to dashboard
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B7FF00]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Logo */}
      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-12 h-12 rounded-[16px] bg-[#B7FF00] flex items-center justify-center text-[#0A0A0A] font-bold text-2xl shadow-[0_0_25px_rgba(183,255,0,0.4)] group-hover:scale-105 transition-transform duration-200">
          M
        </div>
        <span className="text-3xl font-black tracking-tight text-white font-mono">
          MAPUZ<span className="text-[#B7FF00]">.</span>
        </span>
      </Link>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#151515] p-8 sm:p-10 rounded-[22px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Boshqaruv paneliga kirish
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-2">
            Tizimga kirish uchun elektron pochta va parolingizni kiriting.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-[14px] bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1A1AA]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="admin@mapuz.uz"
                required
                className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
              Parol
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1A1AA]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                required
                className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#0A0A0A] font-bold py-4 rounded-[22px] text-base transition-all duration-200 shadow-[0_0_25px_rgba(183,255,0,0.3)] hover:shadow-[0_0_35px_rgba(183,255,0,0.45)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Kirish</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <Link
            href="/"
            className="text-xs text-[#A1A1AA] hover:text-white transition-colors"
          >
            ← Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}
