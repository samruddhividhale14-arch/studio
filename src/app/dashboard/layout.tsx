'use client';
import type { PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BrainCircuit, CalendarCheck, Home, Leaf, LogOut, Settings, Tractor, User, Loader2 } from 'lucide-react';
import { doc, } from 'firebase/firestore';

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
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import type { Farmer } from '@/models/farmer';


function DashboardLayoutContent({ children }: PropsWithChildren) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const avatar = PlaceHolderImages.find((img) => img.id === 'avatar-male-1');
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  const farmerDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid, 'farmers', user.uid);
  }, [firestore, user]);

  const { data: farmer, isLoading: isFarmerLoading } = useDoc<Farmer>(farmerDocRef);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };
  
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || isFarmerLoading) {
    return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-10 w-10 animate-spin" /></div>;
  }
  
  if (!user) {
    return null; 
  }

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
                isActive={pathname === '/dashboard'}
              >
                <Link href="/dashboard">
                  <Home />
                  <span>{t('sidebar.dashboard')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                tooltip={t('sidebar.myFields')}
                isActive={pathname === '/dashboard/my-fields'}
              >
                <Link href="/dashboard/my-fields">
                  <Tractor />
                  <span>{t('sidebar.myFields')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={t('sidebar.aiSupport')}>
                <Link href="/dashboard/my-fields">
                  <BrainCircuit />
                  <span>{t('sidebar.aiSupport')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                tooltip={t('sidebar.bookAppointment')}
                isActive={pathname === '/dashboard/book-appointment'}
              >
                <Link href="/dashboard/book-appointment">
                  <CalendarCheck />
                  <span>{t('sidebar.bookAppointment')}</span>
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
                  <p className="text-sm font-medium">{farmer?.name || user?.displayName || t('sidebar.user.name')}</p>
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
              <DropdownMenuItem onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" />{t('sidebar.user.dropdown.logout')}</DropdownMenuItem>
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
