
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailOnLate, setEmailOnLate] = useState(true);
  const [slackOnPto, setSlackOnPto] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSaveChanges = (feature: string) => {
    toast({
      title: 'Settings Saved',
      description: `${feature} settings have been updated successfully.`,
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your organization's security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Two-Factor Authentication (2FA)
                </p>
                <p className="text-sm text-muted-foreground">
                  Require a second verification step for all users.
                </p>
              </div>
              <Switch id="2fa-switch" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" placeholder="e.g., 30" defaultValue="30" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSaveChanges('Security')}>Save Security Settings</Button>
          </CardFooter>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Control how your organization receives alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Email on Late Clock-In
                </p>
                <p className="text-sm text-muted-foreground">
                  Send an email to managers for tardiness alerts.
                </p>
              </div>
              <Switch id="email-late-switch" checked={emailOnLate} onCheckedChange={setEmailOnLate} />
            </div>
             <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Slack on PTO Requests
                </p>
                <p className="text-sm text-muted-foreground">
                  Post new time-off requests to a Slack channel.
                </p>
              </div>
              <Switch id="slack-pto-switch" checked={slackOnPto} onCheckedChange={setSlackOnPto} />
            </div>
          </CardContent>
           <CardFooter>
            <Button onClick={() => handleSaveChanges('Notification')}>Save Notification Settings</Button>
          </CardFooter>
        </Card>

         {/* Integrations Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect TimeWise to other services. This feature is under construction.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">Integration options for Payroll, HRIS, and other systems will be available here.</p>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
