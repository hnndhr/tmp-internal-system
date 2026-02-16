'use client';

import { useFormState } from 'react-dom';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { BlokMakam } from '@/types/database';
import { MakamWithBlok } from '@/types/makam';
import { useState } from 'react';

interface MakamFormProps {
  blokOptions: BlokMakam[];
  action: (prevState: any, formData: FormData) => Promise<any>;
  initialData?: MakamWithBlok;
}

export function MakamForm({ blokOptions, action, initialData }: MakamFormProps) {
  const [state, formAction] = useFormState(action, { error: undefined });
  const [isLoading, setIsLoading] = useState(false);

  const blokSelectOptions = blokOptions.map((blok) => ({
    value: blok.id,
    label: blok.nama_blok,
  }));

  return (
    <form
      action={async (formData) => {
        setIsLoading(true);
        await formAction(formData);
        setIsLoading(false);
      }}
      className="bg-white rounded-lg shadow p-6 space-y-6"
    >
      {state?.error && <Alert type="error" message={state.error} />}

      <Select
        name="blok_id"
        label="Blok Makam"
        options={blokSelectOptions}
        required
        disabled={isLoading}
        defaultValue={initialData?.blok_id}
      />

      <Input
        name="nomor_makam"
        type="text"
        label="Nomor Makam"
        placeholder="Contoh: A-001"
        required
        disabled={isLoading}
        defaultValue={initialData?.nomor_makam}
      />

      <Input
        name="nama_almarhum"
        type="text"
        label="Nama Almarhum"
        placeholder="Opsional"
        disabled={isLoading}
        defaultValue={initialData?.nama_almarhum || ''}
      />

      <Input
        name="tanggal_wafat"
        type="date"
        label="Tanggal Wafat"
        disabled={isLoading}
        defaultValue={initialData?.tanggal_wafat || ''}
      />

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={isLoading}
          onClick={() => window.history.back()}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}
