'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Modal } from '@/components/ui/Modal';
import { createUser } from '@/services/users/create-users';

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserForm({ isOpen, onClose }: UserFormProps) {
  const [state, formAction] = useFormState(createUser, { error: undefined });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const result = await createUser(formData);
    setIsLoading(false);
    
    if (result.success) {
      onClose();
    }
  };

  const roleOptions = [
    { value: '', label: 'Pilih Role' },
    { value: 'operator', label: 'Operator' },
    { value: 'master', label: 'Master' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah User Baru">
      <form action={handleSubmit} className="space-y-4">
        {state?.error && <Alert type="error" message={state.error} />}

        <Input
          name="username"
          type="text"
          label="Username"
          placeholder="Contoh: operator1"
          required
          disabled={isLoading}
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Minimal 6 karakter"
          required
          minLength={6}
          disabled={isLoading}
        />

        <Select
          name="role"
          label="Role"
          options={roleOptions}
          required
          disabled={isLoading}
        />

        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <p className="font-medium mb-1">Catatan:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Operator: Hanya bisa lihat data makam dan input tamu</li>
            <li>Master: Akses penuh ke semua fitur</li>
          </ul>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Membuat User...' : 'Buat User'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
        </div>
      </form>
    </Modal>
  );
}
