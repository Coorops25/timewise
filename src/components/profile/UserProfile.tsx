
'use client';

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { user } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

function ProfileDetail({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <Label className="text-sm font-medium text-muted-foreground col-span-1">{label}</Label>
      <div className="col-span-2 text-sm">{value || '-'}</div>
    </div>
  );
}


function EditProfileModal({ onUpdate }: { onUpdate: (data: Partial<typeof user>) => void }) {
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const { toast } = useToast();

  const handleSave = () => {
    onUpdate({ phone, address });
    toast({
        title: "Profile Updated",
        description: "Your contact information has been saved.",
    });
  }

  return (
     <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your contact information below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ChangePhotoModal() {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
     toast({
        title: "Photo Updated",
        description: "Your new profile photo has been saved.",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Change Profile Photo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Profile Photo</DialogTitle>
          <DialogDescription>
            Select a new photo to use for your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center">
                 <Avatar className="h-24 w-24">
                    <AvatarImage src={preview ?? `https://placehold.co/150x150.png`} alt={user.name} data-ai-hint="profile picture"/>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
            <Input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export function UserProfile() {
  const [currentUser, setCurrentUser] = useState(user);
  const [formattedHireDate, setFormattedHireDate] = useState('');

  useEffect(() => {
    if(currentUser.hireDate) {
      // Safely format the date on the client side to avoid hydration errors
      setFormattedHireDate(new Date(currentUser.hireDate).toLocaleDateString());
    }
  }, [currentUser.hireDate]);

  const handleUpdateUser = (data: Partial<typeof user>) => {
    setCurrentUser(prev => ({ ...prev, ...data }));
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://placehold.co/100x100.png`} alt={currentUser.name} data-ai-hint="profile picture"/>
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <CardTitle>{currentUser.name}</CardTitle>
                <CardDescription>{currentUser.jobTitle}</CardDescription>
              </div>
            </div>
             <EditProfileModal onUpdate={handleUpdateUser} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileDetail label="Employee ID" value={currentUser.employeeId} />
        <ProfileDetail label="Department" value={currentUser.department} />
        <ProfileDetail label="Email" value={currentUser.email} />
        <ProfileDetail label="Phone" value={currentUser.phone} />
        <ProfileDetail label="Address" value={currentUser.address} />
        <ProfileDetail label="Shift" value={currentUser.shift} />
        <ProfileDetail label="Hire Date" value={formattedHireDate} />
      </CardContent>
      <CardFooter>
        <ChangePhotoModal />
      </CardFooter>
    </Card>
  );
}
