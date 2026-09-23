'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PhoneMockup from '@/components/PhoneMockup';
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  Share2,
  Smartphone,
  ShieldCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      {/* Top Header Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
          {/* Ambient Lighting Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B7FF00]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Copy & CTA */}
              <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151515] border border-white/10 text-xs font-semibold tracking-wide text-[#A1A1AA] mb-6 shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-pulse" />
                  <span>Tezkor. Minimal. Professional.</span>
                </div>

                {/* Hero Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] max-w-2xl">
                  Barcha biznes havolalaringiz <span className="text-[#B7FF00] underline decoration-[#B7FF00]/30 underline-offset-8">bitta sahifada.</span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-lg sm:text-xl text-[#A1A1AA] max-w-xl font-normal leading-relaxed">
                  Telegram, Instagram, Telefon va Google Maps havolalarini bitta professional sahifada jamlang.
                </p>

                {/* CTA Button */}
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Link
                    href="/login"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#B7FF00] hover:bg-[#a3e600] text-[#0A0A0A] px-8 py-4 rounded-[22px] font-bold text-lg transition-all duration-200 shadow-[0_0_30px_rgba(183,255,0,0.35)] hover:shadow-[0_0_40px_rgba(183,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Boshlash</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/demo"
                    target="_blank"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#151515] hover:bg-[#1f1f1f] text-[#A1A1AA] hover:text-white px-6 py-4 rounded-[22px] font-semibold text-base border border-white/10 transition-all"
                  >
                    <span>Namuna ko'rish</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                {/* Micro trust features */}
                <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-white/10 w-full max-w-lg">
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-2xl font-black text-white font-mono">100+</span>
                    <span className="text-xs text-[#A1A1AA] mt-0.5">Faol Bizneslar</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-2xl font-black text-[#B7FF00] font-mono">0.1s</span>
                    <span className="text-[#A1A1AA] text-xs mt-0.5">Yuklanish tezligi</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-2xl font-black text-white font-mono">100%</span>
                    <span className="text-[#A1A1AA] text-xs mt-0.5">Mobile-first UI</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Phone Mockup */}
              <div className="lg:col-span-5 flex justify-center relative">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES / FEATURES SECTION */}
        <section id="services" className="py-20 bg-[#151515]/50 border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs uppercase font-bold tracking-widest text-[#B7FF00] mb-3">Xizmatlar</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Mijozlaringiz uchun qulay va zamonaviy yechim
              </p>
              <p className="mt-4 text-[#A1A1AA] text-base">
                Murakkab saytlarga ehtiyoj yo'q. Bir necha daqiqada tayyor profil yaratib, barcha ijtimoiy tarmoq va xaritalarni bitta havola ostida ulashing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#151515] p-8 rounded-[22px] border border-white/10 hover:border-[#B7FF00]/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-[16px] bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00] mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Ultra Tezkor Yuklanish</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  Next.js 15 yordamida har bir sahifa chaqmoqdek tez ochiladi va mijozlaringiz vaqtini tejaydi.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#151515] p-8 rounded-[22px] border border-white/10 hover:border-[#B7FF00]/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-[16px] bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00] mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Apple Minimalist UI</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  Mobil qurilmalar va smartfonlar uchun maxsus moslashtirilgan 22px burchaklar va qorong'u rejimli estetika.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#151515] p-8 rounded-[22px] border border-white/10 hover:border-[#B7FF00]/40 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-[16px] bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00] mb-6 group-hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Bitta Qulay Havola</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  Instagram bio, Telegram va vizitkalaringizga oson qo'yish uchun maxsus qisqa va esda qolarli slug format (masalan: mapuz.uz/biznesingiz).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs uppercase font-bold tracking-widest text-[#B7FF00] mb-3">Narxlar</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Shaffof va arzon ta'riflar
              </p>
            </div>

            <div className="max-w-md mx-auto bg-[#151515] rounded-[22px] border-2 border-[#B7FF00]/40 p-8 relative shadow-[0_0_40px_rgba(183,255,0,0.1)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B7FF00] text-[#0A0A0A] text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider">
                Hammasi Ichida
              </div>

              <div className="text-center border-b border-white/10 pb-6 mb-6">
                <h3 className="text-xl font-bold text-white">Standard Biznes</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">100,000</span>
                  <span className="text-sm text-[#A1A1AA]">UZS / bir marta</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-sm text-[#A1A1AA]">
                <li className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="w-5 h-5 text-[#B7FF00]" />
                  <span>Cheksiz havola bosilishlari</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="w-5 h-5 text-[#B7FF00]" />
                  <span>Telegram, Instagram, Telefon, Google Maps</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="w-5 h-5 text-[#B7FF00]" />
                  <span>Logotip yuklash imkoniyati</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="w-5 h-5 text-[#B7FF00]" />
                  <span>Tezkor tahrirlash paneli</span>
                </li>
              </ul>

              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 bg-[#B7FF00] hover:bg-[#a3e600] text-[#0A0A0A] font-bold py-3.5 rounded-[22px] transition-all shadow-lg"
              >
                <span>Hozir boshlash</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CONTACT / FOOTER SECTION */}
        <section id="contact" className="py-16 bg-[#151515] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[10px] bg-[#B7FF00] flex items-center justify-center text-[#0A0A0A] font-extrabold text-sm">
                M
              </div>
              <span className="text-lg font-bold text-white font-mono">MAPUZ</span>
              <span className="text-[#A1A1AA] text-xs">© 2026 MAPUZ Inc. Barcha huquqlar himoyalangan.</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-[#A1A1AA]">
              <Link href="/login" className="hover:text-[#B7FF00] transition-colors">
                Boshqaruv paneli
              </Link>
              <a href="#services" className="hover:text-white transition-colors">
                Xizmatlar
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Narxlar
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
