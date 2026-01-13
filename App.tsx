
import React, { useState, useCallback } from 'react';
import { ImageFile, ProcessingState } from './types';
import { generateAetherImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import ProcessingLoader from './components/ProcessingLoader';
import ResultView from './components/ResultView';

const App: React.FC = () => {
  const [childImage, setChildImage] = useState<ImageFile | null>(null);
  const [adultImage, setAdultImage] = useState<ImageFile | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingState>({
    isProcessing: false,
    message: '',
  });

  const handleGenerate = async () => {
    if (!childImage || !adultImage) return;

    setStatus({ isProcessing: true, message: 'Analyzing features and bridging time...' });
    setResult(null);

    try {
      const generatedUrl = await generateAetherImage(childImage, adultImage);
      setResult(generatedUrl);
      setStatus({ isProcessing: false, message: '' });
    } catch (error: any) {
      console.error(error);
      setStatus({ 
        isProcessing: false, 
        message: '', 
        error: error.message || 'An error occurred during generation. Please try again.' 
      });
    }
  };

  const reset = () => {
    setChildImage(null);
    setAdultImage(null);
    setResult(null);
    setStatus({ isProcessing: false, message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 md:px-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
          AetherLens
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Bridge the gap between your past and present. Upload a photo of yourself as a child and as an adult to witness a meeting across time.
        </p>
      </header>

      <main className="w-full max-w-6xl space-y-12">
        {!result && !status.isProcessing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center text-indigo-700">
                <i className="fas fa-child mr-3"></i> 1. Childhood Photo
              </h2>
              <ImageUploader 
                onImageSelected={(img) => setChildImage(img)} 
                currentImage={childImage}
                label="Upload childhood photo"
              />
            </div>

            <div className="glass-card p-8 rounded-3xl shadow-xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center text-purple-700">
                <i className="fas fa-user mr-3"></i> 2. Adult Photo
              </h2>
              <ImageUploader 
                onImageSelected={(img) => setAdultImage(img)} 
                currentImage={adultImage}
                label="Upload recent adult photo"
              />
            </div>
          </div>
        )}

        {status.isProcessing && (
          <ProcessingLoader message={status.message} />
        )}

        {result && (
          <ResultView imageUrl={result} onReset={reset} />
        )}

        {status.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center shadow-sm">
            <i className="fas fa-exclamation-triangle mr-2"></i> {status.error}
          </div>
        )}

        {!result && !status.isProcessing && (
          <div className="flex justify-center pt-4">
            <button
              onClick={handleGenerate}
              disabled={!childImage || !adultImage}
              className={`px-12 py-4 rounded-full text-lg font-bold transition-all transform active:scale-95 shadow-lg flex items-center space-x-3
                ${childImage && adultImage 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-2xl hover:-translate-y-1' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              <i className="fas fa-magic"></i>
              <span>Generate Encounter</span>
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-16 text-gray-400 text-sm pb-8 text-center">
        <p>&copy; {new Date().getFullYear()} AetherLens. All Rights Reserved.</p>
        <p className="mt-1">Developed by <strong>Arif Mohiuddin</strong></p>
      </footer>
    </div>
  );
};

export default App;
