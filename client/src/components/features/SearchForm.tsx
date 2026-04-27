'use client';

import { useState } from 'react';
import { RecommendationRequest } from '@/types/car';
import { Car, DollarSign, Activity, MessageSquare, Loader2, Sparkles } from 'lucide-react';

interface SearchFormProps {
  onSearch: (data: RecommendationRequest) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [formData, setFormData] = useState<RecommendationRequest>({
    budget: '',
    type: '',
    usage: '',
    preferences: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const inputClasses = (fieldName: string) => `
    w-full bg-white/[0.02] border rounded-2xl px-5 py-4 outline-none transition-all duration-300
    text-white placeholder:text-gray-600 font-medium
    ${focusedField === fieldName 
      ? 'border-indigo-500/50 bg-white/[0.05] shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]' 
      : 'border-white/10 hover:border-white/20'}
  `;

  const labelClasses = (fieldName: string) => `
    text-sm font-bold flex items-center gap-2 mb-3 transition-colors duration-300
    ${focusedField === fieldName ? 'text-indigo-400' : 'text-gray-400'}
  `;

  const iconClasses = (fieldName: string) => `
    transition-colors duration-300
    ${focusedField === fieldName ? 'text-indigo-400' : 'text-gray-500'}
  `;

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Background glow for the form container */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-50 -z-10" />
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl relative z-10 overflow-hidden">
        
        {/* Subtle top glare */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          {/* Budget Field */}
          <div className="relative group">
            <label className={labelClasses('budget')}>
              <DollarSign size={18} className={iconClasses('budget')} /> Maximum Budget
            </label>
            <input
              type="text"
              placeholder="e.g. Under $40,000"
              className={inputClasses('budget')}
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              onFocus={() => setFocusedField('budget')}
              onBlur={() => setFocusedField(null)}
              required
            />
          </div>

          {/* Car Type Field */}
          <div className="relative group">
            <label className={labelClasses('type')}>
              <Car size={18} className={iconClasses('type')} /> Preferred Body Type
            </label>
            <div className="relative">
              <select
                className={`${inputClasses('type')} appearance-none cursor-pointer`}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                onFocus={() => setFocusedField('type')}
                onBlur={() => setFocusedField(null)}
                required
              >
                <option value="" className="bg-[#0f0f0f] text-gray-400">Select Type...</option>
                <option value="Sedan" className="bg-[#0f0f0f]">Sedan</option>
                <option value="SUV" className="bg-[#0f0f0f]">SUV</option>
                <option value="Hatchback" className="bg-[#0f0f0f]">Hatchback</option>
                <option value="Luxury" className="bg-[#0f0f0f]">Luxury</option>
                <option value="Electric" className="bg-[#0f0f0f]">Electric</option>
                <option value="Truck" className="bg-[#0f0f0f]">Pickup Truck</option>
                <option value="Sports" className="bg-[#0f0f0f]">Sports Car</option>
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Usage Field */}
          <div className="relative group md:col-span-2">
            <label className={labelClasses('usage')}>
              <Activity size={18} className={iconClasses('usage')} /> Primary Usage
            </label>
            <input
              type="text"
              placeholder="e.g. Daily city commute, Weekend family road trips, Off-roading"
              className={inputClasses('usage')}
              value={formData.usage}
              onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
              onFocus={() => setFocusedField('usage')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {/* Preferences Field */}
          <div className="relative group md:col-span-2">
            <label className={labelClasses('preferences')}>
              <MessageSquare size={18} className={iconClasses('preferences')} /> Specific Preferences
            </label>
            <input
              type="text"
              placeholder="e.g. Needs a sunroof, good fuel economy, advanced safety features"
              className={inputClasses('preferences')}
              value={formData.preferences}
              onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
              onFocus={() => setFocusedField('preferences')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden rounded-2xl p-[1px] transition-all hover:scale-[1.01] active:scale-[0.98]"
          >
            {/* Animated Button Border Gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            <div className="relative bg-black/50 backdrop-blur-xl px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 group-hover:bg-transparent">
              {isLoading ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                <>
                  <Sparkles size={20} className="text-indigo-300 group-hover:text-white transition-colors" />
                  <span className="text-white font-black tracking-wide text-lg">
                    Generate AI Recommendations
                  </span>
                </>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
