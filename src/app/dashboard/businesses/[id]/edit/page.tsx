'use client';

import React, { useState, useEffect, use } from 'react';
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

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBusinessPage({ params }: EditPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [businessName, setBusinessName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');

  // Dynamic Multiple Links Array
  const [links, setLinks] = useState<BusinessLink[]>([]);

  useEffect(() => {
    async function loadBusiness() {
      setLoading(true);
      const data = await businessStore.getById(resolvedParams.id);
      if (data) {
        setBusinessName(data.business_name);
        setSlug(data.slug);
        setDescription(data.description || '');
        setLogo(data.logo || '');

        // Reconstruct links array if data.links exists or assemble from primary fields
        let loadedLinks: BusinessLink[] = data.links && Array.isArray(data.links) && data.links.length > 0 ? data.links : [];

        if (loadedLinks.length === 0) {
          if (data.telegram) {
            loadedLinks.push({
              id: 'btn_tg_1',
              title: 'Telegram',
              type: 'telegram',
              url: data.telegram,
              subtitle: 'Telegram orqali bog\'lanish',
            });
          }
          if (data.instagram) {
            loadedLinks.push({
              id: 'btn_ig_1',
              title: 'Instagram',
              type: 'instagram',
              url: data.instagram,
              subtitle: 'Sahifamizni kuzatib boring',
            });
          }
          if (data.phone) {
            loadedLinks.push({
              id: 'btn_ph_1',
              title: 'Telefon',
              type: 'phone',
              url: data.phone,
              subtitle: data.phone,
            });
          }
          if (data.google_maps) {
            loadedLinks.push({
              id: 'btn_map_1',
              title: 'Joylashuv',
              type: 'google_maps',
              url: data.google_maps,
              subtitle: 'Google Maps xaritasidan ochish',
            });
          }
        }

        setLinks(loadedLinks);
      } else {
        setError("Biznes ma'lumotlari topilmadi");
      }
      setLoading(false);
    }
    loadBusiness();
  }, [resolvedParams.id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBusinessName(val);
    if (!slug) {
      setSlug(generateSlug(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setError('Biznes nomi kiritilishi shart');
      return;
    }

    setSaving(true);
    try {
      const primaryTg = links.find((l) => l.type === 'telegram')?.url || '';
      const primaryIg = links.find((l) => l.type === 'instagram')?.url || '';
      const primaryPh = links.find((l) => l.type === 'phone')?.url || '';
      const primaryMap = links.find((l) => l.type === 'google_maps')?.url || '';

      await businessStore.update(resolvedParams.id, {
        business_name: businessName,
        slug: slug || generateSlug(businessName),
        description: description,
        logo: logo,
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
      setSaving(false);
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
              Biznesni Tahrirlash
            </h1>
          </div>
        </header>

        {/* Form Container */}
        <main className="p-4 sm:p-8 max-w-3xl w-full mx-auto">
          {loading ? (
            <div className="bg-[#151515] p-12 rounded-[22px] border border-white/10 text-center animate-pulse">
              <p className="text-sm text-[#A1A1AA]">Ma'lumotlar yuklanmoqda...</p>
            </div>
          ) : (
            <div className="bg-[#151515] p-6 sm:p-10 rounded-[22px] border border-white/10 shadow-2xl space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Tahrirlash: {businessName}
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  O'zgarishlarni kiriting va "Yangilash" tugmasini bosing. Tugmalar sonini oshirish yoki kamaytirish (o'chirish) imkoniyati mavjud.
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
                      required
                      className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] pl-11 pr-4 py-3.5 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                    Slug (URL identifier)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] px-4 py-3.5 text-white text-sm font-mono outline-none transition-all"
                  />
                  <p className="text-xs text-[#B7FF00] mt-1.5 font-mono">
                    Havola: mapuz.uz/{slug}
                  </p>
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
                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] p-4 text-white text-sm outline-none transition-all"
                  />
                </div>

                {/* Logo Upload */}
                <LogoUpload value={logo} onChange={setLogo} />

                {/* Dynamic Buttons Manager */}
                <DynamicLinksManager links={links} onChange={setLinks} />

                {/* Update Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#0A0A0A] font-extrabold py-4 rounded-[22px] text-base transition-all duration-200 shadow-[0_0_30px_rgba(183,255,0,0.35)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Yangilash</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
