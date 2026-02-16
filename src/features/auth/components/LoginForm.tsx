'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { login } from '@/services/auth/login';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

export function LoginForm() {
  const [state, formAction] = useFormState(login, { error: undefined });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setIsLoading(true);
        await formAction(formData);
        setIsLoading(false);
      }}
      className="space-y-6"
    >
      {state?.error && (
        <Alert type="error" message={state.error} />
      )}

      <Input
        name="username"
        type="text"
        label="Username"
        placeholder="Masukkan username"
        required
        autoComplete="username"
        disabled={isLoading}
      />

      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="Masukkan password"
        required
        autoComplete="current-password"
        disabled={isLoading}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Memproses...' : 'Login'}
      </Button>
    </form>
  );
}
