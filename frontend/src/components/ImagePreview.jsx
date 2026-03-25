import React from 'react';
import { X } from 'lucide-react';

export default function ImagePreview({ previewUrl, onClear, isLoading }) {
  if (!previewUrl) return null;

  return (
    <div className="glass-panel p-4 relative group">
      <div className="relative rounded-xl overflow-hidden shadow-lg border border-glassBorder bg-black/50 aspect-video flex items-center justify-center">
        <img 
          src={previewUrl} 
          alt="Preview" 
          className={`max-w-full max-h-full object-contain transition-all duration-500 ${isLoading ? 'opacity-50 blur-sm scale-105' : 'opacity-100 scale-100'}`}
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {!isLoading && (
        <button 
          onClick={onClear}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform hover:scale-110 z-10"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
