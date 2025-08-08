'use client';

import { useState, useEffect } from 'react';
import { generateSmartNotification } from '@/ai/flows/generate-smart-notification';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function SmartNotification() {
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotification() {
      try {
        const result = await generateSmartNotification({
          userName: 'Alex',
          missedClockOut: true,
          unusualWorkPattern: false,
        });
        setNotification(result.notificationMessage);
      } catch (error) {
        console.error('Failed to fetch smart notification:', error);
        setNotification('Could not load smart suggestion at this time.');
      } finally {
        setLoading(false);
      }
    }

    fetchNotification();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle>Smart Notification</CardTitle>
        </div>
        <CardDescription>AI-powered suggestions to help you manage time.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : (
          <p className="text-sm">{notification}</p>
        )}
      </CardContent>
    </Card>
  );
}
