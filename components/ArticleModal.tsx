
import React from 'react';
import { X, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { NewsArticle } from '../types';

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl h-full max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <div className="px-6 md:px-12 py-8">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm uppercase mb-4 tracking-widest">
              <span>{article.category}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 font-normal">{article.time}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
              {article.title}
            </h1>

            <div className="flex items-center space-x-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                <span className="text-xl font-bold text-gray-400">{article.source[0]}</span>
              </div>
              <div>
                <div className="font-bold text-gray-900">{article.source}</div>
                <div className="text-sm text-gray-500">Newsroom • Editorial Staff</div>
              </div>
            </div>

            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full aspect-video object-cover rounded-2xl mb-8 shadow-lg"
            />

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
              <p className="text-xl font-medium text-gray-800 border-l-4 border-blue-600 pl-6 italic">
                {article.summary}
              </p>
              <p>
                In a significant development reported today, {article.source} covers the latest updates regarding {article.title.toLowerCase()}. Experts suggest that this event could have long-lasting implications for the industry and public perception alike.
              </p>
              <p>
                The situation continues to evolve rapidly as more details emerge. Analysts from around the globe are weighing in on the potential outcomes, noting that the timing of this announcement is particularly strategic. "We haven't seen anything quite like this in recent years," says a senior lead in the field.
              </p>
              <p>
                As part of our ongoing coverage, we reached out to stakeholders who expressed a mix of optimism and caution. The full impact remains to be seen, but for now, the conversation remains centered on the immediate response from the community.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Key Takeaways</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Initial reports confirmed by multiple independent sources.</li>
                  <li>Secondary reactions being monitored in real-time.</li>
                  <li>Long-term projections suggest moderate to high impact.</li>
                </ul>
              </div>
              <p>
                Stay tuned as Global Pulse brings you the most up-to-date analysis and exclusive insights on this story. Follow our dedicated feed for more updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
