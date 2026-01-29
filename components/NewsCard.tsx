
import React from 'react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  onClick: (article: NewsArticle) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  return (
    <div 
      onClick={() => onClick(article)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-gray-700 uppercase">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {article.summary}
        </p>
        <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center">
            <span className="text-gray-600">{article.source}</span>
          </div>
          <span>{article.time}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
