import React, { useState } from 'react';
import Header from './components/Header';
import UploadCard from './components/UploadCard';
import ImagePreview from './components/ImagePreview';
import ResultPanel from './components/ResultPanel';
import HerbLegend from './components/HerbLegend';

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to analyze image');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen p-4 md:p-8 flex flex-col items-center">

      {/* ── Animated background blur orbs ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Cyan orb — top-left */}
        <div className="bg-orb w-[520px] h-[520px] bg-cyan-400 -top-32 -left-24" />
        {/* Blue orb — bottom-right */}
        <div className="bg-orb bg-orb-2 w-[600px] h-[600px] bg-blue-600 -bottom-40 -right-32" />
        {/* Purple orb — centre */}
        <div className="bg-orb bg-orb-3 w-[400px] h-[400px] bg-purple-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="w-full max-w-5xl">
        <Header />
        
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <UploadCard onFileSelect={handleFileSelect} />
            
            <button
              onClick={handleAnalyze}
              disabled={!file || isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${
                !file || isLoading 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-70' 
                  : 'bg-gradient-to-r from-accent to-accentHover text-[#050B14] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-[1.02]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#050B14] border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Processing...
                </>
              ) : (
                'Analyze Image'
              )}
            </button>
          </div>

          <div>
            <div className="glass-panel p-6 h-full min-h-[500px] flex flex-col auto-rows-max">
              <h2 className="text-xl font-semibold mb-6 text-gray-200">
                Analysis Workspace
              </h2>
              
              {!previewUrl ? (
                <div className="flex-1 border-2 border-dashed border-glassBorder rounded-xl flex items-center justify-center text-gray-500 bg-black/20">
                  Upload an image to see the preview
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <ImagePreview 
                    previewUrl={previewUrl} 
                    onClear={handleClear} 
                    isLoading={isLoading} 
                  />
                  <ResultPanel result={result} error={error} />
                </div>
              )}
            </div>
          </div>
        </main>

        <HerbLegend />
      </div>
    </div>
  );
}

export default App;
