
import React from 'react';

interface Props {
  imageUrl: string;
  onReset: () => void;
}

const ResultView: React.FC<Props> = ({ imageUrl, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `aetherlens-encounter-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center space-y-8 animate-fadeIn">
      <div className="relative group max-w-4xl w-full">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-white">
          <img 
            src={imageUrl} 
            alt="AetherLens Generation" 
            className="w-full h-auto object-contain max-h-[70vh]"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2"
        >
          <i className="fas fa-download"></i>
          <span>Download Portrait</span>
        </button>
        
        <button
          onClick={onReset}
          className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-full font-bold shadow-md hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
        >
          <i className="fas fa-redo-alt"></i>
          <span>Start New Experience</span>
        </button>
      </div>

      <div className="text-center text-gray-500 text-sm italic">
        "Time is a flat circle, but memories live on."
      </div>
    </div>
  );
};

export default ResultView;
