
import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { GroundingChunk } from '../types';

interface SearchResultsProps {
  query: string;
  results: string;
  sources: GroundingChunk[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, sources }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Globe className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Search Results for "{query}"</h2>
      </div>

      <div className="prose prose-blue max-w-none mb-8 text-gray-700">
        <p className="whitespace-pre-wrap leading-relaxed">{results}</p>
      </div>

      {sources.length > 0 && (
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Sources Found</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sources.map((source, idx) => source.web && (
              <a 
                key={idx}
                href={source.web.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
              >
                <div className="flex-1 mr-4">
                  <p className="text-sm font-bold text-gray-900 line-clamp-1">{source.web.title}</p>
                  <p className="text-xs text-gray-400 line-clamp-1 truncate">{source.web.uri}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-blue-500" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
