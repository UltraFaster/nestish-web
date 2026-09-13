'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="border-b border-neutral-100 bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* LOGO VERDE ESMERALDA DEFINIDO E MARCANTE */}
        <Link href="/" className="font-serif text-2xl font-black text-[#00966b] tracking-tight hover:opacity-90 transition antialiased">
          nestish.
        </Link>

        {/* MENUS E AUTENTICAÇÃO */}
        <div className="flex items-center gap-6 text-sm font-medium">
          
          <Link href="/anunciar" className="hidden md:inline-block text-neutral-500 hover:text-neutral-900 transition font-normal">
            Anuncie o seu espaço
          </Link>

          <span className="hidden md:inline text-neutral-200">|</span>

          {!loading && (
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/dashboard" className="font-normal text-neutral-800 hover:text-[#00966b] transition">
                    As minhas reservas
                  </Link>
                  
                  <span className="text-neutral-200">|</span>
                  
                  {/* Bloco do Email Visível e Organizado */}
                  <span className="text-xs text-neutral-600 bg-neutral-50 border border-neutral-200 px-2.5 py-1.5 rounded font-mono hidden lg:inline max-w-[180px] truncate">
                    {user.email}
                  </span>
                  
                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-red-600 hover:text-red-800 border border-red-200 bg-red-50 hover:bg-red-100 transition px-3 py-1.5 rounded"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-neutral-900 transition font-normal text-neutral-700">
                    Iniciar Sessão
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-md bg-[#00966b] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#007d59] shadow-sm"
                  >
                    Criar Conta
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
