import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackButton from '../../hero/[id]/BackButton';

// Римські цифри для номерів епізодів
function toRoman(num) {
  const romanMap = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII' };
  return romanMap[num] || num;
}

// Отримання фільму
async function getFilm(id) {
  const res = await fetch(`https://swapi.py4e.com/api/films/${id}/`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) return null;
  return res.json();
}

// Паралельне завантаження сутностей (персонажів або планет)
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

export default async function FilmDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const film = await getFilm(id);

  if (!film) {
    notFound();
  }

  // Паралельно завантажуємо і персонажів, і планети
  const [characters, planets] = await Promise.all([
    fetchEntities(film.characters),
    fetchEntities(film.planets),
  ]);

  const releaseYear = film.release_date ? film.release_date.split('-')[0] : 'Невідомо';

  return (
    <main className="relative min-h-screen w-full bg-black text-white px-4 py-12 selection:bg-[#FFE81F] selection:text-black">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-950/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-6">
        <div>
          <BackButton />
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-zinc-950/80 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_50px_rgba(255,232,31,0.08)] space-y-8">
          
          {/* Шапка епізоду */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#FFE81F] drop-shadow-[0_0_8px_rgba(255,232,31,0.5)] block mb-1">
                ЕПІЗОД {toRoman(film.episode_id)} // {releaseYear} РІК
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-wide text-zinc-100">
                {film.title}
              </h1>
            </div>
            <span className="text-xs font-mono tracking-widest px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-yellow-300">
              РЕЙС // 00{id}
            </span>
          </div>

          {/* Плашки зі зведеною інформацією */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30">
              <span className="text-zinc-500 block mb-1 text-[11px]">Дата прем'єри:</span>
              <span className="text-yellow-300 font-semibold">{film.release_date}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30">
              <span className="text-zinc-500 block mb-1 text-[11px]">Режисер:</span>
              <span className="text-zinc-200 font-semibold truncate block">{film.director}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30">
              <span className="text-zinc-500 block mb-1 text-[11px]">Продюсер:</span>
              <span className="text-zinc-200 font-semibold truncate block" title={film.producer}>
                {film.producer}
              </span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30">
              <span className="text-zinc-500 block mb-1 text-[11px]">Астро-локацій:</span>
              <span className="text-emerald-400 font-semibold">{planets.length}</span>
            </div>
          </div>

          {/* Вступний титр (Синопсис) */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFE81F] shadow-[0_0_6px_#FFE81F]" />
              Вступний синопсис (Opening Crawl)
            </h2>
            <div className="p-6 sm:p-8 rounded-xl border border-yellow-500/20 bg-black/60 shadow-inner">
              <p className="text-yellow-200/90 font-serif text-sm sm:text-base leading-relaxed tracking-wide whitespace-pre-line text-justify italic drop-shadow-[0_0_10px_rgba(255,232,31,0.15)]">
                {film.opening_crawl}
              </p>
            </div>
          </div>

          {/* Секція планет із клікабельними картками */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                Планети та локації подій
              </span>
              <span className="text-zinc-600 font-mono text-xs">({planets.length})</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {planets.length > 0 ? (
                planets.map((planet) => {
                  const planetId = planet.url.split('/').filter(Boolean).pop();

                  return (
                    <Link
                      key={planet.url}
                      href={`/Planet/${planetId}`}
                      className="group flex flex-col justify-between p-3.5 rounded-xl border border-zinc-900 bg-zinc-900/30 hover:border-emerald-500/50 hover:bg-emerald-950/10 hover:shadow-[0_0_15px_rgba(52,211,153,0.15)] transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-zinc-600 group-hover:text-emerald-400/80 transition-colors">
                          PL // {planetId?.padStart(3, '0')}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400 group-hover:shadow-[0_0_6px_#34d399] transition-all" />
                      </div>
                      <span className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-300 transition-colors">
                        {planet.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 mt-2 flex items-center justify-between">
                        <span>Клімат: {planet.climate?.split(',')[0]}</span>
                        <span className="group-hover:translate-x-0.5 transition-transform text-emerald-400">→</span>
                      </span>
                    </Link>
                  );
                })
              ) : (
                <p className="text-xs font-mono text-zinc-600 p-2 col-span-full">Дані про планети відсутні</p>
              )}
            </div>
          </div>

          {/* Персонажі епізоду */}
          <div className="space-y-3 pt-4 border-t border-zinc-900">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                Дійові особи епізоду
              </span>
              <span className="text-zinc-600 font-mono text-xs">({characters.length})</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
              {characters.length > 0 ? (
                characters.map((char) => {
                  const charId = char.url.split('/').filter(Boolean).pop();

                  return (
                    <Link
                      key={char.url}
                      href={`/hero/${charId}`}
                      className="group flex items-center justify-between p-2.5 rounded-lg border border-zinc-900 bg-zinc-950/70 hover:bg-zinc-900 hover:border-yellow-400/40 transition-all"
                    >
                      <span className="text-xs font-mono text-zinc-300 group-hover:text-yellow-300 truncate transition-colors">
                        {char.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-600 group-hover:text-yellow-400 group-hover:translate-x-0.5 transition-all">
                        →
                      </span>
                    </Link>
                  );
                })
              ) : (
                <p className="text-xs font-mono text-zinc-600 p-2 col-span-full">Персонажів не знайдено</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}