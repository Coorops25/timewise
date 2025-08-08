
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminSettingsPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <Card>
        <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Manage global application settings here. This feature is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">More settings will be available in a future version.</p>
        </CardContent>
      </Card>
    </main>
  );
}
