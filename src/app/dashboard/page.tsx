'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { businessStore } from '@/lib/store';
import { Business } from '@/lib/types';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Building2,
  Menu,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchBusinesses = async () => {
    setLoading(true);
    const data = await businessStore.getAll();
    setBusinesses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleDelete = async (id: string) => {
    await businessStore.delete(id);
    setDeleteConfirmId(null);
    fetchBusinesses();
  };

  const filteredBusinesses = businesses.filter((b) =>
    b.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
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

            <Link href="/" className="flex items-center gap-3 lg:hidden">
              <div className="w-8 h-8 rounded-[10px] bg-[#B7FF00] flex items-center justify-center text-[#0A0A0A] font-extrabold text-base">
                M
              </div>
              <span className="text-lg font-black tracking-tight text-white font-mono">
                MAPUZ
              </span>
            </Link>

            <h1 className="hidden sm:block text-xl font-bold tracking-tight text-white">
              Boshqaruv Paneli
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/new"
              className="flex items-center gap-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#0A0A0A] px-5 py-2.5 rounded-[22px] text-sm font-bold transition-all shadow-[0_0_20px_rgba(183,255,0,0.3)] hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Yangi biznes</span>
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#151515] p-6 rounded-[22px] border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                  Total Businesses
                </p>
                <p className="text-3xl font-extrabold text-white mt-1 font-mono">
                  {businesses.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-[16px] bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00]">
                <Building2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#151515] p-6 rounded-[22px] border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                  Tizim Holati
                </p>
                <p className="text-sm font-bold text-[#B7FF00] mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-pulse" />
                  Faol & Tayyor
                </p>
              </div>
              <div className="w-12 h-12 rounded-[16px] bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00]">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#151515] p-6 rounded-[22px] border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                  Tezlik Ko'rsatkichi
                </p>
                <p className="text-sm font-bold text-white mt-2 font-mono">
                  0.08s Edge Response
                </p>
              </div>
              <div className="w-12 h-12 rounded-[16px] bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00]">
                <Layers className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Search Bar & Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1A1AA]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Biznes nomi yoki slug bo'yicha qidiruv..."
                className="w-full bg-[#151515] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[22px] pl-11 pr-4 py-3 text-white text-sm placeholder-[#A1A1AA]/60 outline-none transition-all"
              />
            </div>

            <div className="text-xs text-[#A1A1AA] text-right font-mono">
              Jami: <strong className="text-white">{filteredBusinesses.length}</strong> ta biznes ko'rsatildi
            </div>
          </div>

          {/* Business List Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-[#151515] rounded-[22px] animate-pulse border border-white/5" />
              ))}
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <div className="bg-[#151515] p-12 rounded-[22px] border border-white/10 text-center space-y-4">
              <div className="w-16 h-16 rounded-[22px] bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-[#A1A1AA] mx-auto">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Biznes topilmadi</h3>
              <p className="text-sm text-[#A1A1AA] max-w-sm mx-auto">
                {searchQuery
                  ? `"${searchQuery}" bo'yicha hech qanday natija topilmadi.`
                  : "Hozircha hech qanday biznes qo'shilmagan. Birinchi biznesingizni yarating!"}
              </p>
              <Link
                href="/dashboard/new"
                className="inline-flex items-center gap-2 bg-[#B7FF00] text-[#0A0A0A] px-6 py-3 rounded-[22px] text-sm font-bold hover:bg-[#a3e600] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi biznes qo'shish</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#151515] p-6 rounded-[22px] border border-white/10 hover:border-[#B7FF00]/40 transition-all duration-200 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Header with Logo & Name */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={b.logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop'}
                        alt={b.business_name}
                        className="w-14 h-14 rounded-[16px] object-cover border border-white/10 group-hover:border-[#B7FF00]/50 transition-colors"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-white truncate">
                          {b.business_name}
                        </h3>
                        <span className="inline-block mt-0.5 text-xs text-[#B7FF00] bg-[#B7FF00]/10 px-2.5 py-0.5 rounded-full font-mono">
                          /{b.slug}
                        </span>
                      </div>
                    </div>

                    {/* Description snippet */}
                    <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed mb-6">
                      {b.description || "Ta'rif kiritilmagan"}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <Link
                      href={`/${b.slug}`}
                      target="_blank"
                      className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#B7FF00] transition-colors py-1.5 px-3 rounded-[12px] bg-[#0A0A0A] border border-white/5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/businesses/${b.id}/edit`}
                        className="p-2 rounded-[12px] bg-[#0A0A0A] hover:bg-white/10 text-[#A1A1AA] hover:text-white transition-colors"
                        title="Edit Business"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => setDeleteConfirmId(b.id)}
                        className="p-2 rounded-[12px] bg-[#0A0A0A] hover:bg-red-500/20 text-[#A1A1AA] hover:text-red-400 transition-colors"
                        title="Delete Business"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-white/10 p-6 rounded-[22px] max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Biznesni o'chirish</h3>
            <p className="text-sm text-[#A1A1AA]">
              Rostdan ham ushbu biznes sahifasini o'chirmoqchimisiz? Ushbu amalni ortga qaytarib bo'lmaydi.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-[16px] bg-[#0A0A0A] border border-white/10 text-sm font-semibold text-[#A1A1AA] hover:text-white"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-[16px] bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
