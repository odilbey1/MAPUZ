import React from 'react';

// 1. Telegram Circular Icon
export function TelegramPlaneIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#24A1DE" />
      <path d="M25.5 11.5L9.5 17.8C8.5 18.2 8.5 18.8 9.4 19.1L13.5 20.4L23.2 14.3C23.7 14 24 14.2 23.6 14.5L15.8 21.6H15.6L15.5 25.5C15.9 25.5 16.1 25.3 16.3 25.1L18.4 23L22.6 26.1C23.4 26.5 24 26.2 24.2 25.3L26.9 12.7C27.2 11.7 26.6 11.1 25.5 11.5Z" fill="white" />
    </svg>
  );
}

// 2. Instagram Sunset Gradient Squircle Icon
export function InstagramGradientIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} rounded-[10px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center p-1.5 shadow-md shrink-0`}>
      <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    </div>
  );
}

// 3. Telefon Rounded Green Icon
export function PhoneBadgeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} rounded-[10px] bg-[#25D366] flex items-center justify-center text-white shadow-md shrink-0`}>
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    </div>
  );
}

// 4. Google Maps Multi-Color Pin (Joylashuv)
export function GoogleMapsPinIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M24 4C15.16 4 8 11.16 8 20c0 12 16 24 16 24s16-12 16-24c0-8.84-7.16-16-16-16z" fill="#EA4335" />
      <path d="M33 13C30 9 27 5 24 4v22l11-13z" fill="#FBBC04" />
      <path d="M20 32l4 12s16-12 16-24c0-3.3-.9-6.4-2.5-9.1L20 32z" fill="#34A853" />
      <path d="M8 20c0 4.8 2.4 9.8 6.2 14.1l11.8-17.1V4C15.16 4 8 11.16 8 20z" fill="#4285F4" />
      <circle cx="24" cy="18" r="6.5" fill="#FFFFFF" />
      <circle cx="24" cy="18" r="4.5" fill="#1A73E8" />
    </svg>
  );
}

// 5. Yandex Maps Red Pin Icon
export function YandexPinIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" fill="#E61414" />
      <circle cx="12" cy="9.5" r="3" fill="#FFFFFF" />
    </svg>
  );
}

// 6. 2GIS Official Map Badge
export function TwoGisBadgeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="9" fill="#00AA44" />
      <path d="M0 24L12 28L24 24L36 28V36H0V24Z" fill="#F4B400" />
      <circle cx="18" cy="14" r="7.5" fill="#0088FF" />
      <path d="M18 9C15.24 9 13 11.24 13 14C13 17.5 18 23 18 23S23 17.5 23 14C23 11.24 20.76 9 18 9Z" fill="white" />
      <circle cx="18" cy="14" r="3" fill="#0088FF" />
    </svg>
  );
}

// 7. Vebsayt (Website) Wireframe Cyan Globe Icon
export function WebsiteGlobeIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// 8. YouTube Red Rounded Badge
export function YouTubeBadgeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center shrink-0`}>
      <svg className="w-8 h-6" viewBox="0 0 36 26" fill="none">
        <rect width="36" height="26" rx="6" fill="#FF0000" />
        <polygon points="14,6 24,13 14,20" fill="white" />
      </svg>
    </div>
  );
}

// 9. TikTok Cyan/Magenta 3D Note
export function TikTokNeonIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className="w-8 h-8 rounded-[9px] bg-black/60 flex items-center justify-center p-1 shrink-0 border border-white/10">
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.066-.089a2.895 2.895 0 0 1 2.37-4.551c.318 0 .628.051.917.147V9.397a6.376 6.376 0 0 0-.917-.067c-3.553 0-6.434 2.88-6.434 6.433s2.881 6.433 6.434 6.433c3.553 0 6.434-2.88 6.434-6.433V8.718a8.212 8.212 0 0 0 4.678 1.442V6.716a4.832 4.832 0 0 1-1-.03z" fill="#00F2FE" />
        <path d="M18.589 5.686a4.793 4.793 0 0 1-3.77-4.245V1h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.066-.089a2.895 2.895 0 0 1 2.37-4.551c.318 0 .628.051.917.147V8.397a6.376 6.376 0 0 0-.917-.067c-3.553 0-6.434 2.88-6.434 6.433s2.881 6.433 6.434 6.433c3.553 0 6.434-2.88 6.434-6.433V7.718a8.212 8.212 0 0 0 4.678 1.442V5.716a4.832 4.832 0 0 1-1-.03z" fill="#FF004F" />
        <path d="M19.089 6.186a4.793 4.793 0 0 1-3.77-4.245V1.5h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.066-.089a2.895 2.895 0 0 1 2.37-4.551c.318 0 .628.051.917.147V8.897a6.376 6.376 0 0 0-.917-.067c-3.553 0-6.434 2.88-6.434 6.433s2.881 6.433 6.434 6.433c3.553 0 6.434-2.88 6.434-6.433V8.218a8.212 8.212 0 0 0 4.678 1.442V6.216a4.832 4.832 0 0 1-1-.03z" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

// 10. Facebook Royal Blue Circle
export function FacebookCircleIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#1877F2" />
      <path d="M24 18H20.5V30H15.5V18H13V13.8H15.5V11C15.5 8.5 17 6 21 6H24.5V10.2H22C20.8 10.2 20.5 10.8 20.5 11.8V13.8H24.5L24 18Z" fill="white" />
    </svg>
  );
}

// 11. Boshqa / Link Lavender Chain
export function ChainLinkIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#D8B4FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

// Backward-compatible export aliases
export const InstagramIcon = InstagramGradientIcon;
export const TelegramIcon = TelegramPlaneIcon;
export const YoutubeIcon = YouTubeBadgeIcon;
export const TiktokIcon = TikTokNeonIcon;
export const FacebookIcon = FacebookCircleIcon;
export const YandexMapsIcon = YandexPinIcon;
export const TwoGisIcon = TwoGisBadgeIcon;
