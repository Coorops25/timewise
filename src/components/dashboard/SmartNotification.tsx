
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { GenerateSmartNotificationOutput } from '@/ai/flows/generate-smart-notification';

interface SmartNotificationProps {
  notification: GenerateSmartNotificationOutput | null;
  loading: boolean;
}

export function SmartNotification({ notification, loading }: SmartNotificationProps) {
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
          <p className="text-sm">{notification?.notificationMessage}</p>
        )}
      </CardContent>
    </Card>
  );
}
