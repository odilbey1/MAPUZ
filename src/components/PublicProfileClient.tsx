'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Business, BusinessLink } from '@/lib/types';
import { Phone, MapPin, ExternalLink, Globe, Sun, Moon } from 'lucide-react';
import {
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
  TiktokIcon,
  FacebookIcon,
  YandexMapsIcon
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
    let iconBg = 'bg-gradient-to-br from-indigo-500 to-purple-600';
    let borderColor = theme === 'dark' ? 'hover:border-indigo-500/60' : 'hover:border-indigo-500/80';
    let shadowColor = 'hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]';
    let titleHover = 'group-hover:text-indigo-500';

    switch (btn.type) {
      case 'telegram':
        icon = <TelegramIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        iconBg = 'bg-gradient-to-br from-[#0088cc] via-[#0077b5] to-[#004466]';
        borderColor = 'hover:border-[#0088cc]/60';
        shadowColor = 'hover:shadow-[0_0_25px_rgba(0,136,204,0.3)]';
        titleHover = 'group-hover:text-[#0088cc]';
        break;
      case 'instagram':
        icon = <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        iconBg = 'bg-gradient-to-tr from-[#FFB800] via-[#FF0169] to-[#D300C5]';
        borderColor = 'hover:border-[#E1306C]/60';
        shadowColor = 'hover:shadow-[0_0_25px_rgba(225,48,108,0.3)]';
        titleHover = 'group-hover:text-[#E1306C]';
        break;
      case 'phone':
        icon = <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A0A0A]" />;
        iconBg = 'bg-gradient-to-br from-[#B7FF00] to-[#80CC00]';
        borderColor = 'hover:border-[#B7FF00]/60';
        shadowColor = 'hover:shadow-[0_0_25px_rgba(183,255,0,0.3)]';
        titleHover = theme === 'dark' ? 'group-hover:text-[#B7FF00]' : 'group-hover:text-lime-600';
        break;
      case 'google_maps':
        icon = <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />;
        iconBg = 'bg-gradient-to-br from-[#EA4335] via-[#D93025] to-[#B31412]';
        borderColor = 'hover:border-[#EA4335]/60';
        shadowColor = 'hover:shadow-[0_0_25px_rgba(234,67,53,0.3)]';
        titleHover = 'group-hover:text-[#EA4335]';
        break;
      case 'yandex_maps':
        icon = <YandexMapsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
        iconBg = 'bg-gradient-to-br from-[#fc3f1d] to-[#cc0000]';
        borderColor = 'hover:border-[#fc3f1d]/60';
        shadowColor = 'hover:shadow-[0_0_25px_rgba(252,63,29,0.3)]';
        titleHover = 'group-hover:text-[#fc3f1d]';
        break;
      case 'youtube':
        icon = <YoutubeIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        iconBg = 'bg-gradient-to-br from-[#FF0000] to-[#990000]';
        borderColor = 'hover:border-[#FF0000]/60';
        shadowColor = 'hover:shadow-[0_0_25px_rgba(255,0,0,0.3)]';
        titleHover = 'group-hover:text-[#FF0000]';
        break;
      case 'tiktok':
        icon = <TiktokIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        iconBg = 'bg-gradient-to-br from-[#00F2FE] to-[#4FACFE]';
        borderColor = 'hover:border-[#00F2FE]/60';
        shadowColor = 'hover:shadow-[0_0_25px_rgba(0,242,254,0.3)]';
        titleHover = 'group-hover:text-[#00F2FE]';
        break;
      case 'facebook':
        icon = <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
        iconBg = 'bg-gradient-to-br from-[#1877F2] to-[#0D47A1]';
        borderColor = 'hover:border-[#1877F2]/60';
        shadowColor = 'hover:shadow-[0_0_25px_rgba(24,119,242,0.3)]';
        titleHover = 'group-hover:text-[#1877F2]';
        break;
      case 'website':
      case 'custom':
      default:
        icon = <Globe className="w-5 h-5 sm:w-6 sm:h-6" />;
        iconBg = 'bg-gradient-to-br from-emerald-500 to-teal-700';
        borderColor = 'hover:border-emerald-500/60';
        shadowColor = 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]';
        titleHover = 'group-hover:text-emerald-500';
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

    const cardBg = theme === 'dark'
      ? 'bg-[#151515] border-white/10 text-white'
      : 'bg-white border-black/10 text-[#18181B] shadow-md hover:shadow-xl';

    const subtitleText = theme === 'dark' ? 'text-[#A1A1AA]' : 'text-[#71717A]';

    return (
      <a
        key={btn.id}
        href={href}
        target={isPhone ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className={`group relative w-full overflow-hidden rounded-[20px] ${cardBg} p-3 sm:p-3.5 border ${borderColor} transition-all duration-300 ${shadowColor} hover:-translate-y-0.5 flex items-center justify-between cursor-pointer`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Creative 3D Glassmorphic Icon Container */}
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] ${iconBg} flex items-center justify-center text-white shadow-md relative overflow-hidden group-hover:scale-105 transition-transform shrink-0 border border-white/20 before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/30 before:via-transparent before:to-transparent`}>
            <div className="relative z-10">{icon}</div>
          </div>

          <div className="flex flex-col text-left min-w-0">
            <span className={`text-sm sm:text-base font-extrabold ${titleHover} transition-colors truncate tracking-tight`}>
              {btn.title}
            </span>
            {btn.subtitle && btn.subtitle.trim() !== '' && !btn.subtitle.includes('+998 90 123 45 67') && (
              <span className={`text-[11px] sm:text-xs ${subtitleText} truncate font-medium`}>
                {btn.subtitle}
              </span>
            )}
          </div>
        </div>

        {isPhone ? (
          <Phone className={`w-4 h-4 sm:w-5 sm:h-5 ${theme === 'dark' ? 'text-[#B7FF00]' : 'text-lime-600'} group-hover:scale-110 transition-transform mr-1.5 shrink-0`} />
        ) : (
          <ExternalLink className={`w-4 h-4 sm:w-5 sm:h-5 ${theme === 'dark' ? 'text-[#A1A1AA] group-hover:text-white' : 'text-[#71717A] group-hover:text-black'} group-hover:translate-x-0.5 transition-all mr-1.5 shrink-0`} />
        )}
      </a>
    );
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-between p-4 sm:p-5 relative overflow-x-hidden ${
        isDark ? 'bg-[#0A0A0A] text-white selection:bg-[#B7FF00] selection:text-[#0A0A0A]' : 'bg-[#F4F4F6] text-[#18181B] selection:bg-black selection:text-white'
      }`}
    >
      {/* Ambient Neon Glow */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-[#B7FF00]/10' : 'bg-lime-400/20'
        }`}
      />

      {/* Floating Theme Switcher: Kunduzgi (☀️) / Kechki (🌙) */}
      <div className="w-full max-w-md flex justify-end pt-2 px-2 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 active:scale-95 shadow-md ${
            isDark
              ? 'bg-[#151515] border-white/15 text-white hover:bg-white/10'
              : 'bg-white border-black/10 text-black hover:bg-black/5'
          }`}
          title="Mavzuni o'zgartirish (Kunduzgi / Kechki)"
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-[#B7FF00]" />
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

      {/* Main Center Content Container - Positioned closer to top with tight gaps */}
      <div className="w-full max-w-md pt-2 pb-4 flex flex-col items-center text-center relative z-10 my-auto">
        {/* Business Logo with Dynamic Ambient Glow */}
        <div className="relative mb-3 group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#B7FF00] via-[#80CC00] to-[#B7FF00] rounded-[24px] blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
          <img
            src={business.logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop'}
            alt={business.business_name}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] object-cover border-2 border-[#B7FF00]/70 shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
          />
        </div>

        {/* Business Name */}
        <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center justify-center gap-2">
          {business.business_name}
        </h1>

        {/* Description */}
        {business.description && (
          <p
            className={`mt-2 text-xs sm:text-sm max-w-xs sm:max-w-sm leading-relaxed ${
              isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'
            }`}
          >
            {business.description}
          </p>
        )}

        {/* Dynamic Buttons List with Tight Spacing */}
        <div className="w-full space-y-2.5 mt-5">
          {allButtons.length === 0 ? (
            <div
              className={`p-5 rounded-[20px] text-xs font-medium border ${
                isDark ? 'bg-[#151515] border-white/10 text-[#A1A1AA]' : 'bg-white border-black/10 text-[#71717A]'
              }`}
            >
              Hozircha hech qanday havola qo'shilmagan.
            </div>
          ) : (
            allButtons.map((btn) => renderLinkButton(btn))
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <footer className="py-4 z-10">
        <Link
          href="/"
          className={`text-[11px] uppercase tracking-widest transition-colors flex items-center gap-1.5 font-mono ${
            isDark ? 'text-[#A1A1AA] hover:text-[#B7FF00]' : 'text-[#71717A] hover:text-black'
          }`}
        >
          <span>Powered by</span>
          <strong
            className={`px-2 py-0.5 rounded-[8px] border font-bold ${
              isDark ? 'text-white bg-[#151515] border-white/10' : 'text-black bg-white border-black/10 shadow-sm'
            }`}
          >
            MAPUZ
          </strong>
        </Link>
      </footer>
    </div>
  );
}
