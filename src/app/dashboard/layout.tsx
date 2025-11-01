'use client';
import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import { BrainCircuit, Home, Leaf, LogOut, Settings, Tractor, User } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LanguageProvider, useLanguage } from '@/i18n/provider';

function DashboardLayoutContent({ children }: PropsWithChildren) {
  const { t } = useLanguage();
  const avatar = PlaceHolderImages.find((img) => img.id === 'avatar-male-1');
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-r border-border/60"
      >
        <SidebarHeader>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-headline text-xl font-bold"
          >
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-foreground">AgriSync</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={t('sidebar.dashboard')}
                isActive={true}
              >
                <Link href="/dashboard">
                  <Home />
                  <span>{t('sidebar.dashboard')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={t('sidebar.myFields')}>
                <Link href="#">
                  <Tractor />
                  <span>{t('sidebar.myFields')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={t('sidebar.aiSupport')}>
                <Link href="#">
                  <BrainCircuit />
                  <span>{t('sidebar.aiSupport')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                <Avatar className="h-8 w-8">
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={t('sidebar.user.avatarAlt')} data-ai-hint={avatar.imageHint} />}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">{t('sidebar.user.name')}</p>
                  <p className="text-xs text-muted-foreground">{t('sidebar.user.role')}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mb-2 w-56" side="top" align="start">
              <DropdownMenuLabel>{t('sidebar.user.dropdown.myAccount')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User className="mr-2 h-4 w-4" />{t('sidebar.user.dropdown.profile')}</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />{t('sidebar.user.dropdown.settings')}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/"><LogOut className="mr-2 h-4 w-4" />{t('sidebar.user.dropdown.logout')}</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <LanguageProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </LanguageProvider>
  )
}
