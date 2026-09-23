'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Business, BusinessLink } from '@/lib/types';
import { Sun, Moon, Link as LinkIcon } from 'lucide-react';
import {
  TelegramPlaneIcon,
  InstagramGradientIcon,
  PhoneBadgeIcon,
  GoogleMapsPinIcon,
  YandexPinIcon,
  TwoGisBadgeIcon,
  WebsiteGlobeIcon,
  YouTubeBadgeIcon,
  TikTokNeonIcon,
  FacebookCircleIcon,
  ChainLinkIcon,
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
    let icon = <ChainLinkIcon className="w-7 h-7" />;
    let gradientClass = 'bg-gradient-to-r from-[#2a0e4a] via-[#451478] to-[#19082e]';
    let borderClass = 'border border-[#d500f9]/40';
    let shadowClass = 'hover:shadow-[0_8px_30px_rgba(213,0,249,0.35)]';
    let isYandex = false;

    switch (btn.type) {
      // 1. Telegram - Neon Blue Glow
      case 'telegram':
        icon = <TelegramPlaneIcon className="w-10 h-10 sm:w-11 sm:h-11" />;
        gradientClass = 'bg-gradient-to-r from-[#0052d4] via-[#0072ff] to-[#0039a6]';
        borderClass = 'border border-[#00d2ff]/40';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(0,114,255,0.45)]';
        break;

      // 2. Instagram - Vivid Magenta Sunset Glow
      case 'instagram':
        icon = <InstagramGradientIcon className="w-9 h-9 sm:w-10 sm:h-10" />;
        gradientClass = 'bg-gradient-to-r from-[#700060] via-[#b80058] to-[#e63946]';
        borderClass = 'border border-[#ff2a8d]/40';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(225,48,108,0.45)]';
        break;

      // 3. Telefon - Emerald Mint Green Glow
      case 'phone':
        icon = <PhoneBadgeIcon className="w-9 h-9 sm:w-10 sm:h-10" />;
        gradientClass = 'bg-gradient-to-r from-[#0b4629] via-[#147a46] to-[#052b17]';
        borderClass = 'border border-[#20c997]/50';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(25,135,84,0.45)]';
        break;

      // 4. Joylashuv (Google Maps) - Deep Dark Warm Amber
      case 'google_maps':
        icon = <GoogleMapsPinIcon className="w-8 h-8 sm:w-9 sm:h-9" />;
        gradientClass = 'bg-gradient-to-r from-[#2a130c] via-[#4d2212] to-[#1d0b05]';
        borderClass = 'border border-[#ff6d00]/40';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(255,109,0,0.35)]';
        break;

      // 5. Yandex Maps - Crisp Glossy White with Red Pin & Text
      case 'yandex_maps':
        icon = <YandexPinIcon className="w-8 h-8 sm:w-9 sm:h-9" />;
        gradientClass = 'bg-gradient-to-r from-[#FFFFFF] via-[#F4F5F7] to-[#E5E7EB]';
        borderClass = 'border border-white/90';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(255,255,255,0.35)]';
        isYandex = true;
        break;

      // 6. 2GIS - Dark Forest to Mint Green
      case '2gis':
        icon = <TwoGisBadgeIcon className="w-9 h-9 sm:w-10 sm:h-10" />;
        gradientClass = 'bg-gradient-to-r from-[#09351e] via-[#0e5c33] to-[#072414]';
        borderClass = 'border border-[#00e676]/45';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(0,230,118,0.4)]';
        break;

      // 7. Vebsayt (Website) - Electric Royal Blue
      case 'website':
        icon = <WebsiteGlobeIcon className="w-8 h-8 sm:w-9 sm:h-9" />;
        gradientClass = 'bg-gradient-to-r from-[#003882] via-[#0055b3] to-[#002255]';
        borderClass = 'border border-[#00b0ff]/45';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(0,85,179,0.45)]';
        break;

      // 8. YouTube - Deep Ruby Crimson Red
      case 'youtube':
        icon = <YouTubeBadgeIcon className="w-9 h-9 sm:w-10 sm:h-10" />;
        gradientClass = 'bg-gradient-to-r from-[#590000] via-[#8a0000] to-[#330000]';
        borderClass = 'border border-[#ff1744]/45';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(255,0,0,0.45)]';
        break;

      // 9. TikTok - Midnight Black with Cyan/Pink Edge
      case 'tiktok':
        icon = <TikTokNeonIcon className="w-7 h-7 sm:w-8 sm:h-8" />;
        gradientClass = 'bg-gradient-to-r from-[#110a18] via-[#0f1019] to-[#0a1216]';
        borderClass = 'border border-[#00f2fe]/35';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(0,242,254,0.3)]';
        break;

      // 10. Facebook - Royal Cobalt Blue
      case 'facebook':
        icon = <FacebookCircleIcon className="w-9 h-9 sm:w-10 sm:h-10" />;
        gradientClass = 'bg-gradient-to-r from-[#002e70] via-[#0047a8] to-[#001c44]';
        borderClass = 'border border-[#2979ff]/45';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(24,119,242,0.45)]';
        break;

      // 11. Boshqa / Custom - Cosmic Ultraviolet
      case 'custom':
      default:
        icon = <ChainLinkIcon className="w-8 h-8 sm:w-9 sm:h-9" />;
        gradientClass = 'bg-gradient-to-r from-[#2a0e4a] via-[#451478] to-[#19082e]';
        borderClass = 'border border-[#d500f9]/45';
        shadowClass = 'hover:shadow-[0_8px_30px_rgba(213,0,249,0.35)]';
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

    const titleColorClass = isYandex ? 'text-[#18181B]' : 'text-white';
    const subtitleColorClass = isYandex ? 'text-[#555]' : 'text-white/80';

    return (
      <a
        key={btn.id}
        href={href}
        target={isPhone ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className={`group relative w-full overflow-hidden rounded-[22px] ${gradientClass} ${borderClass} p-3 sm:p-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${shadowClass} flex items-center justify-between cursor-pointer before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/15 before:via-white/5 before:to-transparent before:pointer-events-none`}
      >
        {/* Left: Brand Icon */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 relative z-10 group-hover:scale-105 transition-transform">
          {icon}
        </div>

        {/* Center: Title & Optional Subtitle */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 min-w-0 relative z-10">
          <span className={`text-sm sm:text-base font-bold tracking-wide ${titleColorClass} truncate w-full drop-shadow-sm`}>
            {isYandex ? (
              <span>
                <span className="text-[#E61414] font-black">Y</span>
                {btn.title.startsWith('Y') || btn.title.startsWith('y') ? btn.title.slice(1) : btn.title}
              </span>
            ) : (
              btn.title
            )}
          </span>
          {btn.subtitle && btn.subtitle.trim() !== '' && (
            <span className={`text-[11px] sm:text-xs font-medium truncate w-full mt-0.5 ${subtitleColorClass}`}>
              {btn.subtitle}
            </span>
          )}
        </div>

        {/* Right: Invisible Spacer to keep text mathematically centered */}
        <div className="w-10 sm:w-11 shrink-0 pointer-events-none" />
      </a>
    );
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-between py-6 px-4 sm:px-6 relative overflow-x-hidden ${
        isDark
          ? 'bg-[#090a10] text-white selection:bg-white/20 selection:text-white'
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
              ? 'bg-[#151622]/80 border-white/10 text-white/80 hover:text-white hover:bg-white/10'
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

      {/* Main Glassmorphic Card Container */}
      <div
        className={`w-full max-w-[440px] rounded-[38px] p-6 sm:p-7 border transition-all duration-500 shadow-2xl relative z-10 flex flex-col items-center text-center my-auto ${
          isDark
            ? 'bg-[#161722]/90 backdrop-blur-xl border-white/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]'
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

        {/* Dynamic Buttons List with Authentic 3D Glass Colors */}
        <div className="w-full space-y-3 sm:space-y-3.5 mt-6">
          {allButtons.length === 0 ? (
            <div
              className={`p-5 rounded-[20px] text-xs font-medium border ${
                isDark ? 'bg-[#10111a] border-white/10 text-[#A1A1AA]' : 'bg-gray-50 border-black/10 text-[#71717A]'
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
              ? 'bg-[#161722]/90 backdrop-blur-md border-white/10 text-[#C4C4D0] hover:text-white hover:bg-[#202130]'
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
