import { Suspense } from 'react';
import Link from 'next/link';

// Отримання списку планет за номером сторінки зі SWAPI
async function getPlanets(page = 1) {
  const res = await fetch(`https://swapi.py4e.com/api/planets/?page=${page}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    return { results: [], count: 0, next: null, previous: null };
  }

  return res.json();
}

// Компонент перемикання сторінок
function PlanetsPagination({ currentPage, totalPages }) {
  return (
    <nav aria-label="Пагінація планет" className="flex items-center gap-2 mt-12 font-mono text-xs">
      <Link
        href={`?page=${currentPage - 1}`}
        aria-disabled={currentPage <= 1}
        className={`px-4 py-2 rounded-lg border transition-all ${
          currentPage <= 1
            ? 'pointer-events-none border-zinc-900 text-zinc-700 bg-zinc-950/40'
            : 'border-zinc-800 text-zinc-400 bg-zinc-950/80 hover:border-red-500/50 hover:text-red-400'
        }`}
      >
        ← Попередня
      </Link>

      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-900 bg-zinc-950/40 text-zinc-500">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={`?page=${pageNum}`}
              className={`h-7 w-7 flex items-center justify-center rounded transition-all ${
                isActive
                  ? 'bg-red-500/10 border border-red-500/50 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.35)]'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      <Link
        href={`?page=${currentPage + 1}`}
        aria-disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded-lg border transition-all ${
          currentPage >= totalPages
            ? 'pointer-events-none border-zinc-900 text-zinc-700 bg-zinc-950/40'
            : 'border-zinc-800 text-zinc-400 bg-zinc-950/80 hover:border-red-500/50 hover:text-red-400'
        }`}
      >
        Наступна →
      </Link>
    </nav>
  );
}

// 1. Асинхронний список планет
async function PlanetsList({ currentPage }) {
  const data = await getPlanets(currentPage);
  const planets = data.results || [];
  const totalPages = Math.ceil((data.count || 60) / 10);
     
  return (
    <>
      <div className="w-full flex justify-between items-center mb-6 text-xs font-mono text-zinc-500">
        <span>Сектор: Сторінка {currentPage} з {totalPages}</span>
        <span>Виявлено світів: {data.count}</span>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {planets.map((planet) => {
          const id = planet.url.split('/').filter(Boolean).pop();

          return (
            <div
              key={planet.url}
              className="group relative flex flex-col justify-between p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-sm transition-all duration-300 hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(239,68,68,0.2)] hover:-translate-y-1"
            >
              <div>
                {/* Верхня плашка ID */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-red-500/40 group-hover:text-red-300 transition-colors">
                    PL // 00{id}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 shadow-[0_0_8px_#ef4444]" />
                </div>

                {/* Назва планети */}
                <h2 className="text-xl font-bold tracking-wide text-zinc-100 group-hover:text-red-400 transition-colors">
                  {planet.name}
                </h2>

                {/* Астрофізичні характеристики */}
                <div className="mt-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Клімат:</span>
                    <span className="text-zinc-300 font-semibold capitalize truncate max-w-[120px]" title={planet.climate}>
                      {planet.climate}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Ландшафт:</span>
                    <span className="capitalize text-zinc-300 truncate max-w-[120px]" title={planet.terrain}>
                      {planet.terrain}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Гравітація:</span>
                    <span className="text-zinc-300">{planet.gravity}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Населення:</span>
                    <span className="text-red-400/90 font-semibold">
                      {planet.population === 'unknown' ? 'Невідомо' : Number(planet.population).toLocaleString('uk-UA')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">Діаметр:</span>
                    <span className="text-zinc-400">{planet.diameter} км</span>
                  </div>
                </div>
              </div>

              {/* Посилання на деталі */}
              <div className="mt-5 pt-3 border-t border-zinc-900 flex justify-end">
                <Link
                
                  href={`/Planet/${id}`}
                  className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 group-hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  Координати орбіти →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <PlanetsPagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}

// 2. Скелетони завантаження з червоними пульсуючими відтінками
function PlanetsSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/60 animate-pulse flex flex-col justify-between h-[280px]"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 w-16 bg-zinc-900 rounded" />
              <div className="h-2 w-2 rounded-full bg-red-950" />
            </div>
            <div className="h-6 w-3/4 bg-zinc-800 rounded mb-4" />
            <div className="space-y-3">
              <div className="h-3 w-full bg-zinc-900 rounded" />
              <div className="h-3 w-5/6 bg-zinc-900 rounded" />
              <div className="h-3 w-4/6 bg-zinc-900 rounded" />
              <div className="h-3 w-3/6 bg-zinc-900 rounded" />
            </div>
          </div>
          <div className="pt-3 border-t border-zinc-900/60 flex justify-end">
            <div className="h-3 w-24 bg-zinc-900 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 3. Головна сторінка каталогу планет
export default async function PlanetsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  return (
    <main className="relative min-h-screen w-full bg-black text-white px-4 py-12 selection:bg-red-600 selection:text-white">
      {/* Червоне неонове світіння та зоряна сітка */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/25 via-black to-black pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Кнопка на головну базу */}
        <div className="w-full flex justify-start mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-red-400 transition-colors uppercase"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> На головну базу
          </Link>
        </div>

        {/* Заголовок у червоному ситхівському неоні */}
        <header className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-red-500/80 block mb-2">
            Атлас галактичних світів
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-red-600/70 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            Планети Галактики
          </h1>
          <p className="mt-3 text-sm font-mono text-zinc-500">
            Реєстр астрофізичних даних, кліматичних зон та населених секторів
          </p>
        </header>

        {/* Suspense з динамічним ключем для миттєвої реакції при переході між сторінками */}
        <Suspense key={currentPage} fallback={<PlanetsSkeleton />}>
          <PlanetsList currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}