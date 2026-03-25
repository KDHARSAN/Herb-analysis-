import React from 'react';
import { CheckCircle, AlertTriangle, Leaf, Stethoscope } from 'lucide-react';
import HERB_DATA from '../herbData';

export default function ResultPanel({ result, error }) {
  if (error) {
    return (
      <div className="glass-panel p-6 border-red-500/30 bg-red-500/5 mt-6 animate-[fadeIn_0.4s_ease]">
        <div className="flex items-center gap-3 text-red-400">
          <AlertTriangle className="shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const confidencePercent = (result.confidence * 100).toFixed(1);
  const classIndex = String(result.class_index ?? result.predicted_class ?? '');
  const herbInfo = HERB_DATA[classIndex] || null;

  return (
    <div className="glass-panel p-6 mt-6 border-accent/20 bg-accent/5 animate-[fadeIn_0.4s_ease]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-glassBorder">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent shadow-[0_0_12px_rgba(0,242,254,0.3)]">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">Analysis Complete</p>
          <p className="text-xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-accent to-white tracking-wide">
            {herbInfo ? herbInfo.name : result.prediction}
            {herbInfo && <span className="ml-2 text-2xl">{herbInfo.emoji}</span>}
          </p>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="space-y-2 mb-5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Confidence Score</span>
          <span className="text-accent font-semibold">{confidencePercent}%</span>
        </div>
        <div className="w-full bg-glass rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-accent to-accentHover h-2.5 rounded-full shadow-[0_0_10px_rgba(0,242,254,0.5)] transition-all duration-1000 ease-out"
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>

      {/* Herb info card */}
      {herbInfo && (
        <div className="space-y-4 pt-4 border-t border-glassBorder">
          {/* Description */}
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">About this Herb</p>
              <p className="text-sm text-gray-200 leading-relaxed">{herbInfo.description}</p>
            </div>
          </div>

          {/* Uses */}
          <div className="flex gap-3">
            <div className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Medicinal Uses</p>
              <p className="text-sm text-cyan-300 leading-relaxed font-medium">{herbInfo.uses}</p>
            </div>
          </div>
        </div>
      )}

      {/* Class index badge */}
      {classIndex !== '' && (
        <div className="mt-4 pt-3 border-t border-glassBorder flex justify-end">
          <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
            Class #{classIndex}
          </span>
        </div>
      )}
    </div>
  );
}
