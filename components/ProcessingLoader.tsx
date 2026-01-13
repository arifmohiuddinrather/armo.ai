
import React, { useEffect, useState } from 'react';

interface Props {
  message: string;
}

const steps = [
  "Mapping child features...",
  "Analyzing adult portrait...",
  "Adjusting environmental lighting...",
  "Bridging the generational gap...",
  "Softening background elements...",
  "Polishing final encounter..."
];

const ProcessingLoader: React.FC<Props> = ({ message }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
          <i className="fas fa-hourglass-half text-2xl animate-pulse"></i>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{message}</h3>
      <p className="text-indigo-600 font-medium animate-pulse">
        {steps[currentStep]}
      </p>
      
      <div className="mt-12 max-w-md text-center text-gray-500 text-sm leading-relaxed">
        Our AI is carefully recreating your childhood self and placing your adult self in a natural interaction. This delicate process takes about 20-30 seconds.
      </div>
    </div>
  );
};

export default ProcessingLoader;
