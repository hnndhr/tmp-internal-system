'use client';

import { useEffect, useState } from 'react';
import { UsersTable } from '@/features/users/components/UsersTable';
import { UserForm } from '@/features/users/components/UserForm';
import { Button } from '@/components/ui/Button';
import { getUsersList } from '@/services/users/get-users';
import { Profile } from '@/types/database';
import { PageLoader } from '@/components/feedback/LoadingSpinner';

export default function UsersPage() {
  const [data, setData] = useState<Profile[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await getUsersList({ page: 1, pageSize: 50 });
      setData(result.data);
      setIsLoading(false);
    }
    
    loadData();
  }, [isFormOpen]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Daftar Users</h2>
          <p className="text-sm text-gray-600">Total: {data.length} users</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>+ Tambah User</Button>
      </div>

      <UsersTable data={data} />

      <UserForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
