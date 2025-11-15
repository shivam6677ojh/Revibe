import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../api/axios';

export default function EventCard({ event, currentUserId, onDelete }) {
  const api = useApi();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  // Simple ownership check
  const organizerId = typeof event.organizer === 'string' ? event.organizer : event.organizer?._id;
  const isOwner = currentUserId && organizerId === currentUserId;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`Delete "${event.title}"?`)) return;
    
    setDeleting(true);
    try {
      await api.delete(`/events/${event._id}`);
      if (onDelete) onDelete(event._id);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to delete event');
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift">
      <h3 className="text-2xl font-bold mb-3">
        <Link to={`/events/${event._id}`} className="text-emerald-700 dark:text-emerald-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors no-underline">
          {event.title}
        </Link>
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">{event.description?.slice(0,120)}...</p>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">📅 {new Date(event.date).toLocaleString()}</p>
      <div className="flex items-center justify-between gap-3">
        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md">
          🌱 {event.carbonEstimateKg?.toFixed(2) || 0} kg CO₂
        </span>
        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md hover:scale-105 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? '⏳ Deleting...' : '🗑️ Delete'}
          </button>
        )}
      </div>
    </div>
  );
}
