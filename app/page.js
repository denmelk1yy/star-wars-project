'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <div class="w-[100%] h-[100vh] flex flex-col items-center justify-center ">
      <h1>
        Star Wars 
      </h1>

      <div class="w-[50%] h-auto flex items-center justify-between">
         <Link href="/people">люди</Link>
          <Link href="/people">фільми</Link>
           <Link href="/people">планети</Link>

      </div>



    </div>
  );
}