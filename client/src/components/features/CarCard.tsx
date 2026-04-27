'use client';

import { CarRecommendation } from '@/types/car';
import { CheckCircle2, Gauge, Zap, Settings2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarCardProps {
  car: CarRecommendation;
  onCompare: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
}

/**
 * Premium Car Card Component
 * Displays car details, images, and actions (Save/Compare)
 */
export default function CarCard({ car, onCompare, onFavorite, isFavorite }: CarCardProps) {
  // Use Unsplash featured image search for better car accuracy
  const imageUrl = `https://images.unsplash.com/featured/?car,${(car.image_query || car.name).replace(/\s+/g, ',')}`;
  const fallbackImage = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800";

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass overflow-hidden rounded-3xl flex flex-col border border-white/5 hover:border-white/20 transition-all group h-full relative"
    >
      {/* Save to Favorites Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onFavorite();
        }}
        className="absolute top-4 right-4 z-10 p-2 glass rounded-full hover:bg-white/10 transition-all active:scale-90"
      >
        <Heart 
          size={18} 
          className={isFavorite ? "text-red-500 fill-red-500" : "text-white/60"} 
        />
      </button>

      {/* Car Image with Gradient Overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{car.name}</h3>
          <p className="text-sm text-gray-300 font-medium">{car.price}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow gap-6">
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          {car.description}
        </p>

        {/* Technical Specifications */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
            <Settings2 size={14} className="mx-auto mb-1 text-blue-400" />
            <p className="text-[10px] text-gray-500 truncate font-medium">{car.specs?.engine || 'N/A'}</p>
          </div>
          <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
            <Gauge size={14} className="mx-auto mb-1 text-green-400" />
            <p className="text-[10px] text-gray-500 truncate font-medium">{car.specs?.mileage || 'N/A'}</p>
          </div>
          <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
            <Zap size={14} className="mx-auto mb-1 text-yellow-400" />
            <p className="text-[10px] text-gray-500 truncate font-medium">{car.specs?.transmission || 'N/A'}</p>
          </div>
        </div>

        {/* Key Pros */}
        <div className="space-y-2">
          {car.pros?.slice(0, 2).map((pro, index) => (
            <div key={index} className="text-[11px] flex items-center gap-2 text-green-400/70 font-medium">
              <CheckCircle2 size={12} /> {pro}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 flex gap-3">
          <button 
            onClick={onCompare}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold py-3 rounded-xl transition-all border border-white/10"
          >
            Compare
          </button>
          <button className="flex-1 bg-white text-black text-[11px] font-bold py-3 rounded-xl hover:bg-gray-200 transition-all active:scale-95">
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
