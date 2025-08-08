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

function ProfileDetail({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <Label className="text-sm font-medium text-muted-foreground col-span-1">{label}</Label>
      <div className="col-span-2 text-sm">{value || '-'}</div>
    </div>
  );
}


function ChangePhotoModal() {
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
                    <AvatarImage src={`https://placehold.co/150x150.png`} alt={user.name} data-ai-hint="profile picture"/>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
            <Input type="file" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export function UserProfile() {
  const [formattedHireDate, setFormattedHireDate] = useState('');

  useEffect(() => {
    if(user.hireDate) {
      setFormattedHireDate(new Date(user.hireDate).toLocaleDateString());
    }
  }, []);

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
        <ProfileDetail label="Hire Date" value={formattedHireDate} />
      </CardContent>
      <CardFooter>
        <ChangePhotoModal />
      </CardFooter>
    </Card>
  );
}
