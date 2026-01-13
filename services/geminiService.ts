
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ImageFile } from "../types";

export const generateAetherImage = async (childImage: ImageFile, adultImage: ImageFile): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Create a highly realistic and heartwarming photorealistic image where the adult person from the second image is hugging the child version of themselves from the first image. 
    They should be interacting naturally, with a gentle, loving expression on both faces. 
    Preserve the facial features and characteristics of the person in both stages of their life so they clearly look like the same individual.
    Use soft, natural, and warm lighting to create an ethereal, nostalgic mood. 
    Replace any existing background with a smooth, soft, and minimalist out-of-focus indoor studio or living room setting. 
    The final composition should feel seamless and professional, like a real studio portrait.
  `;

  const childPart = {
    inlineData: {
      data: childImage.base64,
      mimeType: childImage.mimeType,
    },
  };

  const adultPart = {
    inlineData: {
      data: adultImage.base64,
      mimeType: adultImage.mimeType,
    },
  };

  const textPart = { text: prompt };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [childPart, adultPart, textPart] },
  });

  if (!response.candidates?.[0]?.content?.parts) {
    throw new Error("No image generated in response.");
  }

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Could not find generated image in API response.");
};
