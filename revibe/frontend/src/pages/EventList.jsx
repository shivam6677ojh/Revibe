import React, { useEffect, useState } from 'react';
import { useApi } from '../api/axios';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard.jsx';

export default function EventList() {
  const api = useApi();
  const [events, setEvents] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  
  useEffect(() => { 
    api.get('/events').then(r => setEvents(r.data));
    // Get current user ID once
    api.post('/auth/ensure').then(r => setCurrentUserId(r.data._id));
  }, [api]);
  
  const handleEventDeleted = (eventId) => {
    setEvents(events.filter(e => e._id !== eventId));
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white">🎪 Upcoming Events</h1>
          <Link to="/create" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform cursor-pointer">+ Create Event</Link>
        </div>
        {events.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-800 rounded-2xl">
            <p className="text-xl text-slate-500 dark:text-slate-400">No events found. Create one!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(e => <EventCard key={e._id} event={e} currentUserId={currentUserId} onDelete={handleEventDeleted} />)}
          </div>
        )}
      </div>
    </div>
  );
}
