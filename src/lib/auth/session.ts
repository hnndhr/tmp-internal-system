import { createClient } from '@/lib/supabase/server';
import { User } from '@/types/user';
import { cache } from 'react';

export const getSession = cache(async () => {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return null;
  }

  return {
    id: profile.id,
    username: profile.username,
    email: profile.email,
    role: profile.role,
  } as User;
});

export async function requireAuth() {
  const user = await getSession();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

