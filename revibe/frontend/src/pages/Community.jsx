export default function Community() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors py-12">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white mb-4">
            👫 Community
          </h1>
          <p className="text-2xl text-emerald-600 dark:text-emerald-400 font-bold mb-2">
            Connect. Share. Inspire.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            ReVibe helps build a supportive network of people who care about the planet and want to celebrate responsibly.
          </p>
        </div>

        {/* Community Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
            Community Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '📖', title: 'User Stories', desc: 'Share your sustainable event experiences and inspire others' },
              { icon: '💬', title: 'Discussion Boards', desc: 'Join conversations about eco-friendly practices and events' },
              { icon: '👥', title: 'Local Group Chats', desc: 'Connect with nearby members planning green gatherings' },
              { icon: '🎯', title: 'Challenges & Streaks', desc: 'Complete eco-missions like "Attend 3 low-impact events this month"' }
            ].map((feature, i) => (
              <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Active Challenges */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
            🔥 Challenges You Can Join
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Zero Waste Weekend', 
                desc: 'Attend an event with zero single-use items', 
                participants: 342,
                color: 'from-green-500 to-emerald-600'
              },
              { 
                name: 'Car-Free Festival Month', 
                desc: 'Use sustainable transport for all events', 
                participants: 218,
                color: 'from-blue-500 to-cyan-600'
              },
              { 
                name: 'Clean-Up Crew Meetup', 
                desc: 'Volunteer at a post-event cleanup', 
                participants: 156,
                color: 'from-purple-500 to-pink-600'
              }
            ].map((challenge, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden hover:-translate-y-1 transition-transform">
                <div className={`bg-gradient-to-r ${challenge.color} h-3`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{challenge.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{challenge.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      👥 {challenge.participants} joined
                    </span>
                    <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-colors cursor-pointer">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:scale-105 transition-transform cursor-pointer">
              View All Challenges
            </button>
          </div>
        </section>

        {/* Recent Stories */}
        <section>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
            📚 Recent Community Stories
          </h2>
          <div className="space-y-6">
            {[
              { 
                user: 'Sarah M.', 
                story: 'Attended Green Harmony Fest and loved the zero-waste food court! Brought my own containers and saved so much plastic. The music was amazing too! 🎵',
                badge: '♻️ Zero-Waste Hero',
                time: '2 hours ago'
              },
              {
                user: 'James K.',
                story: 'Cycled 15km to Solar Sundays and it was worth every pedal! The energy at the event was incredible, and I earned my Eco Traveller badge! 🚲',
                badge: '🚲 Eco Traveller',
                time: '5 hours ago'
              },
              {
                user: 'Emma L.',
                story: 'Organized my first low-carbon picnic using ReVibe. 20 people attended and we offset 12kg of CO₂ compared to traditional events! 🌱',
                badge: '🌿 Community Builder',
                time: '1 day ago'
              }
            ].map((post, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {post.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-slate-800 dark:text-white">{post.user}</span>
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold">
                        {post.badge}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 ml-auto">{post.time}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200">{post.story}</p>
                    <div className="flex gap-4 mt-4 text-slate-500 dark:text-slate-400">
                      <button className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">❤️ 24</button>
                      <button className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">💬 5</button>
                      <button className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">🔄 Share</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
