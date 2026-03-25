import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 glass-panel mb-8">
      <div className="flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-accent animate-pulse-slow" />
        <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-accent to-accentHover">
          VisionAI Analyzer
        </h1>
      </div>
      <div className="text-sm text-gray-400 font-medium">
        Keras Integration
      </div>
    </header>
  );
}
