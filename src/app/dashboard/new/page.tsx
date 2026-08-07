'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import LogoUpload from '@/components/LogoUpload';
import DynamicLinksManager from '@/components/DynamicLinksManager';
import { businessStore } from '@/lib/store';
import { generateSlug } from '@/lib/slug';
import { BusinessLink } from '@/lib/types';
import {
  ArrowLeft,
  Building,
  Save,
  Menu
} from 'lucide-react';

const DEFAULT_INITIAL_LINKS: BusinessLink[] = [
  {
    id: 'btn_tg_1',
    title: 'Telegram',
    type: 'telegram',
    url: 'https://t.me/biznesingiz',
    subtitle: 'Telegram orqali bog\'lanish',
  },
  {
    id: 'btn_ig_1',
    title: 'Instagram',
    type: 'instagram',
    url: 'https://instagram.com/biznesingiz',
    subtitle: 'Sahifamizni kuzatib boring',
  },
  {
    id: 'btn_ph_1',
    title: 'Telefon',
    type: 'phone',
    url: '+998901234567',
    subtitle: '',
  },
  {
    id: 'btn_map_1',
    title: 'Joylashuv',
    type: 'google_maps',
    url: 'https://maps.google.com/?q=39.7747,64.4286',
    subtitle: 'Google Maps xaritasidan ochish',
  },
];

export default function NewBusinessPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [businessName, setBusinessName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');

  // Dynamic Multiple Links Array
  const [links, setLinks] = useState<BusinessLink[]>(DEFAULT_INITIAL_LINKS);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBusinessName(val);
    setSlug(generateSlug(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setError('Biznes nomi kiritilishi shart');
      return;
    }

    setLoading(true);
    try {
      // Find primary links from links array if available
      const primaryTg = links.find((l) => l.type === 'telegram')?.url || '';
      const primaryIg = links.find((l) => l.type === 'instagram')?.url || '';
      const primaryPh = links.find((l) => l.type === 'phone')?.url || '';
      const primaryMap = links.find((l) => l.type === 'google_maps')?.url || '';

      await businessStore.create({
        business_name: businessName,
        slug: slug || generateSlug(businessName),
        description: description,
        logo: logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop',
        telegram: primaryTg,
        instagram: primaryIg,
        phone: primaryPh,
        google_maps: primaryMap,
        links: links,
      });

      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Xatolik yuz berdi. Qayta urinib ko'ring.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#A1A1AA] hover:text-white p-2 rounded-lg bg-[#151515]"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Orqaga</span>
            </Link>

            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Yangi Biznes Yaratish
            </h1>
          </div>
        </header>

        {/* Form Container */}
        <main className="p-4 sm:p-8 max-w-3xl w-full mx-auto">
          <div className="bg-[#151515] p-6 sm:p-10 rounded-[22px] border border-white/10 shadow-2xl space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Yangi profil ma'lumotlari
              </h2>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Biznesingiz nomini kiritib, tugmalar sonini ko'paytirishingiz yoki kamaytirishingiz mumkin.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-[16px] bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Business Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1A1AA]">
                    <Building className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={businessName}
                    onChange={handleNameChange}
                    placeholder="Masalan: Suzangaron Fayz"
                    required
                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
                  />
                </div>
                {slug && (
                  <p className="text-xs text-[#B7FF00] mt-1.5 font-mono">
                    Profil havolasi: mapuz.uz/{slug}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Biznesingiz haqida qisqacha ma'lumot..."
                  className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] p-4 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
                />
              </div>

              {/* Logo Upload */}
              <LogoUpload value={logo} onChange={setLogo} />

              {/* Dynamic Buttons Manager */}
              <DynamicLinksManager links={links} onChange={setLinks} />

              {/* Save Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#0A0A0A] font-extrabold py-4 rounded-[22px] text-base transition-all duration-200 shadow-[0_0_30px_rgba(183,255,0,0.35)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Saqlash</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
