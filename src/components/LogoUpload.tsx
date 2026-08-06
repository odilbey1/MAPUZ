'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Link as LinkIcon } from 'lucide-react';

interface LogoUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function LogoUpload({ value, onChange }: LogoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
          Logo Upload
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`text-xs px-2.5 py-1 rounded-[8px] transition-colors ${
              tab === 'upload' ? 'bg-[#B7FF00] text-[#0A0A0A] font-bold' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            Fayl yuklash
          </button>
          <button
            type="button"
            onClick={() => setTab('url')}
            className={`text-xs px-2.5 py-1 rounded-[8px] transition-colors ${
              tab === 'url' ? 'bg-[#B7FF00] text-[#0A0A0A] font-bold' : 'text-[#A1A1AA] hover:text-white'
            }`}
          >
            URL kiritish
          </button>
        </div>
      </div>

      {/* Preview if image URL exists */}
      {value ? (
        <div className="relative w-full p-4 bg-[#0A0A0A] border border-white/10 rounded-[22px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={value}
              alt="Logo Preview"
              className="w-16 h-16 rounded-[16px] object-cover border border-[#B7FF00]/40 shadow-lg"
            />
            <div>
              <p className="text-sm font-semibold text-white">Logotip yuklandi</p>
              <p className="text-xs text-[#A1A1AA] truncate max-w-[200px] sm:max-w-[300px]">
                {value.startsWith('data:') ? 'Lokal tasvir fayli' : value}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-[#A1A1AA] hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          {tab === 'upload' ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full p-6 border-2 border-dashed rounded-[22px] flex flex-col items-center justify-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-[#B7FF00] bg-[#B7FF00]/5'
                  : 'border-white/10 bg-[#0A0A0A] hover:border-[#B7FF00]/40 hover:bg-white/[0.02]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-[16px] bg-[#151515] border border-white/10 flex items-center justify-center text-[#B7FF00] mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-white">
                Rasm faylini shug'ullaning yoki bosing
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1">PNG, JPG, SVG (Maks. 5MB)</p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A1A1AA]">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#B7FF00] focus:ring-1 focus:ring-[#B7FF00] rounded-[16px] pl-11 pr-4 py-3 text-white text-sm placeholder-[#A1A1AA]/50 outline-none transition-all"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
