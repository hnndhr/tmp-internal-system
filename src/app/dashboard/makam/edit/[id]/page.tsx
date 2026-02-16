import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getBlokMakamList, getMakamById } from '@/services/makam/get-makam';
import { updateMakam } from '@/services/makam/update-makam';
import { MakamForm } from '@/features/makam/components/MakamForm';
import { requireMaster } from '@/lib/auth/require-role';

export default async function EditMakamPage({ params }: { params: { id: string } }) {
  await requireMaster();
  const { id } = await params;
  const blokList = await getBlokMakamList();
  const makam = await getMakamById(id);

  const updateAction = updateMakam.bind(null, id);

  return (
    <DashboardLayout title="Edit Makam">
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold mb-6">Edit Data Makam</h2>
        <MakamForm blokOptions={blokList} action={updateAction} initialData={makam} />
      </div>
    </DashboardLayout>
  );
}
