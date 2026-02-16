'use client';

import { Table, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { TamuRombongan } from '@/types/database';
import { formatDate } from '@/lib/utils/format-date';
import { deleteTamuRombongan } from '@/services/tamu/tamu-rombongan';
import { useState } from 'react';

interface TamuRombonganTableProps {
  data: TamuRombongan[];
  isMaster: boolean;
}

export function TamuRombonganTable({ data, isMaster }: TamuRombonganTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data rombongan ini?')) return;

    setDeleting(id);
    const result = await deleteTamuRombongan(id);
    if (result.error) {
      alert(result.error);
    }
    setDeleting(null);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Belum ada data tamu rombongan</p>
      </div>
    );
  }

  return (
    <Table headers={['Nama Rombongan', 'Jumlah', 'Tanggal Kunjungan', 'Keperluan', 'Aksi']}>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="font-semibold">{item.nama_rombongan}</TableCell>
          <TableCell>{item.jumlah} orang</TableCell>
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
