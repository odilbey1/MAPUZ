'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Eye, EyeOff, User } from 'lucide-react';
import { verifyAdminAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();

  // Login & Password State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Process Login/Password submission via Supabase admin_users check
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Iltimos, login va parolni to\'liq kiriting');
      return;
    }

    setLoading(true);
    setError('');

    const res = await verifyAdminAuth(username, password);
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('mapuz_auth', 'true');
        localStorage.setItem('mapuz_user', username.trim());
      }
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } else {
      setError(res.error || 'Login yoki parol noto\'g\'ri');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#B7FF00]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Logo Header */}
      <Link href="/" className="flex items-center gap-3 mb-8 group z-10">
        <div className="w-12 h-12 rounded-[18px] bg-[#B7FF00] flex items-center justify-center text-[#0A0A0A] font-extrabold text-2xl shadow-[0_0_30px_rgba(183,255,0,0.45)] group-hover:scale-105 transition-transform duration-200">
          M
        </div>
        <span className="text-3xl font-black tracking-tight text-white font-mono">
          MAPUZ<span className="text-[#B7FF00]">.</span>
        </span>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#151515] p-6 sm:p-9 rounded-[28px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative z-10 space-y-6 backdrop-blur-xl">
        {/* Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-[#B7FF00] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Himoyalangan Boshqaruv Paneli</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Tizimga Kirish
          </h1>
          <p className="text-xs text-[#A1A1AA] mt-1.5 leading-relaxed">
            Admin panelga kirish uchun login va parolingizni kiriting
          </p>
        </div>

        {/* Error Feedback Alert */}
        {error && (
          <div className="p-3.5 rounded-[16px] bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center animate-shake">
            {error}
          </div>
        )}

        {/* Success Feedback Alert */}
        {success && (
          <div className="p-3.5 rounded-[16px] bg-[#B7FF00]/10 border border-[#B7FF00]/30 text-[#B7FF00] text-xs font-bold text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Muvaffaqiyatli tasdiqlandi! Yo'naltirilmoqda...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username / Login Field */}
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
              Login / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1A1AA]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="admin"
                required
                className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[18px] pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
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
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                required
                className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[18px] pl-11 pr-11 py-3.5 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#A1A1AA] hover:text-white transition-colors"
                title={showPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#0A0A0A] font-extrabold py-4 rounded-[22px] text-base transition-all duration-200 shadow-[0_0_25px_rgba(183,255,0,0.35)] hover:shadow-[0_0_35px_rgba(183,255,0,0.5)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
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

        {/* Back Link */}
        <div className="pt-4 border-t border-white/10 text-center">
          <Link
            href="/"
            className="text-xs text-[#A1A1AA] hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            ← Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}
