'use client';

import { useState } from 'react';
import { RecommendationRequest } from '@/types/car';
import { Car, DollarSign, Activity, MessageSquare, Loader2 } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass p-8 rounded-3xl max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <DollarSign size={16} /> Budget
          </label>
          <input
            type="text"
            placeholder="e.g. Under $40,000"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/20 transition-all"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Car size={16} /> Car Type
          </label>
          <select
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/20 transition-all appearance-none"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="" className="bg-black">Select Type</option>
            <option value="Sedan" className="bg-black">Sedan</option>
            <option value="SUV" className="bg-black">SUV</option>
            <option value="Hatchback" className="bg-black">Hatchback</option>
            <option value="Luxury" className="bg-black">Luxury</option>
            <option value="Electric" className="bg-black">Electric</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Activity size={16} /> Usage
          </label>
          <input
            type="text"
            placeholder="e.g. Daily commute, Family trips"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/20 transition-all"
            value={formData.usage}
            onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <MessageSquare size={16} /> Other Preferences
          </label>
          <input
            type="text"
            placeholder="e.g. Sunroof, Autopilot"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/20 transition-all"
            value={formData.preferences}
            onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : 'Get Recommendations'}
      </button>
    </form>
  );
}
