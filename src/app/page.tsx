import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { ROUTES } from '@/lib/contants';

export default async function HomePage() {
  const session = await getSession();

  if (session) {
    redirect(ROUTES.DASHBOARD);
  } else {
    redirect(ROUTES.LOGIN);
  }
}
