'use client';

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/60 font-mono text-xs uppercase tracking-widest text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95"
    >
      <span className="transition-transform duration-300 group-hover:-translate-x-1 text-cyan-400">
        ←
      </span>
      Повернутись назад
    </button>
  );
}