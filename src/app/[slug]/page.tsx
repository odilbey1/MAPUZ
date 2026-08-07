import React from 'react';
import Link from 'next/link';
import { businessStore } from '@/lib/store';
import { BusinessLink } from '@/lib/types';
import { Phone, MapPin, Sparkles, ExternalLink, Globe } from 'lucide-react';
import {
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
  TiktokIcon,
  FacebookIcon
} from '@/components/Icons';

interface PublicPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0; // Ensure fresh profiles on every request

export default async function PublicBusinessPage({ params }: PublicPageProps) {
  const resolvedParams = await params;
  const business = await businessStore.getBySlug(resolvedParams.slug);

  if (!business) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 rounded-[22px] bg-[#151515] border border-white/10 flex items-center justify-center text-[#B7FF00] mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Profil topilmadi</h1>
        <p className="text-sm text-[#A1A1AA] max-w-sm mb-6">
          Siz qidirgan "<strong>{resolvedParams.slug}</strong>" nomli biznes sahifasi mavjud emas yoki o'chirilgan.
        </p>
        <Link
          href="/"
          className="bg-[#B7FF00] text-[#0A0A0A] px-6 py-3 rounded-[22px] font-bold text-sm hover:bg-[#a3e600] transition-colors"
        >
          MAPUZ Bosh sahifasi
        </Link>
      </div>
    );
  }

  // Combine dynamic links array or reconstruct from primary fields
  let allButtons: BusinessLink[] = [];

  if (business.links && Array.isArray(business.links) && business.links.length > 0) {
    allButtons = business.links.filter((l) => l.url && l.url.trim() !== '');
  } else {
    // Fallback reconstruction if links array was not populated yet
    if (business.telegram) {
      allButtons.push({
        id: 'primary_telegram',
        title: 'Telegram',
        type: 'telegram',
        url: business.telegram,
        subtitle: 'Rasmiy kanalimizga o\'tish',
      });
    }

    if (business.instagram) {
      allButtons.push({
        id: 'primary_instagram',
        title: 'Instagram',
        type: 'instagram',
        url: business.instagram,
        subtitle: 'Sahifamizni kuzatib boring',
      });
    }

    if (business.phone) {
      allButtons.push({
        id: 'primary_phone',
        title: 'Telefon',
        type: 'phone',
        url: `tel:${business.phone}`,
        subtitle: business.phone,
      });
    }

    if (business.google_maps) {
      allButtons.push({
        id: 'primary_google_maps',
        title: 'Joylashuv',
        type: 'google_maps',
        url: business.google_maps,
        subtitle: 'Google Maps xaritasidan ochish',
      });
    }
  }

  // Render appropriate Icon & Style based on link type
  const renderLinkButton = (btn: BusinessLink) => {
    let icon = <Globe className="w-7 h-7" />;
    let iconBg = 'bg-gradient-to-br from-indigo-500 to-purple-600';
    let borderColor = 'hover:border-indigo-500/60';
    let shadowColor = 'hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]';
    let titleHover = 'group-hover:text-indigo-400';

    switch (btn.type) {
      case 'telegram':
        icon = <TelegramIcon className="w-7 h-7" />;
        iconBg = 'bg-gradient-to-br from-[#0088cc] to-[#005580]';
        borderColor = 'hover:border-[#0088cc]/60';
        shadowColor = 'hover:shadow-[0_0_30px_rgba(0,136,204,0.3)]';
        titleHover = 'group-hover:text-[#0088cc]';
        break;
      case 'instagram':
        icon = <InstagramIcon className="w-7 h-7" />;
        iconBg = 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]';
        borderColor = 'hover:border-[#E1306C]/60';
        shadowColor = 'hover:shadow-[0_0_30px_rgba(225,48,108,0.3)]';
        titleHover = 'group-hover:text-[#E1306C]';
        break;
      case 'phone':
        icon = <Phone className="w-7 h-7 text-[#0A0A0A]" />;
        iconBg = 'bg-gradient-to-br from-[#B7FF00] to-[#80CC00]';
        borderColor = 'hover:border-[#B7FF00]/60';
        shadowColor = 'hover:shadow-[0_0_30px_rgba(183,255,0,0.3)]';
        titleHover = 'group-hover:text-[#B7FF00]';
        break;
      case 'google_maps':
        icon = <MapPin className="w-7 h-7" />;
        iconBg = 'bg-gradient-to-br from-[#EA4335] to-[#B31412]';
        borderColor = 'hover:border-[#EA4335]/60';
        shadowColor = 'hover:shadow-[0_0_30px_rgba(234,67,53,0.3)]';
        titleHover = 'group-hover:text-[#EA4335]';
        break;
      case 'youtube':
        icon = <YoutubeIcon className="w-7 h-7" />;
        iconBg = 'bg-gradient-to-br from-[#FF0000] to-[#990000]';
        borderColor = 'hover:border-[#FF0000]/60';
        shadowColor = 'hover:shadow-[0_0_30px_rgba(255,0,0,0.3)]';
        titleHover = 'group-hover:text-[#FF0000]';
        break;
      case 'tiktok':
        icon = <TiktokIcon className="w-7 h-7" />;
        iconBg = 'bg-gradient-to-br from-[#00F2FE] to-[#4FACFE]';
        borderColor = 'hover:border-[#00F2FE]/60';
        shadowColor = 'hover:shadow-[0_0_30px_rgba(0,242,254,0.3)]';
        titleHover = 'group-hover:text-[#00F2FE]';
        break;
      case 'facebook':
        icon = <FacebookIcon className="w-7 h-7" />;
        iconBg = 'bg-gradient-to-br from-[#1877F2] to-[#0D47A1]';
        borderColor = 'hover:border-[#1877F2]/60';
        shadowColor = 'hover:shadow-[0_0_30px_rgba(24,119,242,0.3)]';
        titleHover = 'group-hover:text-[#1877F2]';
        break;
      case 'website':
      case 'custom':
      default:
        icon = <Globe className="w-7 h-7" />;
        iconBg = 'bg-gradient-to-br from-emerald-500 to-teal-700';
        borderColor = 'hover:border-emerald-500/60';
        shadowColor = 'hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]';
        titleHover = 'group-hover:text-emerald-400';
        break;
    }

    const href = btn.url.startsWith('http') || btn.url.startsWith('tel:') ? btn.url : `https://${btn.url}`;

    return (
      <a
        key={btn.id}
        href={href}
        target={btn.url.startsWith('tel:') ? '_self' : '_blank'}
        rel="noopener noreferrer"
        className={`group relative w-full overflow-hidden rounded-[22px] bg-[#151515] p-4 border border-white/10 ${borderColor} transition-all duration-300 ${shadowColor} hover:-translate-y-0.5 flex items-center justify-between cursor-pointer`}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-14 h-14 rounded-[18px] ${iconBg} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
            {icon}
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className={`text-base sm:text-lg font-bold text-white ${titleHover} transition-colors truncate`}>
              {btn.title}
            </span>
            {btn.subtitle && (
              <span className="text-xs text-[#A1A1AA] truncate">
                {btn.subtitle}
              </span>
            )}
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-[#A1A1AA] group-hover:text-white group-hover:translate-x-0.5 transition-all mr-2 shrink-0" />
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-x-hidden selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      {/* Background Ambient Neon Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#B7FF00]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md my-auto pt-8 pb-6 flex flex-col items-center text-center relative z-10">
        {/* Business Logo with Gradient Glow */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#B7FF00] via-[#80CC00] to-[#B7FF00] rounded-[26px] blur-md opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
          <img
            src={business.logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop'}
            alt={business.business_name}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[22px] object-cover border-2 border-[#B7FF00]/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Business Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
          {business.business_name}
        </h1>

        {/* Description */}
        {business.description && (
          <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] max-w-xs sm:max-w-sm leading-relaxed">
            {business.description}
          </p>
        )}

        {/* Dynamic Buttons List */}
        <div className="w-full space-y-4 mt-8">
          {allButtons.length === 0 ? (
            <div className="p-6 rounded-[22px] bg-[#151515] border border-white/10 text-xs text-[#A1A1AA]">
              Hozircha hech qanday havola qo'shilmagan.
            </div>
          ) : (
            allButtons.map((btn) => renderLinkButton(btn))
          )}
        </div>
      </div>

      {/* Bottom Footer Text */}
      <footer className="py-6 z-10">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-[#A1A1AA] hover:text-[#B7FF00] transition-colors flex items-center gap-1.5 font-mono"
        >
          <span>Powered by</span>
          <strong className="text-white bg-[#151515] px-2 py-0.5 rounded-[8px] border border-white/10">
            MAPUZ
          </strong>
        </Link>
      </footer>
    </div>
  );
}
