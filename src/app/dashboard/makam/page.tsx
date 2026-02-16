import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getMakamList, getBlokMakamList } from '@/services/makam/get-makam';
import { getSession } from '@/lib/auth/session';
import { MakamTable } from '@/features/makam/components/MakamTable';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/contants';

export default async function MakamPage() {
  const user = await getSession();
  const { data } = await getMakamList({ page: 1, pageSize: 50 });
  const isMaster = user?.role === 'master';

  return (
    <DashboardLayout title="Data Makam">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Daftar Makam</h2>
            <p className="text-sm text-gray-600">Total: {data.length} makam</p>
          </div>
          {isMaster && (
            <Link href={ROUTES.MAKAM_CREATE}>
              <Button>+ Tambah Makam</Button>
            </Link>
          )}
        </div>

        <MakamTable data={data} isMaster={isMaster} />
      </div>
    </DashboardLayout>
  );
}
