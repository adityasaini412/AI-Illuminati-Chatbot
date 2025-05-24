import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = "AIzaSyDOPJ0q6BgjjLu3GXsnUIVwDHBdGuKP8gA";

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

export class GeminiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiError';
  }
}

async function initializeGemini() {
  try {
    if (!API_KEY) {
      throw new GeminiError('No API key found. Please add an API key.');
    }

    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    return true;
  } catch (error) {
    if (error instanceof GeminiError) {
      throw error;
    }
    console.error('Error initializing Gemini:', error);
    throw new GeminiError('Failed to initialize AI service');
  }
}

export async function generateResponse(message: string): Promise<string> {
  try {
    // Initialize if not already initialized
    if (!model) {
      await initializeGemini();
    }

    // Input validation
    if (!message.trim()) {
      throw new GeminiError('Empty message provided');
    }
    
    // Send the message and get response
    const result = await model.generateContent(message);
    
    // Validate response
    if (!result || !result.response) {
      throw new GeminiError('Empty response from API');
    }
    
    // Extract text from response
    const text = result.response.text();
    
    // Check for blocked response
    if (result.promptFeedback?.blockReason) {
      throw new GeminiError('Response blocked due to safety concerns');
    }
    
    return text;
  } catch (error) {
    if (error instanceof GeminiError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new GeminiError('Invalid API key configuration');
      }
      
      if (error.message.includes("network") || error.message.includes("ECONNREFUSED") || error.message.includes("ETIMEDOUT")) {
        throw new GeminiError('Network connection error');
      }
    }
    
    throw new GeminiError('An unexpected error occurred');
  }
}

export async function verifyGeminiConnection(): Promise<boolean> {
  try {
    if (!model) {
      return await initializeGemini();
    }
    return true;
  } catch (error) {
    return false;
  }
}
