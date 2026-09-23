'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Business, BusinessLink } from '@/lib/types';
import { Phone, MapPin, Globe, Sun, Moon, Link as LinkIcon } from 'lucide-react';
import {
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
  TiktokIcon,
  FacebookIcon,
  YandexMapsIcon,
  TwoGisIcon
} from '@/components/Icons';

interface PublicProfileClientProps {
  business: Business;
  allButtons: BusinessLink[];
}

export default function PublicProfileClient({
  business,
  allButtons,
}: PublicProfileClientProps) {
  // Theme state: 'dark' (Kechki - default) or 'light' (Kunduzgi)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const renderLinkButton = (btn: BusinessLink) => {
    let icon = <Globe className="w-5 h-5 sm:w-6 sm:h-6" />;
    let gradientClass = 'bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#D946EF]';
    let shadowClass = 'hover:shadow-[0_10px_25px_rgba(139,92,246,0.45)]';

    switch (btn.type) {
      case 'telegram':
        icon = <TelegramIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        gradientClass = 'bg-gradient-to-r from-[#179cde] via-[#24A1DE] to-[#36b2f0]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(36,161,222,0.45)]';
        break;
      case 'instagram':
        icon = <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        gradientClass = 'bg-gradient-to-r from-[#F05A4F] via-[#D82E7E] to-[#8D2B9F]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(216,46,126,0.45)]';
        break;
      case 'phone':
        icon = <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />;
        gradientClass = 'bg-gradient-to-r from-[#20C063] via-[#2ECC71] to-[#27AE60]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(39,174,96,0.45)]';
        break;
      case 'yandex_maps':
        icon = <YandexMapsIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        gradientClass = 'bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFA726]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(255,112,67,0.45)]';
        break;
      case 'google_maps':
        icon = <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />;
        gradientClass = 'bg-gradient-to-r from-[#2196F3] via-[#00B0FF] to-[#00E676]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(0,176,255,0.45)]';
        break;
      case '2gis':
        icon = <TwoGisIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        gradientClass = 'bg-gradient-to-r from-[#28A745] via-[#20C997] to-[#17A2B8]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(32,201,151,0.45)]';
        break;
      case 'youtube':
        icon = <YoutubeIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        gradientClass = 'bg-gradient-to-r from-[#FF0000] via-[#E50914] to-[#B71C1C]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(229,9,20,0.45)]';
        break;
      case 'tiktok':
        icon = <TiktokIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        gradientClass = 'bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#111111]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(79,172,254,0.45)]';
        break;
      case 'facebook':
        icon = <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        gradientClass = 'bg-gradient-to-r from-[#1877F2] to-[#0D47A1]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(24,119,242,0.45)]';
        break;
      case 'website':
      case 'custom':
      default:
        icon = <Globe className="w-5 h-5 sm:w-6 sm:h-6" />;
        gradientClass = 'bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#D946EF]';
        shadowClass = 'hover:shadow-[0_10px_25px_rgba(139,92,246,0.45)]';
        break;
    }

    let href = btn.url;
    const isPhone = btn.type === 'phone';

    if (isPhone) {
      const cleaned = btn.url.replace(/[^\d+]/g, '');
      const rawNumber = cleaned.startsWith('tel:') ? cleaned.replace('tel:', '') : cleaned;
      href = `tel:${rawNumber.startsWith('+') ? rawNumber : '+' + rawNumber}`;
    } else {
      href = btn.url.startsWith('http://') || btn.url.startsWith('https://') || btn.url.startsWith('tel:') ? btn.url : `https://${btn.url}`;
    }

    return (
      <a
        key={btn.id}
        href={href}
        target={isPhone ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className={`group relative w-full overflow-hidden rounded-[20px] ${gradientClass} p-2.5 sm:p-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${shadowClass} flex items-center justify-between cursor-pointer border border-white/15`}
      >
        {/* Left: Translucent Frosted Glass Badge with Icon */}
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner border border-white/25 group-hover:scale-105 transition-transform">
          {icon}
        </div>

        {/* Center: Title & Optional Subtitle */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 min-w-0">
          <span className="text-sm sm:text-base font-bold text-white tracking-wide drop-shadow-sm truncate w-full">
            {btn.title}
          </span>
          {btn.subtitle && btn.subtitle.trim() !== '' && (
            <span className="text-[11px] sm:text-xs text-white/85 font-medium truncate w-full mt-0.5">
              {btn.subtitle}
            </span>
          )}
        </div>

        {/* Right: Invisible Spacer to keep text mathematically centered */}
        <div className="w-11 sm:w-12 shrink-0 pointer-events-none" />
      </a>
    );
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-between py-6 px-4 sm:px-6 relative overflow-x-hidden ${
        isDark
          ? 'bg-[#0c0d14] text-white selection:bg-white/20 selection:text-white'
          : 'bg-[#F2F3F7] text-[#12131A] selection:bg-black selection:text-white'
      }`}
    >
      {/* Ambient Gradient Glow */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
          isDark ? 'bg-indigo-900/25' : 'bg-blue-300/35'
        }`}
      />

      {/* Floating Theme Switcher: Kunduzgi (☀️) / Kechki (🌙) */}
      <div className="w-full max-w-[440px] flex justify-end mb-2 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 active:scale-95 shadow-sm ${
            isDark
              ? 'bg-[#1b1c26]/80 border-white/10 text-white/80 hover:text-white hover:bg-white/10'
              : 'bg-white/90 border-black/10 text-black/80 hover:text-black hover:bg-white'
          }`}
          title="Mavzuni o'zgartirish (Kunduzgi / Kechki)"
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Kunduzgi</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Kechki</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Card Container (Matching Reference Design) */}
      <div
        className={`w-full max-w-[440px] rounded-[38px] p-6 sm:p-7 border transition-all duration-500 shadow-2xl relative z-10 flex flex-col items-center text-center my-auto ${
          isDark
            ? 'bg-[#1b1c26]/90 backdrop-blur-xl border-white/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]'
            : 'bg-white/95 backdrop-blur-xl border-black/[0.06] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]'
        }`}
      >
        {/* Circular Avatar with Glowing White Border */}
        <div className="relative mb-3.5">
          <img
            src={business.logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop'}
            alt={business.business_name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-[3.5px] border-white shadow-[0_0_25px_rgba(255,255,255,0.2)] bg-black"
          />
        </div>

        {/* Business Name */}
        <h1
          className={`text-2xl sm:text-[26px] font-black tracking-tight leading-snug ${
            isDark ? 'text-white' : 'text-[#111218]'
          }`}
        >
          {business.business_name}
        </h1>

        {/* Description */}
        {business.description && (
          <p
            className={`mt-2 text-xs sm:text-[13px] leading-relaxed max-w-[320px] font-normal ${
              isDark ? 'text-[#A6A7B8]' : 'text-[#5C5E6E]'
            }`}
          >
            {business.description}
          </p>
        )}

        {/* Dynamic Vibrant Gradient Buttons List */}
        <div className="w-full space-y-3 sm:space-y-3.5 mt-6">
          {allButtons.length === 0 ? (
            <div
              className={`p-5 rounded-[20px] text-xs font-medium border ${
                isDark ? 'bg-[#151620] border-white/10 text-[#A1A1AA]' : 'bg-gray-50 border-black/10 text-[#71717A]'
              }`}
            >
              Hozircha hech qanday havola qo'shilmagan.
            </div>
          ) : (
            allButtons.map((btn) => renderLinkButton(btn))
          )}
        </div>
      </div>

      {/* Floating Bottom Badge */}
      <footer className="pt-6 pb-2 z-10">
        <Link
          href="/"
          className={`px-5 py-2.5 rounded-full border text-xs font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg active:scale-95 ${
            isDark
              ? 'bg-[#1b1c26]/90 backdrop-blur-md border-white/10 text-[#C4C4D0] hover:text-white hover:bg-[#252636]'
              : 'bg-white/90 backdrop-blur-md border-black/10 text-[#4A4B5A] hover:text-black hover:bg-white'
          }`}
        >
          <span className="opacity-90">Sizga ham kerakmi?</span>
          <span className="flex items-center gap-1 font-bold text-white bg-gradient-to-r from-[#2196F3] to-[#8D2B9F] px-2.5 py-0.5 rounded-full text-[11px] shadow-sm">
            <LinkIcon className="w-3 h-3" />
            MAPUZ
          </span>
        </Link>
      </footer>
    </div>
  );
}
