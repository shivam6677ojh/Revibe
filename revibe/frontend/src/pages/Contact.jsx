import { useState } from 'react';
import { useApi } from '../api/axios';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contact() {
  useScrollAnimation();
  
  const api = useApi();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/contact/send', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors py-12">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white mb-4">
            📩 Get in Touch
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have questions or ideas for a sustainable event? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 animate-on-scroll">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Your Name
                </label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Your Message
                </label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="6"
                  className="w-full p-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 transition-all resize-none"
                  placeholder="Tell us about your event idea or question..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl text-lg font-bold shadow-xl hover:scale-105 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message ✉️'}
              </button>

              {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-xl text-center font-semibold">
                  ✗ {error}
                </div>
              )}

              {submitted && (
                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-xl text-center font-semibold">
                  ✓ Message sent successfully! Check your email for confirmation.
                </div>
              )}
            </form>
          </div>

          {/* Support Info */}
          <div className="space-y-6">
            
            {/* Support Topics */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 animate-on-scroll delay-100">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                💡 Support Topics
              </h2>
              <ul className="space-y-4">
                {[
                  'How to host an eco-friendly event',
                  'How to calculate carbon footprint',
                  'How badges & rewards work',
                  'Partnering with ReVibe',
                  'Technical support'
                ].map((topic, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                    <span className="text-emerald-600 dark:text-emerald-400 text-xl">✓</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-800 dark:to-teal-900 rounded-3xl shadow-xl p-8 text-white animate-on-scroll delay-200">
              <h2 className="text-2xl font-bold mb-6">📧 Direct Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Email</div>
                    <div className="font-bold">support@revibe.eco</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                    🕐
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Response Time</div>
                    <div className="font-bold">Within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                    🌍
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Community</div>
                    <div className="font-bold">Join our Discord</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 animate-on-scroll delay-300">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                🌐 Follow Us
              </h2>
              <div className="flex gap-4">
                {['🐦 Twitter', '📘 Facebook', '📸 Instagram', '💼 LinkedIn'].map((social, i) => (
                  <button key={i} className="flex-1 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 p-4 rounded-xl font-semibold text-slate-700 dark:text-white hover:scale-105 transition-transform text-center">
                    {social.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
