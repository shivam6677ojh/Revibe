import React, { useState } from 'react';
import { useApi } from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function EventCreate() {
  const api = useApi();
  const nav = useNavigate();
  const [form, setForm] = useState({ title:'', description:'', date:'', location:'', avgFootprintPerAttendeeKg:5, durationHours:2 });
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await api.post('/events', form);
      nav(`/events/${r.data._id}`);
    } catch (e) { setError(e.response?.data?.error || 'Error'); }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 transition-colors py-12">
    <div className="container mx-auto px-6 md:px-12">
    <form onSubmit={submit} className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-4xl font-black text-emerald-700 dark:text-emerald-400 mb-8">✨ Create Event</h2>
      {error && <div className="text-red-700 dark:text-red-200 bg-red-50 dark:bg-red-900 p-4 rounded-lg mb-4 font-semibold">{error}</div>}
      {['title','description','location'].map(f => (
        <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})} className="w-full px-5 py-3.5 mb-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-base bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors" />
      ))}
      <input type="datetime-local" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="w-full px-5 py-3.5 mb-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-base bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">Carbon Footprint (kg/attendee)</label>
          <input type="number" step="0.1" value={form.avgFootprintPerAttendeeKg} onChange={e=>setForm({...form,avgFootprintPerAttendeeKg:Number(e.target.value)})} className="w-full px-5 py-3.5 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-base bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none" />
        </div>
        <div>
          <label className="block mb-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">Duration (hours)</label>
          <input type="number" step="0.5" value={form.durationHours} onChange={e=>setForm({...form,durationHours:Number(e.target.value)})} className="w-full px-5 py-3.5 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-base bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none" />
        </div>
      </div>
      <button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:scale-105 transition-transform w-full cursor-pointer">Create Event</button>
    </form>
    </div>
    </div>
  );
}
