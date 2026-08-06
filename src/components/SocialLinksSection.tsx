'use client';

import React from 'react';
import { BusinessLink, LinkType } from '@/lib/types';
import { Send, Phone, MapPin, Plus, Trash2, Globe } from 'lucide-react';
import {
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
  TiktokIcon,
  FacebookIcon
} from './Icons';

interface SocialLinksSectionProps {
  telegram: string;
  onChangeTelegram: (val: string) => void;
  instagram: string;
  onChangeInstagram: (val: string) => void;
  phone: string;
  onChangePhone: (val: string) => void;
  googleMaps: string;
  onChangeGoogleMaps: (val: string) => void;
  links: BusinessLink[];
  onChangeLinks: (links: BusinessLink[]) => void;
}

export default function SocialLinksSection({
  telegram,
  onChangeTelegram,
  instagram,
  onChangeInstagram,
  phone,
  onChangePhone,
  googleMaps,
  onChangeGoogleMaps,
  links = [],
  onChangeLinks,
}: SocialLinksSectionProps) {
  // Helper to add an extra link of specific type
  const addExtraLink = (type: LinkType, defaultTitle: string) => {
    const existingCount = links.filter((l) => l.type === type).length;
    const newLink: BusinessLink = {
      id: `link_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      title: `${defaultTitle} ${existingCount + 2}`,
      type: type,
      url: '',
      subtitle: '',
    };
    onChangeLinks([...links, newLink]);
  };

  const updateLink = (id: string, field: keyof BusinessLink, value: string) => {
    onChangeLinks(
      links.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const removeLink = (id: string) => {
    onChangeLinks(links.filter((l) => l.id !== id));
  };

  // Filter extra links by category
  const extraTelegrams = links.filter((l) => l.type === 'telegram');
  const extraInstagrams = links.filter((l) => l.type === 'instagram');
  const extraPhones = links.filter((l) => l.type === 'phone');
  const extraMaps = links.filter((l) => l.type === 'google_maps');
  const extraOthers = links.filter(
    (l) => !['telegram', 'instagram', 'phone', 'google_maps'].includes(l.type)
  );

  return (
    <div className="pt-6 border-t border-white/10 space-y-8">
      <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-[#A1A1AA]">
        ASOSIY & QO'SHIMCHA HAVOLALAR
      </h3>

      {/* 1. TELEGRAM SECTION */}
      <div className="p-4 rounded-[20px] bg-[#0A0A0A] border border-white/10 space-y-3">
        <label className="block text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Send className="w-4 h-4 text-[#0088cc]" />
          <span>Telegram (Asosiy)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#0088cc]">
            <Send className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={telegram}
            onChange={(e) => onChangeTelegram(e.target.value)}
            placeholder="https://t.me/biznesingiz"
            className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
          />
        </div>

        {/* Extra Telegram items */}
        {extraTelegrams.map((item) => (
          <div key={item.id} className="p-3 rounded-[14px] bg-[#151515] border border-white/10 space-y-2 mt-2">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateLink(item.id, 'title', e.target.value)}
                placeholder="Telegram 2 Nomi (Masalan: Aksiya kanali)"
                className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-semibold outline-none"
              />
              <button
                type="button"
                onClick={() => removeLink(item.id)}
                className="p-1.5 rounded-[8px] bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={item.url}
              onChange={(e) => updateLink(item.id, 'url', e.target.value)}
              placeholder="https://t.me/ikkinchi_kanal"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-mono outline-none"
            />
          </div>
        ))}

        {/* Add Extra Telegram Button */}
        <button
          type="button"
          onClick={() => addExtraLink('telegram', 'Telegram')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0088cc] hover:text-white pt-1 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Yana Telegram kanal/guruh qo'shish</span>
        </button>
      </div>

      {/* 2. INSTAGRAM SECTION */}
      <div className="p-4 rounded-[20px] bg-[#0A0A0A] border border-white/10 space-y-3">
        <label className="block text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
          <span>Instagram (Asosiy)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#E1306C]">
            <InstagramIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={instagram}
            onChange={(e) => onChangeInstagram(e.target.value)}
            placeholder="https://instagram.com/biznesingiz"
            className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
          />
        </div>

        {/* Extra Instagram items */}
        {extraInstagrams.map((item) => (
          <div key={item.id} className="p-3 rounded-[14px] bg-[#151515] border border-white/10 space-y-2 mt-2">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateLink(item.id, 'title', e.target.value)}
                placeholder="Instagram 2 Nomi (Masalan: Zapchas sahifamiz)"
                className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-semibold outline-none"
              />
              <button
                type="button"
                onClick={() => removeLink(item.id)}
                className="p-1.5 rounded-[8px] bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={item.url}
              onChange={(e) => updateLink(item.id, 'url', e.target.value)}
              placeholder="https://instagram.com/ikkinchi_sahifa"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-mono outline-none"
            />
          </div>
        ))}

        {/* Add Extra Instagram Button */}
        <button
          type="button"
          onClick={() => addExtraLink('instagram', 'Instagram')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#E1306C] hover:text-white pt-1 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Yana Instagram sahifa qo'shish</span>
        </button>
      </div>

      {/* 3. TELEFON SECTION */}
      <div className="p-4 rounded-[20px] bg-[#0A0A0A] border border-white/10 space-y-3">
        <label className="block text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#B7FF00]" />
          <span>Telefon (Asosiy)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#B7FF00]">
            <Phone className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={phone}
            onChange={(e) => onChangePhone(e.target.value)}
            placeholder="+998901234567"
            className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
          />
        </div>

        {/* Extra Phone items */}
        {extraPhones.map((item) => (
          <div key={item.id} className="p-3 rounded-[14px] bg-[#151515] border border-white/10 space-y-2 mt-2">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateLink(item.id, 'title', e.target.value)}
                placeholder="Telefon Nomi (Masalan: Operator / Boshqaruvchi)"
                className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-semibold outline-none"
              />
              <button
                type="button"
                onClick={() => removeLink(item.id)}
                className="p-1.5 rounded-[8px] bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={item.url}
              onChange={(e) => updateLink(item.id, 'url', e.target.value)}
              placeholder="+998998887766"
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-mono outline-none"
            />
          </div>
        ))}

        {/* Add Extra Phone Button */}
        <button
          type="button"
          onClick={() => addExtraLink('phone', 'Telefon')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#B7FF00] hover:text-white pt-1 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Yana Telefon raqam qo'shish</span>
        </button>
      </div>

      {/* 4. JOYLASHUV / GOOGLE MAPS SECTION */}
      <div className="p-4 rounded-[20px] bg-[#0A0A0A] border border-white/10 space-y-3">
        <label className="block text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#EA4335]" />
          <span>Joylashuv / Google Maps (Asosiy)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#EA4335]">
            <MapPin className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={googleMaps}
            onChange={(e) => onChangeGoogleMaps(e.target.value)}
            placeholder="https://maps.google.com/?q=39.7747,64.4286"
            className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
          />
        </div>

        {/* Extra Maps items */}
        {extraMaps.map((item) => (
          <div key={item.id} className="p-3 rounded-[14px] bg-[#151515] border border-white/10 space-y-2 mt-2">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateLink(item.id, 'title', e.target.value)}
                placeholder="Manzil Nomi (Masalan: Ikkinchi filial)"
                className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-semibold outline-none"
              />
              <button
                type="button"
                onClick={() => removeLink(item.id)}
                className="p-1.5 rounded-[8px] bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={item.url}
              onChange={(e) => updateLink(item.id, 'url', e.target.value)}
              placeholder="https://maps.google.com/..."
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-mono outline-none"
            />
          </div>
        ))}

        {/* Add Extra Maps Button */}
        <button
          type="button"
          onClick={() => addExtraLink('google_maps', 'Joylashuv / Filial')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#EA4335] hover:text-white pt-1 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Yana Joylashuv / Manzil qo'shish</span>
        </button>
      </div>

      {/* 5. OTHER SOCIAL MEDIA / WEBSITE SECTION */}
      <div className="p-4 rounded-[20px] bg-[#0A0A0A] border border-white/10 space-y-3">
        <label className="block text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-400" />
          <span>Boshqa Tarmoqlar (Vebsayt, YouTube, TikTok, Facebook)</span>
        </label>

        {extraOthers.map((item) => (
          <div key={item.id} className="p-3.5 rounded-[14px] bg-[#151515] border border-white/10 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-5">
                <select
                  value={item.type}
                  onChange={(e) => updateLink(item.id, 'type', e.target.value as LinkType)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs outline-none"
                >
                  <option value="website">Vebsayt</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="facebook">Facebook</option>
                  <option value="custom">Boshqa Havola</option>
                </select>
              </div>
              <div className="sm:col-span-6">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateLink(item.id, 'title', e.target.value)}
                  placeholder="Tugma Nomi"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-semibold outline-none"
                />
              </div>
              <div className="sm:col-span-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => removeLink(item.id)}
                  className="p-1.5 rounded-[8px] bg-red-500/10 hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <input
              type="text"
              value={item.url}
              onChange={(e) => updateLink(item.id, 'url', e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-[10px] px-3 py-1.5 text-white text-xs font-mono outline-none"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => addExtraLink('website', 'Vebsayt')}
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-white pt-1 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Vebsayt / YouTube / TikTok qo'shish</span>
        </button>
      </div>
    </div>
  );
}
