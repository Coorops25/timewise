'use client';

import React from 'react'
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
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button as SemanticButton,
  Header,
  Image,
  Modal,
} from 'semantic-ui-react'

function ProfileDetail({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <Label className="text-sm font-medium text-muted-foreground col-span-1">{label}</Label>
      <div className="col-span-2 text-sm">{value || '-'}</div>
    </div>
  );
}


function ChangePhotoModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<SemanticButton className="w-full !bg-white !text-black !border-input !border hover:!bg-accent hover:!text-accent-foreground">Change Profile Photo</SemanticButton>}
    >
      <ModalHeader>Select a Photo</ModalHeader>
      <ModalContent image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <ModalDescription>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <SemanticButton color='black' onClick={() => setOpen(false)}>
          Nope
        </SemanticButton>
        <SemanticButton
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </ModalActions>
    </Modal>
  )
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
        <ChangePhotoModal />
      </CardFooter>
    </Card>
  );
}
