import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getBlokMakamList } from '@/services/makam/get-makam';
import { createMakam } from '@/services/makam/create-makam';
import { MakamForm } from '@/features/makam/components/MakamForm';
import { requireMaster } from '@/lib/auth/require-role';

export default async function CreateMakamPage() {
  await requireMaster();
  const blokList = await getBlokMakamList();

  return (
    <DashboardLayout title="Tambah Makam">
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold mb-6">Tambah Data Makam Baru</h2>
        <MakamForm blokOptions={blokList} action={createMakam} />
      </div>
    </DashboardLayout>
  );
}
