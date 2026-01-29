
import React from 'react';
import { NewsArticle } from '../types';

interface HeroSectionProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ articles, onArticleClick }) => {
  if (articles.length < 3) return null;

  const main = articles[0];
  const secondary = articles.slice(1, 3);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
      {/* Main Feature */}
      <div 
        onClick={() => onArticleClick(main)}
        className="lg:col-span-8 group cursor-pointer relative overflow-hidden rounded-xl bg-gray-900 aspect-[16/9]"
      >
        <img 
          src={main.imageUrl} 
          alt={main.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
          <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-4 uppercase tracking-wider">
            Featured
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 line-clamp-2 leading-tight">
            {main.title}
          </h1>
          <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
            {main.summary}
          </p>
          <div className="flex items-center text-gray-300 text-xs md:text-sm font-medium">
            <span>{main.source}</span>
            <span className="mx-2">•</span>
            <span>{main.time}</span>
          </div>
        </div>
      </div>

      {/* Side Features */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {secondary.map((article) => (
          <div 
            key={article.id}
            onClick={() => onArticleClick(article)}
            className="flex-1 group cursor-pointer relative overflow-hidden rounded-xl bg-gray-900 min-h-[200px]"
          >
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
              <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {article.title}
              </h2>
              <div className="flex items-center text-gray-300 text-xs">
                <span>{article.source}</span>
                <span className="mx-2">•</span>
                <span>{article.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
