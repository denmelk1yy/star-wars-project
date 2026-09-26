import { Suspense } from 'react';
import Link from 'next/link';

// Отримання списку фільмів
async function getFilms() {
  const res = await fetch('https://swapi.py4e.com/api/films/', {
    next: { revalidate: 86400 }, // Кешуємо на добу
  });
  const data = await res.json();
  
  // Сортуємо епізоди по порядку: Episode I -> Episode VI
  return data.results.sort((a, b) => a.episode_id - b.episode_id);
}

// Допоміжна функція для римських цифр
function toRoman(num) {
  const romanMap = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII' };
  return romanMap[num] || num;
}

// 1. Асинхронний список фільмів
async function FilmsList() {
  const films = await getFilms();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {films.map((film) => {
        const romanEpisode = toRoman(film.episode_id);

        return (
          <div
            key={film.episode_id}
            className="group relative flex flex-col justify-between p-6 rounded-2xl border border-yellow-500/20 bg-zinc-950/70 backdrop-blur-md transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(255,232,31,0.2)] hover:-translate-y-1"
          >
            <div>
              {/* Верхня плашка: Епізод та Дата */}
              <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#FFE81F] drop-shadow-[0_0_8px_rgba(255,232,31,0.6)]">
                  ЕПІЗОД {romanEpisode}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {film.release_date.split('-')[0]} р.
                </span>
              </div>

              {/* Назва фільму */}
              <h2 className="text-2xl font-black tracking-wide text-zinc-100 group-hover:text-[#FFE81F] transition-colors">
                {film.title}
              </h2>

              {/* Режисер та Продюсер */}
              <div className="mt-3 space-y-1 text-xs font-mono text-zinc-400">
                <p>
                  <span className="text-zinc-500">Режисер:</span> {film.director}
                </p>
                <p className="truncate">
                  <span className="text-zinc-500">Продюсер:</span> {film.producer}
                </p>
              </div>

              {/* Уривок вступного тексту (Opening Crawl) */}
              <div className="mt-5 p-3 rounded-lg bg-black/60 border border-zinc-900">
                <p className="text-xs text-yellow-200/70 italic line-clamp-3 font-serif leading-relaxed">
                  "{film.opening_crawl.replace(/\r?\n|\r/g, ' ')}"
                </p>
              </div>
            </div>

            {/* Нижні деталі */}
            <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">
                Персонажів: <span className="text-zinc-300">{film.characters.length}</span>
              </span>
              <span className="text-yellow-400/80 group-hover:text-yellow-300 group-hover:translate-x-1 transition-all uppercase tracking-wider text-[11px]">
                Деталі архіву →
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 2. Скелетони завантаження
function FilmsSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/60 animate-pulse flex flex-col justify-between h-[320px]"
        >
          <div>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-900">
              <div className="h-4 w-20 bg-yellow-950/50 rounded" />
              <div className="h-4 w-12 bg-zinc-900 rounded" />
            </div>
            <div className="h-7 w-3/4 bg-zinc-800 rounded mb-4" />
            <div className="space-y-2 mb-5">
              <div className="h-3 w-1/2 bg-zinc-900 rounded" />
              <div className="h-3 w-2/3 bg-zinc-900 rounded" />
            </div>
            <div className="h-16 w-full bg-zinc-900/50 rounded" />
          </div>
          <div className="pt-4 border-t border-zinc-900 flex justify-between">
            <div className="h-3 w-24 bg-zinc-900 rounded" />
            <div className="h-3 w-24 bg-zinc-900 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 3. Головна сторінка
export default function FilmsPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white px-4 py-12 selection:bg-[#FFE81F] selection:text-black">
      {/* Зоряне сяйво у золотих тонах */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-950/20 via-black to-black pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FFE81F 1px, transparent 1px), linear-gradient(90deg, #FFE81F 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Кнопка повернення */}
        <div className="w-full flex justify-start mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-[#FFE81F] transition-colors uppercase"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> На головну базу
          </Link>
        </div>

        {/* Заголовок сторінки */}
        <header className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-yellow-400/80 block mb-2">
            Галактичний Кіноархів
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFE81F] via-[#F4D03F] to-zinc-500 drop-shadow-[0_0_30px_rgba(255,232,31,0.25)]">
            Хронологія Саги
          </h1>
          <p className="mt-3 text-sm font-mono text-zinc-500">
            Канонічні епізоди, впорядковані за хронологією всесвіту
          </p>
        </header>

        {/* Секція з Suspense */}
        <Suspense fallback={<FilmsSkeleton />}>
          <FilmsList />
        </Suspense>
      </div>
    </main>
  );
}