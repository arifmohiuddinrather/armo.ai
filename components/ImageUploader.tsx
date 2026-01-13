
import React, { ChangeEvent } from 'react';
import { ImageFile } from '../types';

interface Props {
  onImageSelected: (image: ImageFile) => void;
  currentImage: ImageFile | null;
  label: string;
}

const ImageUploader: React.FC<Props> = ({ onImageSelected, currentImage, label }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      onImageSelected({
        base64: base64String,
        mimeType: file.type,
        previewUrl: URL.createObjectURL(file),
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative group">
      {!currentImage ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all hover:border-indigo-400">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
              <i className="fas fa-cloud-upload-alt"></i>
            </div>
            <p className="mb-2 text-sm text-gray-700 font-medium">
              {label}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <img 
            src={currentImage.previewUrl} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
            <button 
              onClick={() => (document.getElementById(`file-${label}`) as HTMLInputElement)?.click()}
              className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all hover:bg-indigo-50"
            >
              <i className="fas fa-sync-alt"></i>
              <span>Change Photo</span>
            </button>
          </div>
          <input 
            id={`file-${label}`} 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
