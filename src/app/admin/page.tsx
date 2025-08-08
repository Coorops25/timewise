import { UserManagement } from '@/components/admin/UserManagement';
import { AttendanceView } from '@/components/admin/AttendanceView';

export default function AdminPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      <div className="space-y-8">
        <UserManagement />
        <AttendanceView />
      </div>
    </main>
  );
}
