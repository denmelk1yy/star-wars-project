
import { Suspense } from 'react';
import Link from 'next/link';

const ITEMS_PER_PAGE = 44;

// Отримання всіх даних (кешується на добу)
async function getPeople() {
  let heroes = [];
  let nextUrl = 'https://swapi.py4e.com/api/people/';

  while (nextUrl) {
    const res = await fetch(nextUrl, {
      next: { revalidate: 86400 },
    });

    const data = await res.json();
    heroes = [...heroes, ...data.results];
    nextUrl = data.next;
  }

  return heroes;
}

// Компонент перемикання сторінок
function Pagination({ currentPage, totalPages }) {
  return (
    <nav aria-label="Пагінація" className="flex items-center gap-2 mt-12 font-mono text-xs">
      <Link
        href={`?page=${currentPage - 1}`}
        aria-disabled={currentPage <= 1}
        className={`px-4 py-2 rounded-lg border transition-all ${
          currentPage <= 1
            ? 'pointer-events-none border-zinc-900 text-zinc-700 bg-zinc-950/40'
            : 'border-zinc-800 text-zinc-400 bg-zinc-950/80 hover:border-cyan-500/50 hover:text-cyan-300'
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
                  ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
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
            : 'border-zinc-800 text-zinc-400 bg-zinc-950/80 hover:border-cyan-500/50 hover:text-cyan-300'
        }`}
      >
        Наступна →
      </Link>
    </nav>
  );
}

// 1. Асинхронний компонент списку карток
async function HeroesList({ currentPage }) {
  const allHeroes = await getPeople();
  const totalPages = Math.ceil(allHeroes.length / ITEMS_PER_PAGE);

  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const heroes = allHeroes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-6 text-xs font-mono text-zinc-500">
        <span>Показано: {heroes.length} записів</span>
        <span>Всього в архіві: {allHeroes.length}</span>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {heroes.map((hero) => {
          const id = hero.url.split('/').filter(Boolean).pop();

          return (
            <div
              key={hero.url}
              className="group relative flex flex-col justify-between p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
                  ID // {id ? id.padStart(3, '0') : '000'}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-wide text-zinc-100 group-hover:text-cyan-300 transition-colors">
                  {hero.name}
                </h2>

                <div className="mt-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Зріст:</span>
                    <span className="text-zinc-300 font-semibold">{hero.height} см</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Очі:</span>
                    <span className="capitalize text-zinc-300">{hero.eye_color}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span className="text-zinc-500">Стать:</span>
                    <span className="capitalize text-zinc-300">{hero.gender}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">Народження:</span>
                    <span className="text-cyan-400/90">{hero.birth_year}</span>
                  </div>
                </div>
              </div>

             <Link 
  href={`/hero/${id}`} 
  className="mt-5 pt-3 border-t border-zinc-900 flex justify-end"
>
  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 group-hover:text-cyan-400 transition-colors">
    Досьє активно →
  </span>
</Link>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={validPage} totalPages={totalPages} />
      )}
    </>
  );
}

// 2. Скелетон для стану завантаження
function HeroesSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/60 animate-pulse flex flex-col justify-between h-[250px]"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 w-16 bg-zinc-900 rounded" />
              <div className="h-2 w-2 rounded-full bg-cyan-950" />
            </div>
            <div className="h-6 w-3/4 bg-zinc-800 rounded mb-4" />
            <div className="space-y-3">
              <div className="h-3 w-full bg-zinc-900 rounded" />
              <div className="h-3 w-5/6 bg-zinc-900 rounded" />
              <div className="h-3 w-4/6 bg-zinc-900 rounded" />
            </div>
          </div>
          <div className="pt-3 border-t border-zinc-900/60 flex justify-end">
            <div className="h-3 w-20 bg-zinc-900 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 3. Основна сторінка
export default async function PeoplePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  return (
    <main className="relative min-h-screen w-full bg-black text-white px-4 py-12 selection:bg-cyan-500 selection:text-black">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-start mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors uppercase"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> На головну базу
          </Link>
        </div>

        <header className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-cyan-400/80 block mb-2">
            Архів галактичних записів
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            Герої Саги
          </h1>
        </header>

        <Suspense key={currentPage} fallback={<HeroesSkeleton />}>
          <HeroesList currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}