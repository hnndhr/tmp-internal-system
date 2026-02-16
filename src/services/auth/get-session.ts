'use server';

import { getSession as getSessionUtil } from '@/lib/auth/session';

export async function getSession() {
  return getSessionUtil();
}

