'use client';

import { Table, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { TamuUmum } from '@/types/database';
import { formatDate } from '@/lib/utils/format-date';
import { deleteTamuUmum } from '@/services/tamu/tamu-umum';
import { useState } from 'react';

interface TamuUmumTableProps {
  data: TamuUmum[];
  isMaster: boolean;
}

export function TamuUmumTable({ data, isMaster }: TamuUmumTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data tamu ini?')) return;

    setDeleting(id);
    const result = await deleteTamuUmum(id);
    if (result.error) {
      alert(result.error);
    }
    setDeleting(null);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Belum ada data tamu umum</p>
      </div>
    );
  }

  return (
    <Table headers={['Nama', 'Tanggal Kunjungan', 'Keperluan', 'Aksi']}>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="font-semibold">{item.nama}</TableCell>
          <TableCell>{formatDate(item.tanggal_kunjungan)}</TableCell>
          <TableCell>{item.keperluan || '-'}</TableCell>
          <TableCell>
            {isMaster && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDelete(item.id)}
                disabled={deleting === item.id}
              >
                {deleting === item.id ? 'Menghapus...' : 'Hapus'}
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
