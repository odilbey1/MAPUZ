'use client';

import React from 'react';
import { BusinessLink, LinkType } from '@/lib/types';
import { Plus, Trash2, Link as LinkIcon, MoveUp, MoveDown } from 'lucide-react';
import {
  TelegramIcon,
  InstagramIcon,
  YoutubeIcon,
  TiktokIcon,
  FacebookIcon
} from './Icons';

interface LinksEditorProps {
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

export default function LinksEditor({ links = [], onChange }: LinksEditorProps) {
  const handleAddLink = () => {
    const newLink: BusinessLink = {
      id: `link_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      title: 'Telegram 2 - Aksiya kanali',
      type: 'telegram',
      url: 'https://t.me/kanaliz',
      subtitle: "Qo'shimcha havola",
    };
    onChange([...links, newLink]);
  };

  const handleRemoveLink = (id: string) => {
    onChange(links.filter((l) => l.id !== id));
  };

  const handleUpdateLink = (id: string, key: keyof BusinessLink, value: string) => {
    onChange(
      links.map((l) => {
        if (l.id === id) {
          const updated = { ...l, [key]: value };
          // Auto-adjust default title if type changes
          if (key === 'type') {
            const option = LINK_TYPE_OPTIONS.find((o) => o.type === value);
            if (option) {
              updated.title = `${option.label} ${links.filter((item) => item.type === value).length + 1}`;
            }
          }
          return updated;
        }
        return l;
      })
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

  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Qo'shimcha Havolalar / Tugmalar (Cheksiz 1+)
          </h3>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Telegram, Instagram, Telefon yoki istalgan ijtimoiy tarmoqdan bir nechta havola qo'shing.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddLink}
          className="flex items-center gap-1.5 bg-[#B7FF00] hover:bg-[#a3e600] text-[#0A0A0A] px-3.5 py-2 rounded-[14px] text-xs font-bold transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Havola qo'shish</span>
        </button>
      </div>

      {links.length === 0 ? (
        <div className="p-6 rounded-[16px] bg-[#0A0A0A] border border-white/10 text-center">
          <p className="text-xs text-[#A1A1AA]">
            Hali qo'shimcha havolalar yo'q. Bir nechta Telegram kanallar yoki telefon raqamlar qo'shish uchun "+ Havola qo'shish" tugmasini bosing.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link, index) => (
            <div
              key={link.id}
              className="p-4 rounded-[16px] bg-[#0A0A0A] border border-white/10 space-y-3 relative group"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Type selection */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#A1A1AA] mb-1">
                    Tugma Turi
                  </label>
                  <select
                    value={link.type}
                    onChange={(e) => handleUpdateLink(link.id, 'type', e.target.value)}
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
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#A1A1AA] mb-1">
                    Tugma Nomi
                  </label>
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleUpdateLink(link.id, 'title', e.target.value)}
                    placeholder="Masalan: Telegram Aksiya Kanali"
                    className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] rounded-[12px] px-3 py-2 text-white text-xs outline-none"
                  />
                </div>

                {/* Subtitle */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#A1A1AA] mb-1">
                    Izoh / Qisqa Subtitle
                  </label>
                  <input
                    type="text"
                    value={link.subtitle || ''}
                    onChange={(e) => handleUpdateLink(link.id, 'subtitle', e.target.value)}
                    placeholder="Masalan: Ikkinchi bo'lim"
                    className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] rounded-[12px] px-3 py-2 text-white text-xs outline-none"
                  />
                </div>
              </div>

              {/* URL */}
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] rounded-[12px] px-3 py-2 text-white text-xs font-mono outline-none"
                  />
                </div>

                {/* Reorder & Remove Actions */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-2 rounded-[10px] bg-[#151515] hover:bg-white/10 text-[#A1A1AA] disabled:opacity-30"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === links.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-2 rounded-[10px] bg-[#151515] hover:bg-white/10 text-[#A1A1AA] disabled:opacity-30"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(link.id)}
                    className="p-2 rounded-[10px] bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="O'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
