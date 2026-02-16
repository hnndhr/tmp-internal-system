import { UserRole } from '@/types/database';

export interface UserFormData {
  username: string;
  password: string;
  role: UserRole;
}

