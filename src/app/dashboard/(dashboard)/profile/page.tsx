
'use client';
import { UserProfile } from '@/components/profile/UserProfile';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { TimeHistory } from '@/components/profile/TimeHistory';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { user } from '@/lib/data';

export default function ProfilePage() {
    const router = useRouter();

    useEffect(() => {
        // Mock authentication check
        if (!user || user.isAdmin) {
            router.push('/dashboard/login');
        }
    }, [router]);

    if (!user || user.isAdmin) {
        return null;
    }

  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
       <h2 className="text-3xl font-bold tracking-tight">Profile & Settings</h2>
       <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
            <UserProfile />
            <ProfileForm />
        </div>
        <div className="lg:col-span-2">
            <TimeHistory />
        </div>
      </div>
    </main>
  );
}
