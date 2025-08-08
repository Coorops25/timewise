
import { generateSmartNotification } from '@/ai/flows/generate-smart-notification';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export async function SmartNotification() {
  const notification = await generateSmartNotification({
    userName: 'Alex',
    missedClockOut: true,
    unusualWorkPattern: false,
  });

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
        <p className="text-sm">{notification.notificationMessage}</p>
      </CardContent>
    </Card>
  );
}
