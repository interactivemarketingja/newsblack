
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import MarketTicker from './components/MarketTicker';
import HeroSection from './components/HeroSection';
import NewsCard from './components/NewsCard';
import ArticleModal from './components/ArticleModal';
import SearchResults from './components/SearchResults';
import { NewsArticle, Category, GroundingChunk, MarketData, WeatherData } from './types';
import { fetchNewsArticles, searchLiveNews, fetchMarketData, fetchWeather } from './services/geminiService';
// Added missing CloudSun import and removed unused Loader2
import { TrendingUp, ArrowRight, RefreshCw, CloudSun } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('For You');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ text: string; sources: GroundingChunk[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const loadGlobalData = useCallback(async () => {
    try {
      const [market, weather] = await Promise.all([
        fetchMarketData(),
        fetchWeather()
      ]);
      setMarketData(market);
      setWeatherData(weather);
    } catch (e) {
      console.error("Failed to load global data", e);
    }
  }, []);

  const loadArticles = useCallback(async (category: Category) => {
    setIsLoading(true);
    setSearchQuery(''); 
    setSearchResults(null);
    try {
      const data = await fetchNewsArticles(category);
      setArticles(data);
    } catch (error) {
      console.error("Failed to load news", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGlobalData();
  }, [loadGlobalData]);

  useEffect(() => {
    loadArticles(activeCategory);
  }, [activeCategory, loadArticles]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    try {
      const results = await searchLiveNews(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  const featured = articles.slice(0, 3);
  const remaining = articles.slice(3);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header weather={weatherData} onSearch={handleSearch} onToggleMenu={() => {}} />
      <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />
      <MarketTicker data={marketData} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-24">
            <RefreshCw className="h-12 w-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500 font-bold text-lg animate-pulse">Scanning the globe for "{searchQuery}"...</p>
          </div>
        ) : searchQuery && searchResults ? (
          <SearchResults 
            query={searchQuery} 
            results={searchResults.text} 
            sources={searchResults.sources} 
          />
        ) : (
          <>
            {isLoading ? (
              <div className="space-y-8 animate-pulse">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[450px]">
                  <div className="lg:col-span-8 bg-white border border-gray-100 rounded-xl"></div>
                  <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="flex-1 bg-white border border-gray-100 rounded-xl"></div>
                    <div className="flex-1 bg-white border border-gray-100 rounded-xl"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-72 bg-white border border-gray-100 rounded-xl"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <HeroSection articles={featured} onArticleClick={setSelectedArticle} />
                
                <div className="flex items-center justify-between mt-12 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-1.5 bg-blue-600 rounded-full"></div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Trending Now</h2>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center transition-all bg-blue-50 px-3 py-1.5 rounded-full">
                    View Full Feed <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {remaining.map((article) => (
                    <NewsCard 
                      key={article.id} 
                      article={article} 
                      onClick={setSelectedArticle} 
                    />
                  ))}
                </div>

                {/* Additional Sections to feel more "MSN" */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                   <div className="lg:col-span-2">
                     <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center">
                        <span className="mr-2">🗞️</span> Editor's Picks
                     </h2>
                     <div className="space-y-6">
                        {articles.slice(0, 5).map((article, idx) => (
                          <div 
                            key={`list-${idx}`} 
                            onClick={() => setSelectedArticle(article)}
                            className="flex items-start space-x-5 p-4 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all cursor-pointer group"
                          >
                            <img 
                              src={article.imageUrl} 
                              className="w-32 h-20 md:w-44 md:h-28 object-cover rounded-lg flex-shrink-0 shadow-sm"
                              alt={article.title}
                            />
                            <div className="flex-1 min-w-0">
                               <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{article.category}</span>
                               <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 line-clamp-2 leading-tight transition-colors mb-2">
                                 {article.title}
                               </h4>
                               <p className="text-xs text-gray-500 line-clamp-2 hidden md:block">{article.summary}</p>
                               <div className="flex items-center mt-3 text-[10px] text-gray-400 font-bold uppercase">
                                 <span>{article.source}</span>
                                 <span className="mx-2">•</span>
                                 <span>{article.time}</span>
                               </div>
                            </div>
                          </div>
                        ))}
                     </div>
                   </div>

                   <aside className="space-y-10">
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-black text-gray-900 mb-4 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-red-500" />
                          Most Popular
                        </h3>
                        <div className="space-y-4">
                          {articles.slice(0, 5).map((a, i) => (
                            <div key={i} onClick={() => setSelectedArticle(a)} className="flex items-center space-x-3 cursor-pointer group">
                              <span className="text-2xl font-black text-gray-100 group-hover:text-blue-100 transition-colors">0{i+1}</span>
                              <p className="text-sm font-bold text-gray-700 group-hover:text-blue-600 line-clamp-2 leading-tight transition-colors">
                                {a.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {weatherData && (
                         <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h3 className="font-bold text-blue-100 uppercase text-[10px] tracking-widest">Local Weather</h3>
                                <p className="text-2xl font-black">{weatherData.location}</p>
                              </div>
                              <CloudSun className="h-10 w-10 text-orange-300" />
                            </div>
                            <div className="flex items-end space-x-2">
                              <span className="text-5xl font-black">{weatherData.temp}°</span>
                              <span className="text-blue-100 font-bold mb-2">{weatherData.condition}</span>
                            </div>
                            <div className="mt-6 flex items-center space-x-4 border-t border-blue-500/30 pt-4 text-xs font-bold text-blue-100">
                               <span>H: {weatherData.high}°</span>
                               <span>L: {weatherData.low}°</span>
                               <span className="ml-auto underline cursor-pointer">Forecast details</span>
                            </div>
                         </div>
                      )}
                   </aside>
                </div>
              </>
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-32">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
                  <div className="w-5 h-5 border-2 border-white rounded-sm"></div>
                </div>
                <span className="text-2xl font-black text-gray-900 tracking-tighter">Global Pulse</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
                The world's most intelligent news engine. Aggregating the stories that matter, powered by real-time Gemini Search.
              </p>
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-6">Network</h4>
              <ul className="text-sm text-gray-500 space-y-3 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">World News</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Politics</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Finance</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Tech</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-6">Support</h4>
              <ul className="text-sm text-gray-500 space-y-3 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Report Issue</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Ad Choices</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-6">Connect</h4>
              <div className="flex space-x-4">
                 <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all">𝕏</div>
                 <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all">in</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <p>&copy; 2024 Global Pulse by Senior Eng. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Legal</a>
              <a href="#" className="hover:text-gray-900">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <ArticleModal 
        article={selectedArticle} 
        isOpen={!!selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />
    </div>
  );
};

export default App;
