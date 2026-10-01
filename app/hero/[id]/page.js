import Link from 'next/link';
import { notFound } from 'next/navigation';

// Отримання даних персонажа
async function getHero(id) {
  const res = await fetch(`https://swapi.py4e.com/api/people/${id}/`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) return null;
  return res.json();
}

// Паралельне завантаження назв фільмів за їхніми URL
async function getFilms(filmUrls) {
  if (!filmUrls || filmUrls.length === 0) return [];

  const requests = filmUrls.map(async (url) => {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return res.json();
  });

  const results = await Promise.all(requests);
  return results.filter(Boolean);
}

export default async function HeroPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const hero = await getHero(id);

  if (!hero) {
    notFound();
  }

  const films = await getFilms(hero.films);

  return (
    <main className="relative min-h-screen w-full bg-black text-white px-4 py-12 selection:bg-cyan-500 selection:text-black">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col">
        {/* Кнопка повернення */}
        <div className="mb-8">
          <Link
            href="/people"
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors uppercase"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> До списку героїв
          </Link>
        </div>

        {/* Картка досьє */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400/80 block mb-1">
                Особова справа
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-wide text-zinc-100">
                {hero.name}
              </h1>
            </div>
            <span className="text-xs font-mono tracking-widest px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-cyan-300">
              ID // 00{id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Фізичні параметри та характеристики */}
            <div>
              <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                Біометричні дані
              </h2>

              <div className="space-y-2.5 text-xs font-mono bg-zinc-900/40 border border-zinc-900 rounded-xl p-4">
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Рік народження:</span>
                  <span className="text-cyan-300 font-semibold">{hero.birth_year}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Стать:</span>
                  <span className="capitalize text-zinc-200">{hero.gender}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Зріст:</span>
                  <span className="text-zinc-200">{hero.height} см</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Вага:</span>
                  <span className="text-zinc-200">{hero.mass} кг</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Колір очей:</span>
                  <span className="capitalize text-zinc-200">{hero.eye_color}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Колір волосся:</span>
                  <span className="capitalize text-zinc-200">{hero.hair_color}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-zinc-500">Колір шкіри:</span>
                  <span className="capitalize text-zinc-200">{hero.skin_color}</span>
                </div>
              </div>
            </div>

            {/* Хроніка появ (Фільми з посиланнями) */}
            <div>
              <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                Зафіксовано в епізодах
              </h2>

              <div className="space-y-3">
                {films.length > 0 ? (
                  films.map((film) => {
                    const filmId = film.url.split('/').filter(Boolean).pop();

                    return (
                      <Link
                        key={film.url}
                        href={`/films/${filmId}`}
                        className="group flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                            Епізод {film.episode_id}
                          </span>
                          <span className="text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors">
                            {film.title}
                          </span>
                        </div>
                        <Link href={`/Film/${film.episode_id}`}className="text-xs font-mono text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
                          Перейти →
                        </Link>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-xs font-mono text-zinc-600">Дані про епізоди відсутні</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}