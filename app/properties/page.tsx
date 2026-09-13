import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

interface PropertyPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const supabase = await createClient();
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-neutral-900 pb-20">
      {/* Navegação Superior */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Voltar à coleção
        </Link>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Coluna Esquerda: Galeria & Informação Principal (8 colunas) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Imagem Principal em Destaque */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
            <img
              src={property.image_url}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Cabeçalho do Alojamento */}
          <div className="border-b border-neutral-200 pb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Alojamento Local • {property.location}
            </span>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mt-2">
              {property.title}
            </h1>
            
            {/* Especificações Rápidas */}
            <div className="flex items-center space-x-6 mt-6 text-sm text-neutral-600">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-neutral-900">{property.bedrooms}</span>
                <span>{property.bedrooms === 1 ? 'Quarto' : 'Quartos'}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-neutral-900">{property.bathrooms}</span>
                <span>{property.bathrooms === 1 ? 'Casa de Banho' : 'Casas de Banho'}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-neutral-900">Até {property.bedrooms * 2}</span>
                <span>Hóspedes</span>
              </div>
            </div>
          </div>

          {/* Descrição Editorial */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium tracking-tight text-neutral-900">
              Sobre este refúgio
            </h2>
            <p className="text-neutral-700 leading-relaxed font-normal whitespace-pre-line text-lg">
              {property.description}
            </p>
          </div>

          {/* Comodidades & Destaques */}
          <div className="border-t border-neutral-200 pt-8 space-y-4">
            <h3 className="text-lg font-medium text-neutral-900">Destaques da Propriedade</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-neutral-600">
              <div className="flex items-center space-x-2">
                <span>✓ Vista Panorâmica</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓ Design de Autor</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓ Wi-Fi de Alta Velocidade</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓ Estacionamento Privativo</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓ Cozinha Equipada</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓ Ar Condicionado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Caixa de Pedido de Reserva (4 colunas) */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-6">
            
            {/* Preço */}
            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-3xl font-light text-neutral-900">€{property.price}</span>
                <span className="text-sm text-neutral-500"> / noite</span>
              </div>
            </div>

            {/* Formulário Simulado de Datas */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-2 border border-neutral-200 rounded-xl p-3 bg-neutral-50/50">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-400">Check-in</label>
                  <input 
                    type="date" 
                    className="w-full bg-transparent text-sm text-neutral-800 focus:outline-none mt-1" 
                  />
                </div>
                <div className="border-l border-neutral-200 pl-3">
                  <label className="block text-xs font-semibold uppercase text-neutral-400">Check-out</label>
                  <input 
                    type="date" 
                    className="w-full bg-transparent text-sm text-neutral-800 focus:outline-none mt-1" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1">Hóspedes</label>
                <select className="w-full border border-neutral-200 rounded-xl p-3 text-sm bg-white focus:outline-none">
                  <option>1 Hóspede</option>
                  <option defaultValue="2">2 Hóspedes</option>
                  <option>3 Hóspedes</option>
                  <option>4 Hóspedes</option>
                </select>
              </div>

              <button
                type="button"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-3.5 rounded-xl transition-all shadow-sm"
              >
                Solicitar Reserva
              </button>
            </form>

            <p className="text-center text-xs text-neutral-400">
              Sem custos imediatos • O anfitrião responderá em 24h
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}