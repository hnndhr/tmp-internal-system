'use client';

import { Table, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { MakamWithBlok } from '@/types/makam';
import { formatDate } from '@/lib/utils/format-date';
import Link from 'next/link';
import { ROUTES } from '@/lib/contants';
import { deleteMakam } from '@/services/makam/delete-makam';
import { useState } from 'react';

interface MakamTableProps {
  data: MakamWithBlok[];
  isMaster: boolean;
}

export function MakamTable({ data, isMaster }: MakamTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data makam ini?')) return;

    setDeleting(id);
    const result = await deleteMakam(id);
    if (result.error) {
      alert(result.error);
    }
    setDeleting(null);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Belum ada data makam</p>
      </div>
    );
  }

  return (
    <Table headers={['Blok', 'Nomor', 'Nama Almarhum', 'Tanggal Wafat', 'Aksi']}>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.blok_makam.nama_blok}</TableCell>
          <TableCell className="font-semibold">{item.nomor_makam}</TableCell>
          <TableCell>{item.nama_almarhum || '-'}</TableCell>
          <TableCell>
            {item.tanggal_wafat ? formatDate(item.tanggal_wafat) : '-'}
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              {isMaster && (
                <>
                  <Link href={`${ROUTES.MAKAM_EDIT}/${item.id}`}>
                    <Button size="sm" variant="secondary">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                  >
                    {deleting === item.id ? 'Menghapus...' : 'Hapus'}
                  </Button>
                </>
              )}
              {!isMaster && <span className="text-gray-400 text-sm">Lihat saja</span>}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
