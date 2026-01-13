
export interface ImageFile {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  message: string;
  error?: string;
}

export interface GenerationResult {
  imageUrl: string;
}
