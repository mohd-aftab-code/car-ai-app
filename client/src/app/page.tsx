'use client';

import { useState, useEffect } from 'react';
import { RecommendationRequest, CarRecommendation } from '@/types/car';
import { getRecommendations } from '@/services/api';
import SearchForm from '@/components/features/SearchForm';
import CarCard from '@/components/features/CarCard';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, Heart, Trash2 } from 'lucide-react';

export default function Home() {
  const [recommendations, setRecommendations] = useState<CarRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<CarRecommendation[]>([]);
  const [favorites, setFavorites] = useState<CarRecommendation[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800";

  // Persistent Favorites Management
  useEffect(() => {
    const saved = localStorage.getItem('car-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('car-favorites', JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Handle Search Submission
   */
  const handleSearch = async (data: RecommendationRequest) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    try {
      const results = await getRecommendations(data);
      setRecommendations(results);
    } catch (err: any) {
      setError(err.response?.data?.message || 'The AI service is temporarily unavailable. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle Car in Favorites
   */
  const toggleFavorite = (car: CarRecommendation) => {
    if (favorites.find(c => c.name === car.name)) {
      setFavorites(favorites.filter(c => c.name !== car.name));
    } else {
      setFavorites([...favorites, car]);
    }
  };

  /**
   * Add Car to Comparison list (Max 2)
   */
  const addToCompare = (car: CarRecommendation) => {
    if (compareList.find(c => c.name === car.name)) return;
    if (compareList.length >= 2) {
      setCompareList([compareList[1], car]);
    } else {
      setCompareList([...compareList, car]);
    }
  };

  return (
    <main className="min-h-screen relative pt-24 bg-[#050505]">
      <Navbar favoriteCount={favorites.length} onShowFavorites={() => setShowFavorites(true)} />
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black gradient-text tracking-tighter"
          >
            CAR AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto font-medium"
          >
            Intelligent car recommendations powered by AI. Find your perfect ride in seconds.
          </motion.p>
        </header>

        {/* Core Search Section */}
        <section className="mb-20">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* Error Handling */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-center mb-10 font-bold"
          >
            {error}
          </motion.div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <AnimatePresence mode="popLayout">
            {recommendations.map((car, idx) => (
              <motion.div
                key={car.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <CarCard 
                  car={car} 
                  onCompare={() => addToCompare(car)} 
                  onFavorite={() => toggleFavorite(car)}
                  isFavorite={!!favorites.find(f => f.name === car.name)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Favorites Sidebar Drawer */}
        <AnimatePresence>
          {showFavorites && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFavorites(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed inset-y-0 right-0 w-full max-w-md bg-black z-[100] border-l border-white/10 p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-black flex items-center gap-3 tracking-tighter">
                    <Heart className="text-red-500 fill-red-500" /> FAVORITES
                  </h2>
                  <button onClick={() => setShowFavorites(false)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                    <X size={24} />
                  </button>
                </div>

                {favorites.length === 0 ? (
                  <div className="text-center py-20">
                    <Heart size={48} className="mx-auto text-gray-800 mb-4 opacity-20" />
                    <p className="text-gray-500 font-medium">Your favorites list is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-150px)] pr-2 custom-scrollbar">
                    {favorites.map((car, idx) => (
                      <div key={idx} className="glass p-4 rounded-2xl flex gap-4 relative group hover:border-white/20 transition-all">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                          <img 
                            src={`https://images.unsplash.com/featured/?car,${(car.image_query || car.name).replace(/\s+/g, ',')}`} 
                            alt={car.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-sm text-white mb-0.5">{car.name}</h4>
                          <p className="text-xs text-gray-500 font-bold mb-3">{car.price}</p>
                          <button 
                            onClick={() => setFavorites(favorites.filter(c => c.name !== car.name))}
                            className="flex items-center gap-1.5 text-[10px] text-red-500 font-black hover:text-red-400 transition-colors uppercase tracking-widest"
                          >
                            <Trash2 size={10} /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Comparison Bar */}
        {compareList.length > 0 && (
          <motion.div 
            initial={{ y: 100, x: '-50%' }}
            animate={{ y: 0, x: '-50%' }}
            className="fixed bottom-10 left-1/2 glass px-6 py-4 rounded-[30px] flex items-center gap-6 shadow-2xl z-50 border border-white/20"
          >
            <div className="flex gap-3">
              {compareList.map((car, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                  <span className="text-[11px] font-black truncate max-w-[100px] text-white uppercase tracking-tighter">{car.name}</span>
                  <button onClick={() => setCompareList(compareList.filter(c => c.name !== car.name))}>
                    <X size={12} className="text-gray-500 hover:text-white transition-colors" />
                  </button>
                </div>
              ))}
            </div>
            {compareList.length === 2 && (
              <button 
                onClick={() => setShowComparison(true)}
                className="bg-white text-black px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-200 transition-all active:scale-95 shadow-xl"
              >
                <Scale size={14} /> Compare
              </button>
            )}
          </motion.div>
        )}

        {/* Comparison Result Modal */}
        <AnimatePresence>
          {showComparison && compareList.length === 2 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[200] p-6 flex items-center justify-center"
            >
              <div className="max-w-4xl w-full glass rounded-[50px] p-12 relative overflow-hidden border border-white/10 shadow-3xl">
                <button 
                  onClick={() => setShowComparison(false)}
                  className="absolute top-8 right-8 p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all"
                >
                  <X size={24} />
                </button>
                
                <h2 className="text-4xl font-black mb-16 text-center gradient-text tracking-tighter uppercase">Comparison Table</h2>
                
                <div className="grid grid-cols-3 gap-12">
                  <div className="space-y-10 pt-28 text-gray-500 text-[11px] font-black uppercase tracking-[0.2em]">
                    <div className="h-14 flex items-center">Engine</div>
                    <div className="h-14 flex items-center">Mileage</div>
                    <div className="h-14 flex items-center">Transmission</div>
                    <div className="h-14 flex items-center">Price Estimate</div>
                  </div>
                  
                  {compareList.map((car, idx) => (
                    <div key={idx} className="space-y-10 text-center">
                      <div className="h-28 flex flex-col items-center justify-center">
                        <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tighter">{car.name}</h3>
                      </div>
                      <div className="bg-white/5 h-14 flex items-center justify-center rounded-2xl text-sm font-medium border border-white/5">{car.specs?.engine || 'TBA'}</div>
                      <div className="bg-white/5 h-14 flex items-center justify-center rounded-2xl text-sm font-medium border border-white/5">{car.specs?.mileage || 'TBA'}</div>
                      <div className="bg-white/5 h-14 flex items-center justify-center rounded-2xl text-sm font-medium border border-white/5">{car.specs?.transmission || 'TBA'}</div>
                      <div className="text-3xl font-black text-white tracking-tighter">{car.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
