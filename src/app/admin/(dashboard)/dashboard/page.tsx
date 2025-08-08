
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart3, Users, Settings, Activity, UserCircle } from 'lucide-react';
import Link from 'next/link';

const adminFeatures = [
    {
        title: 'User Management',
        description: 'Create, edit, and manage all user accounts.',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Attendance Records',
        description: 'View and manage all attendance logs.',
        href: '/admin/reports',
        icon: Activity,
    },
    {
        title: 'Reports & Analytics',
        description: 'Generate reports and view analytics.',
        href: '/admin/reports',
        icon: BarChart3,
    },
    {
        title: 'Admin Profile',
        description: 'View and manage your admin profile.',
        href: '/admin/profile',
        icon: UserCircle,
    },
    {
        title: 'System Settings',
        description: 'Configure application settings.',
        href: '/admin/settings',
        icon: Settings,
    }
]

export default function AdminDashboardPage() {
  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      <p className="text-muted-foreground">Welcome, Admin. Here's a quick overview of your workspace.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminFeatures.map((feature) => (
            <Link href={feature.href} key={feature.title}>
                <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {feature.title}
                        </CardTitle>
                        <feature.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>

    </main>
  );
}
