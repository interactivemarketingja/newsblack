
import React, { useState } from 'react';
import { Search, Bell, User, CloudSun, Menu, MapPin } from 'lucide-react';
import { WeatherData } from '../types';

interface HeaderProps {
  weather: WeatherData | null;
  onSearch: (query: string) => void;
  onToggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ weather, onSearch, onToggleMenu }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
              <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
                <div className="w-5 h-5 border-2 border-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-gray-800 tracking-tight hidden sm:block">Global Pulse</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search the web and news"
                className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium text-gray-700"
              />
              <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {weather && (
              <div className="hidden sm:flex flex-col items-end text-right mr-2">
                <div className="flex items-center text-gray-900 text-sm font-bold">
                  <CloudSun className="h-4 w-4 mr-1 text-orange-400" />
                  <span>{weather.temp}°F</span>
                </div>
                <div className="flex items-center text-[10px] text-gray-400 font-medium">
                  <MapPin className="h-2 w-2 mr-0.5" />
                  <span>{weather.location}</span>
                </div>
              </div>
            )}
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center space-x-2 p-1 pl-1 pr-3 rounded-full hover:bg-gray-100 text-gray-700 border border-gray-200">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-bold hidden md:block">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
