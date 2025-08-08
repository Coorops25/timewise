import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { user } from '@/lib/data';
import { Camera } from 'lucide-react';

function ProfileDetail({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <Label className="text-sm font-medium text-muted-foreground col-span-1">{label}</Label>
      <div className="col-span-2 text-sm">{value || '-'}</div>
    </div>
  );
}

export function UserProfile() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`https://placehold.co/100x100.png`} alt={user.name} data-ai-hint="profile picture"/>
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.jobTitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileDetail label="Employee ID" value={user.employeeId} />
        <ProfileDetail label="Department" value={user.department} />
        <ProfileDetail label="Email" value={user.email} />
        <ProfileDetail label="Phone" value={user.phone} />
        <ProfileDetail label="Shift" value={user.shift} />
        <ProfileDetail label="Hire Date" value={new Date(user.hireDate).toLocaleDateString()} />
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
            <Camera className="mr-2 h-4 w-4"/>
            Change Profile Photo
        </Button>
      </CardFooter>
    </Card>
  );
}
