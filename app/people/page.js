
async function getPeople() {
  const res = await fetch('https://swapi.py4e.com/api/people/');
  const data = await res.json();
  return data.results; // повертає масив об'єктів
}

// 2. Серверний компонент сторінки
export default async function PeoplePage() {
  const heroes = await getPeople();

  return (
    <main class="w-[100%] flex flex-col justify-center items-center ">
      <h1>Герої Star Wars</h1>

    <div class="w-[80%] h-auto flex items-center justify-center gap-5 ">
      {heroes.map((hero) => (
        <div key={hero.url} class=" w-[400px] flex flex-col bg-mauve-900 text-amber-50 rounded-2xl p-2">
          <h2>{hero.name}</h2>
          <p>Опис: Зріст {hero.height} см, колір очей — {hero.eye_color}</p>
          <p>Стать: {hero.gender}</p>
          <p>Рік народження: {hero.birth_year}</p>
        </div>
      ))}
      </div>
    </main>
  );
}