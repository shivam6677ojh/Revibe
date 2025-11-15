import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useApi } from '../api/axios';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useUser();
  const api = useApi();
  const [dbUser, setDbUser] = useState(null);
  const [stats, setStats] = useState({ eventsCreated: 0, badges: 0 });
  
  useEffect(() => { 
    if (user) {
      api.post('/auth/ensure').then(r => {
        setDbUser(r.data);
        setStats({
          eventsCreated: r.data.eventsCreated?.length || 0,
          badges: 0
        });
      });
      
      // Fetch actual badge count
      api.get('/badges').then(r => {
        setStats(prev => ({ ...prev, badges: r.data.length }));
      }).catch(err => console.error('Failed to fetch badges:', err));
    }
  }, [user, api]);
  
  if (!user) return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
      <p className="text-center py-12 text-xl text-slate-500 dark:text-slate-400">Loading profile...</p>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors py-12">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-6xl shadow-2xl">
              👤
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-2">
                {user.fullName || 'User'}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">
                📧 {user.primaryEmailAddress?.emailAddress}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {dbUser?.roles?.map(role => (
                  <span key={role} className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full font-semibold text-sm">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-8 shadow-xl text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-5xl mb-3">🎉</div>
            <div className="text-4xl font-black mb-2">{dbUser?.attendedEventsCount || 0}</div>
            <div className="text-lg opacity-90">Events Attended</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-8 shadow-xl text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-5xl mb-3">🎪</div>
            <div className="text-4xl font-black mb-2">{stats.eventsCreated}</div>
            <div className="text-lg opacity-90">Events Created</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-2xl p-8 shadow-xl text-center hover:scale-105 transition-transform cursor-pointer">
            <div className="text-5xl mb-3">🏅</div>
            <div className="text-4xl font-black mb-2">{stats.badges}</div>
            <div className="text-lg opacity-90">Badges Earned</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/events" className="flex items-center gap-4 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
              <div className="text-4xl">🔍</div>
              <div>
                <div className="font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Browse Events</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Discover eco-friendly gatherings</div>
              </div>
            </Link>
            <Link to="/create" className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
              <div className="text-4xl">➕</div>
              <div>
                <div className="font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Create Event</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Host your own sustainable event</div>
              </div>
            </Link>
            <Link to="/badges" className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
              <div className="text-4xl">🏆</div>
              <div>
                <div className="font-bold text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">View Badges</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">See your achievements</div>
              </div>
            </Link>
            <Link to="/calculator" className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:shadow-lg transition-all cursor-pointer group">
              <div className="text-4xl">🌍</div>
              <div>
                <div className="font-bold text-slate-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Carbon Calculator</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Calculate your footprint</div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
