
import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle, Category, MarketData, WeatherData } from "../types";

// Correct initialization using named parameter and direct process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchNewsArticles = async (category: Category): Promise<NewsArticle[]> => {
  // We use googleSearch to get REAL current news headlines for the category
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Find the top 8 latest news stories for the category: ${category}. 
    Provide a title, summary, source, and relative time (e.g., '2h ago'). 
    Respond with a JSON array.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            source: { type: Type.STRING },
            time: { type: Type.STRING },
          },
          required: ["title", "summary", "source", "time"],
        },
      },
    },
  });

  try {
    // Accessing .text as a property, not a method
    const articles = JSON.parse(response.text || '[]');
    // Extracting grounding chunks to comply with Search Grounding requirements (extract URLs)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return articles.map((a: any, index: number) => ({
      ...a,
      id: a.id || `news-${category}-${index}`,
      category: category,
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(a.title)}/800/600`,
      // Always extract URLs from groundingChunks when using Google Search
      url: groundingChunks[index]?.web?.uri || '#'
    }));
  } catch (error) {
    console.error("Failed to parse grounded news", error);
    return [];
  }
};

export const fetchMarketData = async (): Promise<MarketData[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Get the latest prices and daily changes for S&P 500, Dow Jones, Nasdaq, Bitcoin, and Crude Oil. Return as JSON array.",
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            symbol: { type: Type.STRING },
            price: { type: Type.STRING },
            change: { type: Type.STRING },
            isPositive: { type: Type.BOOLEAN },
          },
          required: ["symbol", "price", "change", "isPositive"],
        }
      }
    }
  });
  try {
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Failed to parse market data", error);
    return [];
  }
};

export const fetchWeather = async (location: string = "New York"): Promise<WeatherData> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Get the current weather for ${location} including temp, condition, high, and low. Return as JSON object.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          temp: { type: Type.NUMBER },
          condition: { type: Type.STRING },
          location: { type: Type.STRING },
          high: { type: Type.NUMBER },
          low: { type: Type.NUMBER },
        },
        required: ["temp", "condition", "location", "high", "low"],
      }
    }
  });
  try {
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Failed to parse weather", error);
    return { temp: 0, condition: 'Error', location: location, high: 0, low: 0 };
  }
};

export const searchLiveNews = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Search for the latest news about: ${query}. Summarize the top findings into individual news items with titles and sources.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return {
    text: response.text,
    // Extract grounding chunks to comply with Search Grounding requirements
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
