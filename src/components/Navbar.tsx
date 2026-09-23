'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ArrowRight, Layers } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0A0A]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-[14px] bg-[#B7FF00] flex items-center justify-center text-[#0A0A0A] font-bold text-xl shadow-[0_0_20px_rgba(183,255,0,0.3)] group-hover:scale-105 transition-transform duration-200">
            M
          </div>
          <span className="text-2xl font-black tracking-tight text-white font-mono">
            MAPUZ<span className="text-[#B7FF00]">.</span>
          </span>
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A1A1AA]">
          <Link href="/" className="hover:text-white transition-colors">
            Bosh sahifa
          </Link>
          <a href="#services" className="hover:text-white transition-colors">
            Xizmatlar
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Narxlar
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Aloqa
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-[#151515] hover:bg-[#1f1f1f] text-white border border-white/10 px-5 py-2.5 rounded-[22px] text-sm font-semibold transition-all hover:border-[#B7FF00]/40 hover:shadow-[0_0_15px_rgba(183,255,0,0.15)] active:scale-95"
          >
            <LayoutDashboard className="w-4 h-4 text-[#B7FF00]" />
            <span>Boshqaruv paneli</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
