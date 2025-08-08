
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { user } from '@/lib/data';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated or is an admin
    if (!user || user.isAdmin) {
        router.push('/dashboard/login');
    } else {
        router.push('/dashboard/home');
    }
  }, [router]);

  return null;
}
