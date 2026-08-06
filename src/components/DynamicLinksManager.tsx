'use client';

import React from 'react';
import { BusinessLink, LinkType } from '@/lib/types';
import {
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Send,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import {
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
  TiktokIcon,
  FacebookIcon
} from './Icons';

interface DynamicLinksManagerProps {
  links: BusinessLink[];
  onChange: (links: BusinessLink[]) => void;
}

const LINK_TYPE_OPTIONS: { type: LinkType; label: string }[] = [
  { type: 'telegram', label: 'Telegram' },
  { type: 'instagram', label: 'Instagram' },
  { type: 'phone', label: 'Telefon' },
  { type: 'google_maps', label: 'Joylashuv (Google Maps)' },
  { type: 'website', label: 'Vebsayt' },
  { type: 'youtube', label: 'YouTube' },
  { type: 'tiktok', label: 'TikTok' },
  { type: 'facebook', label: 'Facebook' },
  { type: 'custom', label: 'Boshqa Havola' },
];

export default function DynamicLinksManager({
  links = [],
  onChange,
}: DynamicLinksManagerProps) {
  // Add a new link of specified type
  const handleAddButton = (type: LinkType) => {
    const existingCount = links.filter((l) => l.type === type).length;

    let defaultTitle = 'Telegram';
    let defaultSubtitle = 'Rasmiy kanalimizga o\'tish';
    let defaultUrl = 'https://t.me/';

    switch (type) {
      case 'telegram':
        defaultTitle = existingCount === 0 ? 'Telegram' : `Telegram ${existingCount + 1}`;
        defaultSubtitle = 'Rasmiy kanalimizga o\'tish';
        defaultUrl = 'https://t.me/';
        break;
      case 'instagram':
        defaultTitle = existingCount === 0 ? 'Instagram' : `Instagram ${existingCount + 1}`;
        defaultSubtitle = 'Sahifamizni kuzatib boring';
        defaultUrl = 'https://instagram.com/';
        break;
      case 'phone':
        defaultTitle = existingCount === 0 ? 'Telefon' : `Telefon ${existingCount + 1}`;
        defaultSubtitle = '+998 90 123 45 67';
        defaultUrl = '+998901234567';
        break;
      case 'google_maps':
        defaultTitle = existingCount === 0 ? 'Joylashuv' : `Joylashuv ${existingCount + 1}`;
        defaultSubtitle = 'Google Maps xaritasidan ochish';
        defaultUrl = 'https://maps.google.com/?q=';
        break;
      case 'youtube':
        defaultTitle = existingCount === 0 ? 'YouTube' : `YouTube ${existingCount + 1}`;
        defaultSubtitle = 'Kanlimizga a\'zo bo\'ling';
        defaultUrl = 'https://youtube.com/';
        break;
      case 'tiktok':
        defaultTitle = existingCount === 0 ? 'TikTok' : `TikTok ${existingCount + 1}`;
        defaultSubtitle = 'Videolarimizni tomosha qiling';
        defaultUrl = 'https://tiktok.com/';
        break;
      case 'facebook':
        defaultTitle = existingCount === 0 ? 'Facebook' : `Facebook ${existingCount + 1}`;
        defaultSubtitle = 'Facebook sahifamiz';
        defaultUrl = 'https://facebook.com/';
        break;
      case 'website':
      case 'custom':
      default:
        defaultTitle = existingCount === 0 ? 'Vebsayt' : `Vebsayt ${existingCount + 1}`;
        defaultSubtitle = 'Rasmiy saytimizga o\'tish';
        defaultUrl = 'https://';
        break;
    }

    const newLink: BusinessLink = {
      id: `btn_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      title: defaultTitle,
      type: type,
      url: defaultUrl,
      subtitle: defaultSubtitle,
    };

    onChange([...links, newLink]);
  };

  const handleRemoveButton = (id: string) => {
    onChange(links.filter((l) => l.id !== id));
  };

  const handleUpdate = (id: string, key: keyof BusinessLink, value: string) => {
    onChange(
      links.map((l) => (l.id === id ? { ...l, [key]: value } : l))
    );
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...links];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newLinks.length) return;

    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;
    onChange(newLinks);
  };

  const renderTypeIcon = (type: LinkType) => {
    switch (type) {
      case 'telegram':
        return <TelegramIcon className="w-4 h-4 text-[#0088cc]" />;
      case 'instagram':
        return <InstagramIcon className="w-4 h-4 text-[#E1306C]" />;
      case 'phone':
        return <Phone className="w-4 h-4 text-[#B7FF00]" />;
      case 'google_maps':
        return <MapPin className="w-4 h-4 text-[#EA4335]" />;
      case 'youtube':
        return <YoutubeIcon className="w-4 h-4 text-red-500" />;
      case 'tiktok':
        return <TiktokIcon className="w-4 h-4 text-cyan-400" />;
      case 'facebook':
        return <FacebookIcon className="w-4 h-4 text-blue-500" />;
      default:
        return <Globe className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="pt-6 border-t border-white/10 space-y-6">
      <div>
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-[#A1A1AA]">
          TUGMALAR & HAVOLALAR BOSHQARUVI (CHEKSIZ QO'SHISH & KAMAYTIRISH)
        </h3>
        <p className="text-xs text-[#A1A1AA] mt-1">
          Profilingizda aks etadigan barcha tugmalarni qo'shing, o'chiring yoki tartiblang.
        </p>
      </div>

      {/* Quick Add Buttons Bar */}
      <div className="p-4 rounded-[20px] bg-[#0A0A0A] border border-white/10 space-y-3">
        <span className="block text-xs font-bold text-white uppercase tracking-wider">
          Yangi Tugma Qo'shish:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleAddButton('telegram')}
            className="flex items-center gap-1.5 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 text-[#0088cc] px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Telegram</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddButton('instagram')}
            className="flex items-center gap-1.5 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/30 text-[#E1306C] px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Instagram</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddButton('phone')}
            className="flex items-center gap-1.5 bg-[#B7FF00]/10 hover:bg-[#B7FF00]/20 border border-[#B7FF00]/30 text-[#B7FF00] px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Telefon</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddButton('google_maps')}
            className="flex items-center gap-1.5 bg-[#EA4335]/10 hover:bg-[#EA4335]/20 border border-[#EA4335]/30 text-[#EA4335] px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Joylashuv (Maps)</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddButton('website')}
            className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Vebsayt / Boshqa</span>
          </button>
        </div>
      </div>

      {/* List of Active Buttons */}
      {links.length === 0 ? (
        <div className="p-8 rounded-[22px] bg-[#0A0A0A] border border-white/10 text-center space-y-2">
          <p className="text-sm font-bold text-white">Hozircha hech qanday tugma qo'shilmagan</p>
          <p className="text-xs text-[#A1A1AA]">
            Yuqoridagi "+ Telegram", "+ Instagram", "+ Telefon" kabi tugmalarni bosib, profilingiz uchun tugmalar qo'shing.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
            <span>Jami tugmalar soni: <strong className="text-white">{links.length}</strong> ta</span>
            <span>Tartibni o'zgartirish uchun ⬆ ⬇ tugmalardan foydalaning</span>
          </div>

          {links.map((btn, index) => (
            <div
              key={btn.id}
              className="p-4 rounded-[20px] bg-[#0A0A0A] border border-white/10 space-y-3 relative transition-all hover:border-white/20"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-[8px] bg-[#151515] border border-white/10">
                    {renderTypeIcon(btn.type)}
                  </div>
                  <span className="text-xs font-extrabold text-white">
                    Tugma #{index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1.5 rounded-[8px] bg-[#151515] hover:bg-white/10 text-[#A1A1AA] disabled:opacity-20"
                    title="Yuqoriga surish"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={index === links.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1.5 rounded-[8px] bg-[#151515] hover:bg-white/10 text-[#A1A1AA] disabled:opacity-20"
                    title="Pastga surish"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveButton(btn.id)}
                    className="p-1.5 rounded-[8px] bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors ml-2"
                    title="Ushbu tugmani o'chirish (kamaytirish)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Type Selection */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] uppercase font-bold text-[#A1A1AA] mb-1">
                    Tugma Turi
                  </label>
                  <select
                    value={btn.type}
                    onChange={(e) => handleUpdate(btn.id, 'type', e.target.value as LinkType)}
                    className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] rounded-[12px] px-3 py-2 text-white text-xs outline-none"
                  >
                    {LINK_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.type} value={opt.type}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] uppercase font-bold text-[#A1A1AA] mb-1">
                    Tugma Nomi
                  </label>
                  <input
                    type="text"
                    value={btn.title}
                    onChange={(e) => handleUpdate(btn.id, 'title', e.target.value)}
                    placeholder="Masalan: Telegram Asosiy Kanal"
                    className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] rounded-[12px] px-3 py-2 text-white text-xs font-bold outline-none"
                  />
                </div>

                {/* Subtitle */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] uppercase font-bold text-[#A1A1AA] mb-1">
                    Izoh / Subtitle
                  </label>
                  <input
                    type="text"
                    value={btn.subtitle || ''}
                    onChange={(e) => handleUpdate(btn.id, 'subtitle', e.target.value)}
                    placeholder="Masalan: Rasmiy kanalimizga o'tish"
                    className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] rounded-[12px] px-3 py-2 text-white text-xs outline-none"
                  />
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#A1A1AA] mb-1">
                  Havola / Manzil (URL)
                </label>
                <input
                  type="text"
                  value={btn.url}
                  onChange={(e) => handleUpdate(btn.id, 'url', e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] rounded-[12px] px-3 py-2 text-white text-xs font-mono outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
