
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { user } from '@/lib/data';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // This is a mock authentication check.
    // In a real app, you'd check a token or session.
    if (!user || user.isAdmin) {
      router.replace('/dashboard/login');
    } else {
      // If the user is authenticated and tries to access the root dashboard URL,
      // redirect them to their home page.
      if (window.location.pathname === '/dashboard') {
         router.replace('/dashboard/home');
      }
    }
  }, [router]);

  // Render children if the user is an authenticated employee.
  // The login page will be rendered if the redirect happens.
  if (!user || user.isAdmin) {
    // You can return a loader here while the redirect happens
    return null;
  }

  return <>{children}</>;
}
