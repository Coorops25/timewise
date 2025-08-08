
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { AdminSidebarNav } from '@/components/admin-sidebar-nav';
import { Header } from '@/components/header';
import { user } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const adminUser = user.isAdmin ? user : null;

    useEffect(() => {
        // Mock authentication check
        if (!adminUser) {
            router.push('/admin/login');
        }
    }, [router, adminUser]);

    if (!adminUser) {
        return null; // or a loading spinner
    }
    
    return (
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2 p-2">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-lg font-semibold">TimeWise</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <AdminSidebarNav />
            </SidebarContent>
            <SidebarFooter>
              <div className="flex items-center gap-3 p-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={adminUser.avatar} alt={adminUser.name} data-ai-hint="profile picture" />
                  <AvatarFallback>{adminUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold truncate">{adminUser.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{adminUser.email}</span>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </SidebarProvider>
    )
}
