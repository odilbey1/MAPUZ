'use client';

import React from 'react';
import { Phone, MapPin, Link as LinkIcon } from 'lucide-react';
import { InstagramIcon, TelegramIcon, YandexMapsIcon } from '@/components/Icons';

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[320px] sm:w-[350px] h-[680px] bg-[#0A0A0E] rounded-[50px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(99,102,241,0.15)] border-[8px] border-[#20212a] ring-1 ring-white/10 overflow-hidden flex flex-col justify-between select-none">
      {/* iPhone Dynamic Island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#000000] rounded-full z-30 flex items-center justify-end px-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/20"></div>
      </div>

      {/* Screen Content Container - Glassmorphic Slate */}
      <div className="w-full h-full bg-[#1b1c26] rounded-[38px] pt-8 pb-5 px-3.5 flex flex-col items-center justify-between overflow-y-auto no-scrollbar border border-white/10 relative">
        {/* Glow ambient background inside phone */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-56 h-56 bg-indigo-600/15 blur-[60px] rounded-full pointer-events-none" />

        <div className="w-full flex flex-col items-center text-center z-10">
          {/* Circular Avatar with Glowing White Ring */}
          <div className="relative mb-3 group">
            <div className="w-20 h-20 rounded-full border-[3px] border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] bg-[#111218] flex items-center justify-center">
              <div className="w-11 h-11 rounded-[14px] bg-[#B7FF00] flex items-center justify-center text-[#0A0A0A] font-black text-2xl shadow-[0_0_20px_rgba(183,255,0,0.5)]">
                M
              </div>
            </div>
          </div>

          {/* Business Name */}
          <h3 className="text-lg font-black text-white tracking-tight">
            MAPUZ Demo Studio
          </h3>

          {/* Description */}
          <p className="text-[11px] text-[#A6A7B8] mt-1 max-w-[250px] leading-relaxed">
            Barcha ijtimoiy tarmoqlar, aloqa raqamlari va xarita lokatsiyalari bitta professional sahifada.
          </p>


          {/* 5 Vibrant Gradient Buttons */}
          <div className="w-full space-y-2.5 mt-4">
            {/* 1. Telegram */}
            <div className="group relative w-full overflow-hidden rounded-[18px] bg-gradient-to-r from-[#179cde] via-[#24A1DE] to-[#36b2f0] p-2 flex items-center justify-between shadow-md border border-white/15 cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="w-9 h-9 rounded-[12px] bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/25">
                <TelegramIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide drop-shadow-sm truncate px-2">
                Telegram Kanal
              </span>
              <div className="w-9 shrink-0" />
            </div>

            {/* 2. Instagram */}
            <div className="group relative w-full overflow-hidden rounded-[18px] bg-gradient-to-r from-[#F05A4F] via-[#D82E7E] to-[#8D2B9F] p-2 flex items-center justify-between shadow-md border border-white/15 cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="w-9 h-9 rounded-[12px] bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/25">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide drop-shadow-sm truncate px-2">
                Instagram
              </span>
              <div className="w-9 shrink-0" />
            </div>

            {/* 3. Telefon */}
            <div className="group relative w-full overflow-hidden rounded-[18px] bg-gradient-to-r from-[#20C063] via-[#2ECC71] to-[#27AE60] p-2 flex items-center justify-between shadow-md border border-white/15 cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="w-9 h-9 rounded-[12px] bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/25">
                <Phone className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide drop-shadow-sm truncate px-2">
                Admin Telefon raqami
              </span>
              <div className="w-9 shrink-0" />
            </div>

            {/* 4. Yandex Maps */}
            <div className="group relative w-full overflow-hidden rounded-[18px] bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFA726] p-2 flex items-center justify-between shadow-md border border-white/15 cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="w-9 h-9 rounded-[12px] bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/25">
                <YandexMapsIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide drop-shadow-sm truncate px-2">
                Yandex map Location
              </span>
              <div className="w-9 shrink-0" />
            </div>

            {/* 5. Google Maps */}
            <div className="group relative w-full overflow-hidden rounded-[18px] bg-gradient-to-r from-[#2196F3] via-[#00B0FF] to-[#00E676] p-2 flex items-center justify-between shadow-md border border-white/15 cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="w-9 h-9 rounded-[12px] bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/25">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide drop-shadow-sm truncate px-2">
                Google map Location
              </span>
              <div className="w-9 shrink-0" />
            </div>
          </div>
        </div>

        {/* Floating Footer Pill */}
        <div className="pt-3 z-10">
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-[#252636]/90 backdrop-blur-md text-[10px] font-semibold text-[#A6A7B8] flex items-center gap-1.5 shadow-sm">
            <span>Sizga ham kerakmi?</span>
            <span className="flex items-center gap-1 font-bold text-white bg-gradient-to-r from-[#2196F3] to-[#8D2B9F] px-2 py-0.5 rounded-full text-[9px]">
              <LinkIcon className="w-2.5 h-2.5" />
              MAPUZ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
