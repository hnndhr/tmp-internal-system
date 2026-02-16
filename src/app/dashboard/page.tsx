import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getSession } from '@/lib/auth/session';
import Link from 'next/link';
import { ROUTES } from '@/lib/contants';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getSession();

  // Jika sesi tidak ditemukan, paksa balik ke login
  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  // Tipe data any[] ditambahkan agar tidak error saat push ROUTES.USERS
  const cards: any[] = [
    {
      title: 'Makam',
      description: 'Kelola data makam dan blok',
      href: ROUTES.MAKAM,
      icon: '📍',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'Tamu Umum',
      description: 'Pencatatan pengunjung individual',
      href: ROUTES.TAMU_UMUM,
      icon: '👤',
      color: 'bg-green-50 border-green-200',
    },
    {
      title: 'Tamu Rombongan',
      description: 'Pencatatan kunjungan rombongan',
      href: ROUTES.TAMU_ROMBONGAN,
      icon: '👥',
      color: 'bg-purple-50 border-purple-200',
    },
  ];

  // Tambahkan menu admin hanya jika role benar-benar 'master'
  if (user.role === 'master') {
    cards.push({
      title: 'Users',
      description: 'Kelola pengguna sistem',
      href: ROUTES.USERS,
      icon: '⚙️',
      color: 'bg-orange-50 border-orange-200',
    });
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-lg text-gray-600">
          Selamat datang, <span className="font-semibold">{user.username}</span>
        </h2>
        <p className="text-sm text-gray-500 capitalize">Role: {user.role}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`block p-6 rounded-xl border-2 transition-all hover:shadow-md ${card.color}`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="text-lg font-bold mb-1">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}