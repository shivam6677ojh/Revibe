import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../api/axios';
import { useUser } from '@clerk/clerk-react';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useApi();
  const { user } = useUser();
  const [event, setEvent] = useState(null);
  const [carbon, setCarbon] = useState(null);
  const [status, setStatus] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  
  useEffect(() => { 
    api.get(`/events/${id}`).then(r => {
      setEvent(r.data);
      // Check if current user is the organizer
      api.get('/auth/ensure').then(userRes => {
        setIsOwner(r.data.organizer === userRes.data._id);
      });
    }); 
  }, [id, api]);
  
  useEffect(() => { api.get(`/events/${id}/carbon`).then(r => setCarbon(r.data)); }, [id, api]);
  
  const rsvp = async () => {
    try {
      const r = await api.post(`/rsvps/${id}`);
      setStatus('RSVP confirmed');
      setCarbon({ carbonEstimateKg: r.data.carbonEstimateKg });
    } catch (e) { setStatus(e.response?.data?.error || 'Error'); }
  };
  
  const deleteEvent = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      setStatus('Event deleted successfully!');
      setTimeout(() => navigate('/events'), 1500);
    } catch (e) { 
      setStatus(e.response?.data?.error || 'Failed to delete event'); 
    }
  };
  
  if (!event) return <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center"><p className="text-center py-12 text-xl text-slate-500 dark:text-slate-400">Loading event...</p></div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 transition-colors py-12">
    <div className="container mx-auto px-6 md:px-12">
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-emerald-700 dark:text-emerald-400 mb-6">{event.title}</h2>
      <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed mb-8">{event.description}</p>
      <div className="grid gap-4 mb-8 bg-slate-50 dark:bg-slate-700 p-6 rounded-xl">
        <p className="text-base text-slate-800 dark:text-slate-100 flex items-center gap-2"><strong>📅 Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p className="text-base text-slate-800 dark:text-slate-100 flex items-center gap-2"><strong>🌱 Carbon Impact:</strong> {carbon?.carbonEstimateKg ?? '...'} kg CO₂</p>
      </div>
      <button onClick={rsvp} className="bg-gradient-to-r from-green-500 to-green-400 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:scale-105 transition-transform w-full cursor-pointer mb-4">✓ RSVP Now</button>
      
      {isOwner && (
        <button onClick={deleteEvent} className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:scale-105 transition-transform w-full cursor-pointer">
          🗑️ Delete Event
        </button>
      )}
      
      {status && <div className={`mt-4 p-4 rounded-lg font-semibold text-center ${status.includes('Error') || status.includes('Failed') ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'}`}>{status}</div>}
    </div>
    </div>
    </div>
  );
}

