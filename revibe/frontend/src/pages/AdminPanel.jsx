import React, { useEffect, useState } from 'react';
import { useApi } from '../api/axios';

export default function AdminPanel() {
  const api = useApi();
  const [pending, setPending] = useState([]);
  const load = () => api.get('/admin/events/pending').then(r => setPending(r.data)).catch(()=>{});
  useEffect(load, []);
  const approve = async (id) => {
    await api.post(`/events/${id}/approve`);
    load();
  };
  return (
    <div className="py-8">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#155e63] to-[#1b8f5a] bg-clip-text text-transparent mb-8">⚙️ Admin Panel</h2>
      <div className="grid gap-4">
        {pending.map(p => (
          <div key={p._id} className="bg-white border-2 border-yellow-400 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-[#155e63] mb-4">{p.title}</h3>
            <button onClick={()=>approve(p._id)} className="bg-gradient-to-r from-green-500 to-green-400 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:-translate-y-0.5 transition-transform">✓ Approve</button>
          </div>
        ))}
        {pending.length===0 && <p className="text-center py-12 bg-slate-50 rounded-xl text-slate-500 text-lg">No pending events.</p>}
      </div>
    </div>
  );
}
