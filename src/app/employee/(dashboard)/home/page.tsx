
'use client';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { ClockingActions } from '@/components/dashboard/ClockingActions';
import { SmartNotification } from '@/components/dashboard/SmartNotification';
import { DailySummary } from '@/components/dashboard/DailySummary';
import { generateSmartNotification } from '@/ai/flows/generate-smart-notification';
import type { GenerateSmartNotificationOutput } from '@/ai/flows/generate-smart-notification';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [notification, setNotification] = useState<GenerateSmartNotificationOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotification() {
      try {
        const result = await generateSmartNotification({
          userName: 'Alex',
          missedClockOut: true,
          unusualWorkPattern: false,
        });
        setNotification(result);
      } catch (error) {
        console.error('Failed to fetch smart notification:', error);
        setNotification({ notificationMessage: 'Could not load smart suggestion at this time.' });
      } finally {
        setLoading(false);
      }
    }
    fetchNotification();
  }, []);

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <WelcomeHeader />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <ClockingActions />
          <SmartNotification notification={notification} loading={loading} />
        </div>
        <div className="lg:col-span-1">
          <DailySummary />
        </div>
      </div>
    </main>
  );
}
