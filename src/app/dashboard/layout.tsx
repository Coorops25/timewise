
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { user } from '@/lib/data';


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();

    useEffect(() => {
        // Mock authentication check
        if (user.isAdmin) {
            router.push('/admin');
        }
    }, [router]);

    if (user.isAdmin) {
        return null; // or a loading spinner
    }

    return (
       <>
        {children}
       </>
    )
}
