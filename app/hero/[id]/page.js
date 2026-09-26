import BackButton from './BackButton';

export default async function HeroDetailPage({ params }) {
  const { id } = await params;

  // Отримуємо дані конкретного героя за його id
  const res = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
  const hero = await res.json();

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-2">   
      <div className="w-full max-w-xl min-w-[300px] rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md p-2 sm:p-5 shadow-[0_0_50px_rgba(0,0,0,0.8)]">   
        <div>
          <BackButton />
        </div>
        <span className='text-white text-4xl'>{hero.name}</span>
        <div className='w-[100%] h-auto flex  justify-center items center '>
             <div  className='w-[47%] flex flex-col items-start justify-start m-2 '>
                <span className='text-white'>Біометричні дані</span>
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
             <div  className='w-[47%] flex flex-col items-start justify-start m-2 ' >
                <span className='text-white text-1xl'>Зафіксовано в епізодах</span>
                               


             </div>
        
        </div>
      </div>


      
    </div>
  );
}
