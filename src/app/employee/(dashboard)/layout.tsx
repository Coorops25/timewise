
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { EmployeeSidebarNav } from '@/components/employee-sidebar-nav';
import { Header } from '@/components/header';
import { user } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EmployeeDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();

    useEffect(() => {
        // Mock authentication check
        if (!user || user.isAdmin) {
            router.push('/employee/login');
        }
    }, [router]);

    if (!user || user.isAdmin) {
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
              <EmployeeSidebarNav />
            </SidebarContent>
            <SidebarFooter>
              <div className="flex items-center gap-3 p-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://placehold.co/100x100.png`} alt={user.name} data-ai-hint="profile picture" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <Header user={user} profilePath="/employee/profile" />
            {children}
          </SidebarInset>
        </SidebarProvider>
    )
}
