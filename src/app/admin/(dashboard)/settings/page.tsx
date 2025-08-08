
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  // State for switches
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailOnLate, setEmailOnLate] = useState(true);
  const [slackOnPto, setSlackOnPto] = useState(false);
  const [geofencing, setGeofencing] = useState(true);
  const [googleSheetsSync, setGoogleSheetsSync] = useState(false);
  const [slackIntegration, setSlackIntegration] = useState(true);


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
        
        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Manage global application settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="app-name">Application Name</Label>
                <Input id="app-name" defaultValue="TimeWise" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="timezone">Global Time Zone</Label>
                <Select>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmt-8">GMT-8:00 (Pacific Time)</SelectItem>
                    <SelectItem value="gmt-5">GMT-5:00 (Eastern Time)</SelectItem>
                    <SelectItem value="gmt">GMT+0:00 (Greenwich Mean Time)</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Enable Geofencing
                </p>
                <p className="text-sm text-muted-foreground">
                  Restrict clock-ins to specific geographic areas.
                </p>
              </div>
              <Switch id="geofencing-switch" checked={geofencing} onCheckedChange={setGeofencing} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSaveChanges('System')}>Save System Settings</Button>
          </CardFooter>
        </Card>

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
             <div className="space-y-2">
                <Label htmlFor="notification-email">Recipient Email for Digests</Label>
                <Input id="notification-email" type="email" placeholder="manager@example.com" />
            </div>
          </CardContent>
           <CardFooter>
            <Button onClick={() => handleSaveChanges('Notification')}>Save Notification Settings</Button>
          </CardFooter>
        </Card>

         {/* Integrations Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect TimeWise to other services.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Google Sheets Sync
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Automatically export attendance logs.
                  </p>
                </div>
                <Switch id="google-sheets-switch" checked={googleSheetsSync} onCheckedChange={setGoogleSheetsSync} />
              </div>
              <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Slack Integration
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Enable Slack notifications and commands.
                  </p>
                </div>
                <Switch id="slack-integration-switch" checked={slackIntegration} onCheckedChange={setSlackIntegration} />
              </div>
          </CardContent>
           <CardFooter>
            <Button onClick={() => handleSaveChanges('Integration')}>Save Integration Settings</Button>
          </CardFooter>
        </Card>

      </div>
    </main>
  );
}
