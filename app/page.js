'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function CounterPage() {
  const [count, setCount] = useState(0);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-[#FFE81F] selection:text-black">
      {/* Космічний фон */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />

      {/* Зоряний віньєтний градієнт */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#020617]/70 to-black pointer-events-none" />

      {/* Контейнер вмісту */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 w-full text-center">
        
        {/* Заголовок у стилі логотипу Star Wars */}
        <div className="mb-4">
          <span className="text-xs uppercase tracking-[0.6em] text-yellow-400/80 block mb-2 font-mono">
            A long time ago in a galaxy far, far away...
          </span>
          <h1 
            className="text-6xl md:text-8xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#FFE81F] via-[#F4D03F] to-[#B7950B] drop-shadow-[0_0_35px_rgba(255,232,31,0.55)]"
            style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
          >
            Star Wars
          </h1>
          <div className="h-[2px] w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-[#FFE81F] to-transparent shadow-[0_0_10px_#FFE81F]" />
        </div>


        <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          
      
          <Link
            href="/people"
            className="group relative flex flex-col items-center justify-center p-6 rounded-xl border border-cyan-500/30 bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
          >
            <span className="text-2xl mb-2 transition-transform duration-300 group-hover:-translate-y-1">👤</span>
            <span className="text-lg uppercase tracking-widest font-bold text-cyan-200 group-hover:text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              Люди
            </span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 font-mono">
              Джедаї & Сити
            </span>
            {/* Неонова нижня смужка */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-cyan-400 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_cyan]" />
          </Link>

          {/* Фільми (Жовтий/Золотий - хроніки) */}
          <Link
            href="/films"
            className="group relative flex flex-col items-center justify-center p-6 rounded-xl border border-[#FFE81F]/30 bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#FFE81F] hover:shadow-[0_0_25px_rgba(255,232,31,0.4)]"
          >
            <span className="text-2xl mb-2 transition-transform duration-300 group-hover:-translate-y-1">🎬</span>
            <span className="text-lg uppercase tracking-widest font-bold text-yellow-300 group-hover:text-white drop-shadow-[0_0_8px_rgba(255,232,31,0.8)]">
              Фільми
            </span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 font-mono">
              Хроніка саги
            </span>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FFE81F] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#FFE81F]" />
          </Link>

          {/* Планети (Червоний / Темна сторона або Зелений) */}
          <Link
            href="/planets"
            className="group relative flex flex-col items-center justify-center p-6 rounded-xl border border-red-500/30 bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
          >
            <span className="text-2xl mb-2 transition-transform duration-300 group-hover:-translate-y-1">🪐</span>
            <span className="text-lg uppercase tracking-widest font-bold text-red-300 group-hover:text-white drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
              Планети
            </span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 font-mono">
              Світи галактики
            </span>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_red]" />
          </Link>

        </div>

     

      </div>
    </main>
  );
}