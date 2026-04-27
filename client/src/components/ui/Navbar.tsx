'use client';

import { Heart, Car } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ favoriteCount, onShowFavorites }: { favoriteCount: number, onShowFavorites: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Car size={20} className="text-black" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">CAR AI</span>
        </div>

        <button 
          onClick={onShowFavorites}
          className="relative p-2 hover:bg-white/5 rounded-xl transition-all group"
        >
          <Heart size={22} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          {favoriteCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
            >
              {favoriteCount}
            </motion.span>
          )}
        </button>
      </div>
    </nav>
  );
}
