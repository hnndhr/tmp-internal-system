'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Modal } from '@/components/ui/Modal';
import { createTamuRombongan } from '@/services/tamu/tamu-rombongan';

interface TamuRombonganFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TamuRombonganForm({ isOpen, onClose }: TamuRombonganFormProps) {
  const [state, formAction] = useFormState(createTamuRombongan, { error: undefined });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const result = await createTamuRombongan(formData);
    setIsLoading(false);
    
    if (result.success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Tamu Rombongan">
      <form action={handleSubmit} className="space-y-4">
        {state?.error && <Alert type="error" message={state.error} />}

        <Input
          name="nama_rombongan"
          type="text"
          label="Nama Rombongan"
          placeholder="Contoh: SMA Negeri 1 Jakarta"
          required
          disabled={isLoading}
        />

        <Input
          name="jumlah"
          type="number"
          label="Jumlah Orang"
          placeholder="Contoh: 50"
          required
          min="1"
          disabled={isLoading}
        />

        <Input
          name="tanggal_kunjungan"
          type="date"
          label="Tanggal Kunjungan"
          required
          disabled={isLoading}
          defaultValue={new Date().toISOString().split('T')[0]}
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keperluan
          </label>
          <textarea
            name="keperluan"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
            placeholder="Opsional"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
        </div>
      </form>
    </Modal>
  );
}
