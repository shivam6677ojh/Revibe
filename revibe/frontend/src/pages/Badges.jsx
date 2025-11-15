import React, { useEffect, useState } from 'react';
import { useApi } from '../api/axios';

export default function Badges() {
  const api = useApi();
  const [badges, setBadges] = useState([]);
  useEffect(() => { api.get('/badges').then(r => setBadges(r.data)); }, [api]);
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors py-12">
      <div className="container mx-auto px-6 md:px-12">
      <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-12 text-center">🏅 Your Badges</h2>
      {badges.length === 0 && <p className="text-center py-16 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 text-lg">No badges earned yet. RSVP to events to earn badges!</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map(b => (
          <div key={b._id} className="bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 text-white p-8 rounded-2xl text-center font-bold text-xl shadow-2xl hover:scale-105 transition-transform">
            <div className="text-6xl mb-4">🏆</div>
            {b.type}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
