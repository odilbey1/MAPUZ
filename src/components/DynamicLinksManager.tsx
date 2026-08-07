'use client';

import React, { useState } from 'react';
import { BusinessLink, LinkType } from '@/lib/types';
import {
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Globe,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Link as LinkIcon
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

const LINK_TYPE_OPTIONS: { type: LinkType; label: string; icon: React.ReactNode; color: string }[] = [
  { type: 'telegram', label: 'Telegram', icon: <TelegramIcon className="w-4 h-4 text-[#0088cc]" />, color: '#0088cc' },
  { type: 'instagram', label: 'Instagram', icon: <InstagramIcon className="w-4 h-4 text-[#E1306C]" />, color: '#E1306C' },
  { type: 'phone', label: 'Telefon', icon: <Phone className="w-4 h-4 text-[#B7FF00]" />, color: '#B7FF00' },
  { type: 'google_maps', label: 'Joylashuv (Maps)', icon: <MapPin className="w-4 h-4 text-[#EA4335]" />, color: '#EA4335' },
  { type: 'website', label: 'Vebsayt', icon: <Globe className="w-4 h-4 text-emerald-400" />, color: '#10b981' },
  { type: 'youtube', label: 'YouTube', icon: <YoutubeIcon className="w-4 h-4 text-red-500" />, color: '#ef4444' },
  { type: 'tiktok', label: 'TikTok', icon: <TiktokIcon className="w-4 h-4 text-cyan-400" />, color: '#06b6d4' },
  { type: 'facebook', label: 'Facebook', icon: <FacebookIcon className="w-4 h-4 text-blue-500" />, color: '#3b82f6' },
  { type: 'custom', label: 'Boshqa', icon: <LinkIcon className="w-4 h-4 text-purple-400" />, color: '#a855f7' },
];

export default function DynamicLinksManager({
  links = [],
  onChange,
}: DynamicLinksManagerProps) {
  // Track expanded extra options per item ID
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Add a new link of specified type
  const handleAddButton = (type: LinkType) => {
    const existingCount = links.filter((l) => l.type === type).length;

    let defaultTitle = 'Telegram';
    let defaultSubtitle = 'Telegram orqali bog\'lanish';
    let defaultUrl = 'https://t.me/';

    switch (type) {
      case 'telegram':
        defaultTitle = existingCount === 0 ? 'Telegram' : `Telegram ${existingCount + 1}`;
        defaultSubtitle = 'Telegram orqali bog\'lanish';
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
        defaultUrl = 'https://maps.google.com/';
        break;
      case 'youtube':
        defaultTitle = existingCount === 0 ? 'YouTube' : `YouTube ${existingCount + 1}`;
        defaultSubtitle = 'Kanalimizga a\'zo bo\'ling';
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

  // Smart URL formatter on blur or change
  const handleSmartUrlBlur = (id: string, type: LinkType, rawValue: string) => {
    let val = rawValue.trim();
    if (!val) return;

    if (type === 'telegram') {
      if (val.startsWith('@')) {
        val = `https://t.me/${val.replace('@', '')}`;
      } else if (!val.startsWith('http') && !val.startsWith('t.me/')) {
        val = `https://t.me/${val}`;
      } else if (val.startsWith('t.me/')) {
        val = `https://${val}`;
      }
    } else if (type === 'instagram') {
      if (val.startsWith('@')) {
        val = `https://instagram.com/${val.replace('@', '')}`;
      } else if (!val.startsWith('http') && !val.startsWith('instagram.com/')) {
        val = `https://instagram.com/${val}`;
      } else if (val.startsWith('instagram.com/')) {
        val = `https://${val}`;
      }
    } else if (type === 'phone') {
      if (!val.startsWith('+') && !val.startsWith('tel:')) {
        const cleaned = val.replace(/\D/g, '');
        if (cleaned.length === 9) {
          val = `+998${cleaned}`;
        } else if (cleaned.length === 12) {
          val = `+${cleaned}`;
        }
      }
    } else if (type === 'website' || type === 'youtube' || type === 'tiktok' || type === 'facebook') {
      if (!val.startsWith('http://') && !val.startsWith('https://')) {
        val = `https://${val}`;
      }
    }

    handleUpdate(id, 'url', val);
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

  const getLinkMeta = (type: LinkType) => {
    return LINK_TYPE_OPTIONS.find((o) => o.type === type) || LINK_TYPE_OPTIONS[0];
  };

  return (
    <div className="pt-6 border-t border-white/10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-[#A1A1AA] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B7FF00]" />
            <span>PROFIL TUGMALARI & HAVOLALAR</span>
          </h3>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Bitta bosing va kerakli ijtimoiy tarmoq tugmasini ko'paytiring yoki kamaytiring.
          </p>
        </div>
        {links.length > 0 && (
          <span className="text-xs font-mono font-bold bg-[#0A0A0A] border border-white/10 px-3 py-1.5 rounded-full text-[#B7FF00]">
            {links.length} ta tugma
          </span>
        )}
      </div>

      {/* Preset Quick Buttons Grid */}
      <div className="p-4 rounded-[22px] bg-[#0A0A0A] border border-white/10 space-y-3">
        <span className="block text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-wider">
          + Yangi Tugma Qo'shish:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LINK_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.type}
              type="button"
              onClick={() => handleAddButton(opt.type)}
              className="flex items-center gap-2 bg-[#151515] hover:bg-white/10 border border-white/10 hover:border-white/20 p-2.5 rounded-[14px] text-xs font-bold text-white transition-all duration-200 active:scale-95 text-left group"
            >
              <div className="p-1 rounded-[8px] bg-[#0A0A0A] border border-white/5 shrink-0 group-hover:scale-110 transition-transform">
                {opt.icon}
              </div>
              <span className="truncate">+ {opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* List of Link Cards */}
      {links.length === 0 ? (
        <div className="p-8 rounded-[22px] bg-[#0A0A0A] border border-dashed border-white/15 text-center space-y-2">
          <p className="text-sm font-bold text-white">Hozircha tugma qo'shilmadi</p>
          <p className="text-xs text-[#A1A1AA]">
            Yuqoridagi "+ Telegram", "+ Instagram", "+ Telefon" kabi tugmalardan birini bosing.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((btn, index) => {
            const meta = getLinkMeta(btn.type);
            const isExpanded = expandedIds[btn.id] || false;

            return (
              <div
                key={btn.id}
                className="p-4 rounded-[20px] bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-all duration-200 space-y-3 relative group"
                style={{ borderLeftColor: meta.color, borderLeftWidth: '4px' }}
              >
                {/* Top Row: Icon, Title Input, Move/Delete Controls */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="p-2 rounded-[12px] bg-[#151515] border border-white/10 shrink-0">
                      {meta.icon}
                    </div>

                    {/* Title Input */}
                    <input
                      type="text"
                      value={btn.title}
                      onChange={(e) => handleUpdate(btn.id, 'title', e.target.value)}
                      placeholder="Tugma nomi"
                      className="bg-transparent text-white font-extrabold text-sm border-b border-transparent hover:border-white/20 focus:border-[#B7FF00] outline-none px-1 py-0.5 w-full max-w-[180px] sm:max-w-[220px] transition-colors"
                    />

                    {/* Type Select Pill */}
                    <select
                      value={btn.type}
                      onChange={(e) => handleUpdate(btn.id, 'type', e.target.value as LinkType)}
                      className="bg-[#151515] border border-white/10 text-[#A1A1AA] text-[11px] rounded-[10px] px-2 py-1 outline-none hidden sm:block font-medium cursor-pointer"
                    >
                      {LINK_TYPE_OPTIONS.map((o) => (
                        <option key={o.type} value={o.type}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Right Actions: Reorder, Expand, Delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-1.5 rounded-[8px] bg-[#151515] hover:bg-white/10 text-[#A1A1AA] hover:text-white disabled:opacity-20 transition-colors"
                      title="Yuqoriga surish"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      disabled={index === links.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-1.5 rounded-[8px] bg-[#151515] hover:bg-white/10 text-[#A1A1AA] hover:text-white disabled:opacity-20 transition-colors"
                      title="Pastga surish"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleExpand(btn.id)}
                      className="p-1.5 rounded-[8px] bg-[#151515] hover:bg-white/10 text-[#A1A1AA] hover:text-white transition-colors"
                      title="Qo'shimcha izoh sozlamalari"
                    >
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveButton(btn.id)}
                      className="p-1.5 rounded-[8px] bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors ml-1"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Link / URL Input */}
                <div>
                  <input
                    type="text"
                    value={btn.url}
                    onChange={(e) => handleUpdate(btn.id, 'url', e.target.value)}
                    onBlur={(e) => handleSmartUrlBlur(btn.id, btn.type, e.target.value)}
                    placeholder={
                      btn.type === 'telegram'
                        ? 'Masalan: @username yoki https://t.me/username'
                        : btn.type === 'instagram'
                        ? 'Masalan: @username yoki https://instagram.com/username'
                        : btn.type === 'phone'
                        ? 'Masalan: +998 90 123 45 67'
                        : 'https://...'
                    }
                    className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] rounded-[14px] px-3.5 py-2.5 text-white text-xs font-mono outline-none transition-all placeholder-[#A1A1AA]/40"
                  />
                </div>

                {/* Optional Expandable Subtitle Input */}
                {isExpanded && (
                  <div className="pt-2 border-t border-white/5 animate-fadeIn">
                    <label className="block text-[10px] uppercase font-bold text-[#A1A1AA] mb-1">
                      Tugma ostidagi izoh (Subtitle)
                    </label>
                    <input
                      type="text"
                      value={btn.subtitle || ''}
                      onChange={(e) => handleUpdate(btn.id, 'subtitle', e.target.value)}
                      placeholder="Masalan: Telegram orqali bog'lanish"
                      className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] rounded-[12px] px-3 py-2 text-white text-xs outline-none"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
