import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 dark:from-emerald-800 dark:via-teal-900 dark:to-cyan-950 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              ReVibe — <span className="text-green-300">Celebrate Sustainably.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50 leading-relaxed">
              Discover eco-friendly local events and track your impact.
            </p>
            <p className="text-lg md:text-xl mb-12 text-green-100 max-w-2xl mx-auto">
              Join the movement that brings joy back to communities — without harming the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events" className="bg-white text-emerald-700 px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:bg-green-50 hover:scale-105 transition-all cursor-pointer">
                🌿 Explore Events
              </Link>
              <Link to="/create" className="bg-emerald-500/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-500/30 hover:scale-105 transition-all cursor-pointer">
                🎪 Host an Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why ReVibe Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-black text-center text-slate-800 dark:text-white mb-6">
            Why ReVibe?
          </h2>
          <p className="text-xl text-center text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto">
            Communities are rebuilding joy through meaningful, eco-conscious gatherings.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Find Sustainable Festivals</h3>
              <p className="text-slate-600 dark:text-slate-300">Discover eco-friendly events near you</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Track Your Footprint</h3>
              <p className="text-slate-600 dark:text-slate-300">Learn your carbon impact before attending</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🏅</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Earn Green Badges</h3>
              <p className="text-slate-600 dark:text-slate-300">Get rewarded for sustainable actions</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Support Local Organizers</h3>
              <p className="text-slate-600 dark:text-slate-300">Back those who care about the planet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-black text-center text-slate-800 dark:text-white mb-16">
            Featured Eco-Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { name: 'Green Harmony Fest', desc: 'Zero-waste food stalls, music, & workshops', emoji: '🎵' },
              { name: 'Solar Sundays', desc: 'Outdoor activities powered by clean energy', emoji: '☀️' },
              { name: 'EcoArt Pop-Up', desc: 'Recycled materials art showcase', emoji: '🎨' },
              { name: 'Nature Walk Meetup', desc: 'Guided hike + climate tips', emoji: '🥾' }
            ].map((event, i) => (
              <div key={i} className="bg-gradient-to-br from-green-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                <div className="text-5xl mb-4">{event.emoji}</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{event.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{event.desc}</p>
                <Link to="/events" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/events" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:scale-105 transition-transform inline-block cursor-pointer">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* How ReVibe Works */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 transition-colors">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-black text-center text-slate-800 dark:text-white mb-16">
            How ReVibe Works
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { step: 1, text: 'Discover eco-friendly local events', icon: '🔍' },
              { step: 2, text: 'Track your carbon footprint', icon: '📉' },
              { step: 3, text: 'Attend responsibly with sustainability tips', icon: '✅' },
              { step: 4, text: 'Earn reward badges for your actions', icon: '🎖️' },
              { step: 5, text: 'Share your impact with the community', icon: '🌐' }
            ].map(item => (
              <div key={item.step} className="flex items-start gap-6 bg-white dark:bg-slate-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-black">
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                    <span>{item.icon}</span>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Movement CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Join the Movement
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-green-50">
            Celebrate, connect, and protect the planet — one event at a time.
          </p>
          <Link to="/events" className="bg-white text-emerald-700 px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-green-50 hover:scale-110 transition-all inline-block cursor-pointer">
            Get Started 🚀
          </Link>
        </div>
      </section>
    </div>
  );
}
