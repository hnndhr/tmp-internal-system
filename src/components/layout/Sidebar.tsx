'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/contants';
import { User } from '@/types/user';

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Makam', href: ROUTES.MAKAM, icon: '📍', roles: ['operator', 'master'] },
    { name: 'Tamu Umum', href: ROUTES.TAMU_UMUM, icon: '👤', roles: ['operator', 'master'] },
    { name: 'Tamu Rombongan', href: ROUTES.TAMU_ROMBONGAN, icon: '👥', roles: ['operator', 'master'] },
    { name: 'Users', href: ROUTES.USERS, icon: '⚙️', roles: ['master'] },
  ];

  const filteredNav = navigation.filter((item) => item.roles.includes(user.role));

  return (
    <div className="flex flex-col w-64 bg-primary min-h-screen">
      <div className="flex items-center justify-center h-16 px-4 bg-primaryHover">
        <h1 className="text-white text-lg font-bold">TMP System</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredNav.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primaryHover text-white'
                  : 'text-gray-300 hover:bg-primaryHover hover:text-white'
              }`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primaryHover">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-primaryHover flex items-center justify-center text-white font-semibold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-white text-sm font-medium">{user.username}</p>
            <p className="text-gray-400 text-xs capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
