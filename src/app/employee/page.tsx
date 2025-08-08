
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { user } from '@/lib/data';

export default function EmployeeRedirect() {
  const router = useRouter();

  useEffect(() => {
    // If an authenticated user lands here, redirect to home.
    // Otherwise, the layout will handle redirection to login.
    if (user && !user.isAdmin) {
        router.push('/employee/home');
    }
  }, [router]);

  return null; // or a loading spinner
}
