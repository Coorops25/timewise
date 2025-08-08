
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

function ProfileDetail({ label, value }: { label: string; value: string | undefined }) {
    return (
      <div className="grid grid-cols-3 items-center gap-2">
        <Label className="text-sm font-medium text-muted-foreground col-span-1">{label}</Label>
        <div className="col-span-2 text-sm">{value || '-'}</div>
      </div>
    );
  }

export default function AdminProfilePage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Admin Profile</h2>
       <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`https://placehold.co/100x100.png`} alt={'Admin'} data-ai-hint="profile picture"/>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <CardTitle>Admin</CardTitle>
            <CardDescription>System Administrator</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileDetail label="Username" value={'Admin123'} />
        <ProfileDetail label="Email" value={'admin@timewise.com'} />
        <ProfileDetail label="Role" value={'Administrator'} />
      </CardContent>
    </Card>
    </main>
  );
}
