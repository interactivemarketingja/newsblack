
import React from 'react';
import { Category } from '../types';

const CATEGORIES: Category[] = ['For You', 'World', 'Politics', 'Technology', 'Sports', 'Entertainment', 'Health', 'Money'];

interface CategoryBarProps {
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory, onSelect }) => {
  return (
    <div className="bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide">
      <div className="max-w-7xl mx-auto px-4 flex space-x-8">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`py-3 px-1 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
