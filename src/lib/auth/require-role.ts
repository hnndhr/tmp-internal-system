import { getSession } from './session';
import { UserRole } from '@/types/database';

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await getSession();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  
  return user;
}

export async function requireMaster() {
  return requireRole(['master']);
}

export function isMaster(role: UserRole): boolean {
  return role === 'master';
}

export function isOperator(role: UserRole): boolean {
  return role === 'operator';
}

