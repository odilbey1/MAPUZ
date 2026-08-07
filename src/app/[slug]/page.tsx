import React from 'react';
import Link from 'next/link';
import { businessStore } from '@/lib/store';
import { BusinessLink } from '@/lib/types';
import { Sparkles } from 'lucide-react';
import PublicProfileClient from '@/components/PublicProfileClient';

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
        subtitle: 'Telegram orqali bog\'lanish',
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
        subtitle: '',
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

  return <PublicProfileClient business={business} allButtons={allButtons} />;
}
