import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/contants';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export async function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const user = await getSession();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container-custom py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
