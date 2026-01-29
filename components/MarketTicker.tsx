
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketData } from '../types';

interface MarketTickerProps {
  data: MarketData[];
}

const MarketTicker: React.FC<MarketTickerProps> = ({ data }) => {
  if (!data.length) return null;

  return (
    <div className="bg-white border-b border-gray-100 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center h-10 px-4 space-x-6 text-[12px] whitespace-nowrap scrollbar-hide">
        <span className="font-bold text-gray-400 uppercase tracking-tighter border-r border-gray-200 pr-4">Markets</span>
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 group cursor-default">
            <span className="font-bold text-gray-700">{item.symbol}</span>
            <span className="font-medium text-gray-900">{item.price}</span>
            <div className={`flex items-center font-bold ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {item.isPositive ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
