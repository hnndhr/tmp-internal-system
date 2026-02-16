'use client';

import { Table, TableRow, TableCell } from '@/components/ui/Table';
import { Profile } from '@/types/database';
import { formatDate } from '@/lib/utils/format-date';

interface UsersTableProps {
  data: Profile[];
}

export function UsersTable({ data }: UsersTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Belum ada data user</p>
      </div>
    );
  }

  return (
    <Table headers={['Username', 'Email', 'Role', 'Tanggal Dibuat']}>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="font-semibold">{item.username}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                item.role === 'master'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {item.role}
            </span>
          </TableCell>
          <TableCell>{formatDate(item.created_at)}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
