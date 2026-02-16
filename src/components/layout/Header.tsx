'use client';

import { logout } from '@/services/auth/logout';
import { Button } from '../ui/Button';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <form action={logout}>
          <Button type="submit" variant="secondary" size="sm">
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
}
