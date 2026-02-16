'use client';

import { useEffect, useState } from 'react';
import { TamuRombonganTable } from '@/features/tamu-rombongan/components/TamuRombonganTable';
import { TamuRombonganForm } from '@/features/tamu-rombongan/components/TamuRombonganForm';
import { Button } from '@/components/ui/Button';
import { getTamuRombonganList } from '@/services/tamu/tamu-rombongan';
import { getSession } from '@/services/auth/get-session';
import { TamuRombongan } from '@/types/database';
import { PageLoader } from '@/components/feedback/LoadingSpinner';

export default function TamuRombonganPage() {
  const [data, setData] = useState<TamuRombongan[]>([]);
  const [isMaster, setIsMaster] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [tamuResult, sessionResult] = await Promise.all([
        getTamuRombonganList({ page: 1, pageSize: 50 }),
        getSession(),
      ]);
      
      setData(tamuResult.data);
      setIsMaster(sessionResult?.role === 'master');
      setIsLoading(false);
    }
    
    loadData();
  }, [isFormOpen]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Daftar Tamu Rombongan</h2>
          <p className="text-sm text-gray-600">Total: {data.length} rombongan</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>+ Tambah Rombongan</Button>
      </div>

      <TamuRombonganTable data={data} isMaster={isMaster} />

      <TamuRombonganForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
