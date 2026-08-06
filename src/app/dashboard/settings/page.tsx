'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Database, Shield, Server, CheckCircle2, Menu } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const supabaseConnected = isSupabaseConfigured();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#A1A1AA] hover:text-white p-2 rounded-lg bg-[#151515]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Tizim Sozlamalari
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
          <div className="bg-[#151515] p-6 sm:p-8 rounded-[22px] border border-white/10 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-[#B7FF00]" />
                <span>Supabase Database Hub</span>
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1">
                PostgreSQL & Supabase Storage backend holati.
              </p>
            </div>

            <div className="p-4 rounded-[16px] bg-[#0A0A0A] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${supabaseConnected ? 'bg-[#B7FF00] animate-pulse' : 'bg-amber-400'}`} />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {supabaseConnected ? 'Supabase Ulangan' : 'Lokal Demo Rejimi (Out-of-the-box)'}
                  </p>
                  <p className="text-xs text-[#A1A1AA]">
                    {supabaseConnected
                      ? 'PostgreSQL bazasi va Storage faol ishlamoqda'
                      : '.env.local faylida NEXT_PUBLIC_SUPABASE_URL sozlansa, PostgreSQL avtomatik faollashadi'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-[#A1A1AA]">
                {supabaseConnected ? 'PostgreSQL Live' : 'LocalStorage Fallback'}
              </span>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#A1A1AA]">
                Tizim Xususiyatlari
              </h3>
              <ul className="space-y-2 text-sm text-[#A1A1AA]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF00]" />
                  <span>Cheksiz 100+ biznes profillari qo'llab-quvvatlanadi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF00]" />
                  <span>Ultra-fast mobile-first yuklanish</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF00]" />
                  <span>Apple 22px border radius dizayn sistemasi</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
