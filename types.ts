
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  time: string;
  imageUrl: string;
  url: string;
}

export type Category = 'For You' | 'World' | 'Politics' | 'Technology' | 'Sports' | 'Entertainment' | 'Health' | 'Money';

export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  high: number;
  low: number;
}

export interface MarketData {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
