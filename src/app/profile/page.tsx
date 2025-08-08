import { ProfileForm } from '@/components/profile/ProfileForm';
import { TimeHistory } from '@/components/profile/TimeHistory';

export default function ProfilePage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
       <h2 className="text-3xl font-bold tracking-tight">Profile & Settings</h2>
       <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
            <ProfileForm />
        </div>
        <div className="lg:col-span-3">
            <TimeHistory />
        </div>
      </div>
    </main>
  );
}
