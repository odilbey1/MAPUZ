'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const authStatus = localStorage.getItem('mapuz_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Redirect to login page
      router.replace('/login');
    }
  }, [pathname, router]);

  // While checking auth status, show clean dark loading screen
  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-[18px] bg-[#B7FF00] flex items-center justify-center text-[#0A0A0A] font-extrabold text-2xl shadow-[0_0_30px_rgba(183,255,0,0.4)] animate-pulse mb-4">
          M
        </div>
        <p className="text-sm font-medium text-[#A1A1AA] tracking-wide">
          Xavfsizlik tekshirilmoqda...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
