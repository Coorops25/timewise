
import { UserManagement } from '@/components/admin/UserManagement';

export default function AdminUsersPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      <div className="space-y-8">
        <UserManagement />
      </div>
    </main>
  );
}
