
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const links = [
  { href: '/employee/home', label: 'Dashboard', icon: Home },
  { href: '/employee/profile', label: 'Profile', icon: User },
];

export function EmployeeSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
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
