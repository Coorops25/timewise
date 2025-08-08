
'use client'
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { ClockingActions } from '@/components/dashboard/ClockingActions';
import { SmartNotification } from '@/components/dashboard/SmartNotification';
import { DailySummary } from '@/components/dashboard/DailySummary';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { user } from '@/lib/data';

export default function DashboardPage() {
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
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <WelcomeHeader />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <ClockingActions />
          <SmartNotification />
        </div>
        <div className="lg:col-span-1">
          <DailySummary />
        </div>
      </div>
    </main>
  );
}
