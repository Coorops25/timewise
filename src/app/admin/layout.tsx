'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { user } from '@/lib/data';

export default function AdminAuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();

    useEffect(() => {
        // Mock authentication check for admin pages
        if (user.role !== 'Admin') {
            router.push('/admin'); // Redirect non-admins to the admin login page
        }
    }, [router, user.role]);

    // Render children only if the user is an admin
    return user.role === 'Admin' ? <>{children}</> : null; // Or a loading indicator
}
