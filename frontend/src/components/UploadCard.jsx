import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function UploadCard({ onFileSelect }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`glass-panel p-10 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-dashed ${isDragOver ? 'border-accent bg-accent/10 scale-[1.02]' : 'border-glassBorder hover:border-accent/50'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        id="fileInput" 
        className="hidden" 
        onChange={handleChange} 
      />
      <div className="w-20 h-20 rounded-full bg-glass flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
        <UploadCloud className="w-10 h-10 text-accent" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Drag & Drop Image Here</h3>
      <p className="text-gray-400 mb-6 text-sm">or click to browse your files (PNG, JPG, JPEG)</p>
      
      <label 
        htmlFor="fileInput" 
        className="cursor-pointer px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/50 text-accent hover:bg-accent hover:text-[#050B14] transition-all font-medium shadow-[0_0_10px_rgba(0,242,254,0.2)] hover:shadow-[0_0_20px_rgba(0,242,254,0.5)]"
      >
        Select Image
      </label>
    </div>
  );
}
