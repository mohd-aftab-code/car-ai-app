'use client';

export default function Footer() {
  return (
    <footer className="mt-32 pb-10 border-t border-white/5 pt-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h2 className="text-2xl font-black mb-4 tracking-tighter">CAR AI</h2>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            Revolutionizing car recommendations with state-of-the-art AI logic and premium design.
            Built for those who demand excellence in their journey.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-white cursor-pointer transition-colors">Search</li>
            <li className="hover:text-white cursor-pointer transition-colors">Comparison</li>
            <li className="hover:text-white cursor-pointer transition-colors">Favorites</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="hover:text-white cursor-pointer transition-colors">Support</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 text-center text-[10px] uppercase tracking-[0.2em] text-gray-600">
        © 2026 CAR AI RECOMMENDATION SYSTEM. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
