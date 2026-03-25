import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import HERB_DATA from '../herbData';

export default function HerbLegend() {
  const [query, setQuery] = useState('');

  const entries = Object.entries(HERB_DATA).filter(([, herb]) =>
    herb.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="mt-12 w-full">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Herb Class Legend</h2>
            <p className="text-xs text-gray-500">All 30 identifiable medicinal herb classes</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search herbs…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-glass border border-glassBorder text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition"
          />
        </div>
      </div>

      {/* Grid */}
      {entries.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-10">No herbs match "{query}"</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {entries.map(([index, herb]) => (
            <HerbCard key={index} index={index} herb={herb} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-gray-600 mt-5">
        Model trained on the MedLeaves dataset · {Object.keys(HERB_DATA).length} classes
      </p>
    </section>
  );
}

function HerbCard({ index, herb }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative glass-panel p-3 flex flex-col items-center text-center gap-1.5 cursor-default overflow-visible hover:border-accent/40 hover:shadow-[0_0_18px_rgba(0,242,254,0.12)] transition-all duration-300 hover:-translate-y-0.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Index badge */}
      <span className="absolute top-2 left-2 text-[9px] text-gray-600 bg-white/5 px-1.5 py-0.5 rounded-full font-mono">
        #{index}
      </span>

      {/* Emoji */}
      <span className="text-3xl leading-none mt-2 select-none group-hover:scale-110 transition-transform duration-200">
        {herb.emoji}
      </span>

      {/* Name */}
      <p className="text-xs font-semibold text-gray-200 leading-tight">{herb.name}</p>

      {/* Tooltip — appears ABOVE the card */}
      {hovered && (
        <div className="absolute inset-x-0 bottom-full mb-2 z-50 px-1 pointer-events-none">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-accent/50 p-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-left animate-[fadeIn_0.15s_ease]">
            <p className="text-[10px] font-semibold text-accent mb-1">{herb.name} {herb.emoji}</p>
            <p className="text-[10px] text-gray-200 leading-snug mb-1.5">{herb.description}</p>
            <p className="text-[10px] text-cyan-400 font-medium">{herb.uses}</p>
          </div>
        </div>
      )}
    </div>
  );
}
