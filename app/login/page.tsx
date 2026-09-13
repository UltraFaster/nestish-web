'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-neutral-900">nestish.</h1>
          <p className="mt-2 text-sm text-neutral-600">Acede à tua conta</p>
        </div>

        {errorMsg && (
          <div className="rounded bg-red-50 p-3 text-sm text-red-600">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800 [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:[text-fill-color:#171717] [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]"
              placeholder="exemplo@nestish.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-neutral-700">Palavra-passe</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-medium text-emerald-800 hover:text-emerald-950 focus:outline-none"
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-neutral-300 bg-white py-2 pl-3 pr-10 text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800 [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:[text-fill-color:#171717] [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-neutral-500 hover:text-neutral-800"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-emerald-950 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-900 disabled:opacity-50"
          >
            {loading ? 'A iniciar sessão...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-600">
          Ainda não tens conta?{' '}
          <Link href="/register" className="font-medium text-emerald-800 hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}