

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { user } from '@/lib/data';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    // This is a mock authentication check.
    // In a real app, you'd check a token or session.
    if (user && user.isAdmin) {
        router.replace('/admin/dashboard');
    } else {
        router.replace('/admin/login');
    }
  }, [router]);

  return null; // or a loading spinner
}
