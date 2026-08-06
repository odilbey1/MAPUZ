'use client';

import React from 'react';
import { Send, Phone, MapPin, Sparkles } from 'lucide-react';
import { InstagramIcon, TelegramIcon } from '@/components/Icons';

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[320px] sm:w-[360px] h-[680px] bg-[#0A0A0A] rounded-[50px] p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(183,255,0,0.15)] border-[8px] border-[#222222] ring-1 ring-white/10 overflow-hidden flex flex-col justify-between select-none">
      {/* iPhone Dynamic Island / Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#000000] rounded-full z-30 flex items-center justify-end px-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/20"></div>
      </div>

      {/* Screen Content Container */}
      <div className="w-full h-full bg-[#0A0A0A] rounded-[38px] pt-10 pb-6 px-4 flex flex-col items-center justify-between overflow-y-auto no-scrollbar border border-white/5 relative">
        {/* Glow ambient background inside phone */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#B7FF00]/10 blur-[60px] rounded-full pointer-events-none" />

        <div className="w-full flex flex-col items-center text-center z-10">
          {/* Logo with Neon Glow */}
          <div className="relative mb-4 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B7FF00] to-[#80CC00] rounded-[24px] blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop&crop=faces"
              alt="Suzangaron Fayz Logo"
              className="relative w-24 h-24 rounded-[22px] object-cover border-2 border-[#B7FF00]/50 shadow-2xl"
            />
          </div>

          {/* Business Name */}
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5 justify-center">
            Suzangaron Fayz
            <Sparkles className="w-4 h-4 text-[#B7FF00]" />
          </h3>

          {/* Description */}
          <p className="text-xs text-[#A1A1AA] mt-1 max-w-[260px] leading-relaxed">
            Buxoro milliy taomlari, shinam atmosfera va a'lo darajadagi xizmat ko'rsatish.
          </p>

          {/* 4 Large Action Buttons */}
          <div className="w-full space-y-3 mt-6">
            {/* Telegram */}
            <div className="group relative w-full overflow-hidden rounded-[22px] bg-[#151515] p-3.5 border border-white/10 hover:border-[#0088cc]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,136,204,0.25)] flex items-center gap-3 cursor-pointer">
              <div className="w-11 h-11 rounded-[16px] bg-gradient-to-br from-[#0088cc] to-[#006699] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Send className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-white group-hover:text-[#0088cc] transition-colors">
                  Telegram
                </span>
                <span className="text-[11px] text-[#A1A1AA]">Kanlimizga a'zo bo'ling</span>
              </div>
            </div>

            {/* Instagram */}
            <div className="group relative w-full overflow-hidden rounded-[22px] bg-[#151515] p-3.5 border border-white/10 hover:border-[#E1306C]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,48,108,0.25)] flex items-center gap-3 cursor-pointer">
              <div className="w-11 h-11 rounded-[16px] bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-white group-hover:text-[#E1306C] transition-colors">
                  Instagram
                </span>
                <span className="text-[11px] text-[#A1A1AA]">Rasmlar va yangiliklar</span>
              </div>
            </div>

            {/* Telefon */}
            <div className="group relative w-full overflow-hidden rounded-[22px] bg-[#151515] p-3.5 border border-white/10 hover:border-[#B7FF00]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(183,255,0,0.25)] flex items-center gap-3 cursor-pointer">
              <div className="w-11 h-11 rounded-[16px] bg-gradient-to-br from-[#B7FF00] to-[#80CC00] flex items-center justify-center text-[#0A0A0A] shadow-md group-hover:scale-105 transition-transform font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-white group-hover:text-[#B7FF00] transition-colors">
                  Telefon
                </span>
                <span className="text-[11px] text-[#A1A1AA]">+998 90 123 45 67</span>
              </div>
            </div>

            {/* Joylashuv */}
            <div className="group relative w-full overflow-hidden rounded-[22px] bg-[#151515] p-3.5 border border-white/10 hover:border-[#EA4335]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,67,53,0.25)] flex items-center gap-3 cursor-pointer">
              <div className="w-11 h-11 rounded-[16px] bg-gradient-to-br from-[#EA4335] to-[#B31412] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-white group-hover:text-[#EA4335] transition-colors">
                  Joylashuv
                </span>
                <span className="text-[11px] text-[#A1A1AA]">Google Maps xaritasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 z-10">
          <span className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-mono">
            Powered by <strong className="text-white">MAPUZ</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
