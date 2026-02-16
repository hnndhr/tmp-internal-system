import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Desktop Image - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4">TMP Internal System</h1>
          <p className="text-xl">Sistem Pengelolaan Taman Makam Pahlawan</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <div className="bg-formBg rounded-lg shadow-lg p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
              <p className="text-gray-600">Masuk ke sistem internal</p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
