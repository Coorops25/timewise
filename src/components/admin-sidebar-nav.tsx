
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
];

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(link.href)}
            className={cn(
              'group-data-[collapsible=icon]:justify-center'
            )}
            tooltip={{
              children: link.label,
            }}
          >
            <Link href={link.href}>
              <link.icon className="shrink-0" />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
