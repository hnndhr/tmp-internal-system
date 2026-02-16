'use client';

import { useEffect, useState } from 'react';
import { TamuUmumTable } from '@/features/tamu-umum/components/TamuUmumTable';
import { TamuUmumForm } from '@/features/tamu-umum/components/TamuUmumForm';
import { Button } from '@/components/ui/Button';
import { getTamuUmumList } from '@/services/tamu/tamu-umum';
import { getSession } from '@/services/auth/get-session';
import { TamuUmum } from '@/types/database';
import { PageLoader } from '@/components/feedback/LoadingSpinner';

export default function TamuUmumPage() {
  const [data, setData] = useState<TamuUmum[]>([]);
  const [isMaster, setIsMaster] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [tamuResult, sessionResult] = await Promise.all([
        getTamuUmumList({ page: 1, pageSize: 50 }),
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
          <h2 className="text-lg font-semibold">Daftar Tamu Umum</h2>
          <p className="text-sm text-gray-600">Total: {data.length} tamu</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>+ Tambah Tamu</Button>
      </div>

      <TamuUmumTable data={data} isMaster={isMaster} />

      <TamuUmumForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
