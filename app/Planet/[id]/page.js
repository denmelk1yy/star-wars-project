import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackButton from '../../hero/[id]/BackButton';

// Отримання даних планети
async function getPlanet(id) {
  const res = await fetch(`https://swapi.py4e.com/api/planets/${id}/`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) return null;
  return res.json();
}

// Паралельне завантаження пов'язаних сутностей (жителів або фільмів)
async function fetchEntities(urls) {
  if (!urls || urls.length === 0) return [];

  const requests = urls.map(async (url) => {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return res.json();
  });

  const results = await Promise.all(requests);
  return results.filter(Boolean);
}

export default async function PlanetDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const planet = await getPlanet(id);

  if (!planet) {
    notFound();
  }

  // Завантажуємо мешканців та фільми
  const [residents, films] = await Promise.all([
    fetchEntities(planet.residents),
    fetchEntities(planet.films),
  ]);

  return (
    <main className="relative min-h-screen w-full bg-black text-white px-4 py-12 selection:bg-red-600 selection:text-white">
      {/* Червоне неонове світіння та сітка */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/25 via-black to-black pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <BackButton />
        </div>

        {/* Головна картка планети */}
        <div className="rounded-2xl border border-red-500/20 bg-zinc-950/80 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_50px_rgba(239,68,68,0.12)] space-y-8">
          
          {/* Шапка досьє планети */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.3em] text-red-500/90 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] block mb-1">
                АСТРО-РЕЄСТР // ОРБІТАЛЬНІ ДАНІ
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-wide text-zinc-100">
                {planet.name}
              </h1>
            </div>
            <span className="text-xs font-mono tracking-widest px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-red-400">
              SECTOR // {id.padStart(3, '0')}
            </span>
          </div>

          {/* Плашки основних астрофізичних параметрів */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30">
              <span className="text-zinc-500 block mb-1 text-[11px]">Населення:</span>
              <span className="text-red-400 font-semibold truncate block">
                {planet.population === 'unknown' ? 'Невідомо' : Number(planet.population).toLocaleString('uk-UA')}
              </span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30">
              <span className="text-zinc-500 block mb-1 text-[11px]">Діаметр:</span>
              <span className="text-zinc-200 font-semibold">{planet.diameter} км</span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30">
              <span className="text-zinc-500 block mb-1 text-[11px]">Гравітація:</span>
              <span className="text-zinc-200 font-semibold">{planet.gravity}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30">
              <span className="text-zinc-500 block mb-1 text-[11px]">Водна поверхня:</span>
              <span className="text-cyan-400 font-semibold">{planet.surface_water}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Ліва колонка: Детальні кліматичні та орбітальні характеристики */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                Ландшафт та циклічність
              </h2>

              <div className="space-y-2.5 text-xs font-mono bg-zinc-900/30 border border-zinc-900 rounded-xl p-4">
                <div className="flex justify-between py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Кліматичні зони:</span>
                  <span className="capitalize text-zinc-200">{planet.climate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Тип ландшафту:</span>
                  <span className="capitalize text-zinc-200">{planet.terrain}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Період обертання (доба):</span>
                  <span className="text-zinc-200">{planet.rotation_period} год.</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500">Орбітальний період (рік):</span>
                  <span className="text-red-400 font-semibold">{planet.orbital_period} дн.</span>
                </div>
              </div>

              {/* Появи в епізодах (фільми) */}
              <div className="pt-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_6px_#FFE81F]" />
                  Зафіксовано у фільмах ({films.length})
                </h3>

                <div className="space-y-2">
                  {films.length > 0 ? (
                    films.map((film) => {
                      const filmId = film.url.split('/').filter(Boolean).pop();

                      return (
                        <Link
                          key={film.url}
                          href={`/Film/${filmId}`}
                          className="group flex items-center justify-between p-3 rounded-lg border border-zinc-900 bg-zinc-900/20 hover:border-yellow-400/40 hover:bg-zinc-900/60 transition-all"
                        >
                          <span className="text-xs font-mono text-zinc-300 group-hover:text-yellow-300 transition-colors">
                            Епізод {film.episode_id}: {film.title}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-600 group-hover:text-yellow-400 transition-all">
                            Перейти →
                          </span>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-xs font-mono text-zinc-600 p-2">У фільмах не з'являлась</p>
                  )}
                </div>
              </div>
            </div>

            {/* Права колонка: Відомі уродженці та жителі */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                  Відомі уродженці / Мешканці
                </span>
                <span className="text-zinc-600 font-mono text-xs">({residents.length})</span>
              </h2>

              <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1 border border-zinc-900 rounded-xl p-2 bg-zinc-900/20">
                {residents.length > 0 ? (
                  residents.map((resident) => {
                    const residentId = resident.url.split('/').filter(Boolean).pop();

                    return (
                      <Link
                        key={resident.url}
                        href={`/hero/${residentId}`}
                        className="group flex items-center justify-between p-2.5 rounded-lg border border-zinc-900 bg-zinc-950/70 hover:bg-zinc-900 hover:border-cyan-500/40 transition-all"
                      >
                        <span className="text-xs font-mono text-zinc-300 group-hover:text-cyan-300 transition-colors">
                          {resident.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all">
                          Досьє →
                        </span>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-xs font-mono text-zinc-600 p-3">
                    Дані про відомих мешканців відсутні або планета безлюдна
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}