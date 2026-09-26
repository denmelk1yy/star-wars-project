
// import Link from 'next/link';

// async function getPeople() {
//   let heroes = [];
//   let nextUrl = 'https://swapi.py4e.com/api/people/';

//   while (nextUrl) {
//     const res = await fetch(nextUrl, {
//       // Керуємо кешуванням Next.js: закешувати на день (86400 сек),
//       // бо база SWAPI не змінюється кожну секунду
//       next: { revalidate: 86400 },
//     });
    
//     const data = await res.json();
    
//     // Додаємо поточні 10 героїв у загальний масив
//     heroes = [...heroes, ...data.results];
    
//     // Переходимо на наступний URL (або null, коли сторінки закінчаться)
//     nextUrl = data.next;
//   }

//   return heroes; // Поверне масив з усіма ~82 героями
// }

// export default async function PeoplePage() {
//   const heroes = await getPeople();

//   return (
//     <main className="relative min-h-screen w-full bg-black text-white px-4 py-12 selection:bg-cyan-500 selection:text-black">
//       {/* Фонова космічна сітка та градієнт */}
//       <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black pointer-events-none" />
//       <div 
//         className="fixed inset-0 opacity-[0.03] pointer-events-none"
//         style={{
//           backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
//           backgroundSize: '40px 40px',
//         }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
//         {/* Кнопка повернення */}
//         <div className="w-full flex justify-start mb-8">
//           <Link
//             href="/"
//             className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors uppercase"
//           >
//             <span className="transition-transform group-hover:-translate-x-1">←</span> На головну базу
//           </Link>
//         </div>

//         {/* Заголовок бази даних */}
//         <header className="text-center mb-12">
//           <span className="text-xs font-mono uppercase tracking-[0.4em] text-cyan-400/80 block mb-2">
//             Архів галактичних записів
//           </span>
//           <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
//             Герої Саги
//           </h1>
//           <p className="mt-3 text-sm font-mono text-zinc-500">
//             Виявлено записів у поточному секторі: <span className="text-cyan-400">{heroes.length}</span>
//           </p>
//         </header>

//         {/* Адаптивна сітка карток */}
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {heroes.map((hero) => {
//             const id = hero.url.split('/').filter(Boolean).pop();

//             return (
//               <div
//                 key={hero.url}
//                 className="group relative flex flex-col justify-between p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1"
//               >
//                 {/* Кутовий індикатор досьє */}
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
//                     ID // 00{id}
//                   </span>
//                   <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
//                 </div>

//                 {/* Ім'я персонажа */}
//                 <div>
//                   <h2 className="text-xl font-bold tracking-wide text-zinc-100 group-hover:text-cyan-300 transition-colors">
//                     {hero.name}
//                   </h2>

//                   {/* Характеристики */}
//                   <div className="mt-4 space-y-2 text-xs font-mono">
//                     <div className="flex justify-between py-1 border-b border-zinc-900">
//                       <span className="text-zinc-500">Зріст:</span>
//                       <span className="text-zinc-300 font-semibold">{hero.height} см</span>
//                     </div>

//                     <div className="flex justify-between py-1 border-b border-zinc-900">
//                       <span className="text-zinc-500">Очі:</span>
//                       <span className="capitalize text-zinc-300">{hero.eye_color}</span>
//                     </div>

//                     <div className="flex justify-between py-1 border-b border-zinc-900">
//                       <span className="text-zinc-500">Стать:</span>
//                       <span className="capitalize text-zinc-300">{hero.gender}</span>
//                     </div>

//                     <div className="flex justify-between py-1">
//                       <span className="text-zinc-500">Народження:</span>
//                       <span className="text-cyan-400/90">{hero.birth_year}</span>
//                     </div>
//                   </div>
//                 </div>

              
//                 <div className="mt-5 pt-3 border-t border-zinc-900 flex justify-end">
//                   <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 group-hover:text-cyan-400 transition-colors">
//                     Досьє активно →
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </main>
//   );
// }
import { Suspense } from 'react';
import Link from 'next/link';

// Отримання даних
async function getPeople() {
  let heroes = [];
  let nextUrl = 'https://swapi.py4e.com/api/people/';

  while (nextUrl) {
    const res = await fetch(nextUrl, {
      // Керуємо кешуванням Next.js: закешувати на день (86400 сек),
      // бо база SWAPI не змінюється кожну секунду
      next: { revalidate: 86400 },
    });
    
    const data = await res.json();
    
    // Додаємо поточні 10 героїв у загальний масив
    heroes = [...heroes, ...data.results];
    
    // Переходимо на наступний URL (або null, коли сторінки закінчаться)
    nextUrl = data.next;
  }

  return heroes; // Поверне масив з усіма ~82 героями
}

// 1. Асинхронний компонент списку карток
async function HeroesList() {
  const heroes = await getPeople();

  return (
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
                ID // 00{id}
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

            <div className="mt-5 pt-3 border-t border-zinc-900 flex justify-end">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 group-hover:text-cyan-400 transition-colors">
                Досьє активно →
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 2. Скелетон для стану завантаження (fallback)
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
export default function PeoplePage() {
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

        {/* Обгортка Suspense: шапка показується миттєво, а тут крутиться скелетон */}
        <Suspense fallback={<HeroesSkeleton />}>
          <HeroesList />
        </Suspense>
      </div>
    </main>
  );
}