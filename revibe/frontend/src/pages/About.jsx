export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors py-12">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white mb-4">
            About ReVibe
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto"></div>
        </div>

        {/* Mission */}
        <section className="mb-16 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-3">
            <span>🎯</span> Our Mission
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
            ReVibe brings people together through sustainable, low-impact festivals and local gatherings.
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
            We aim to promote environmental awareness, empower organizers with better tools, and reward individuals who choose eco-friendly lifestyles.
          </p>
        </section>

        {/* What We Believe */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
            <span>💡</span> What We Believe
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Joy and sustainability can coexist',
              'Community events can be climate-positive',
              'Small actions create big change',
              'Technology can inspire greener habits'
            ].map((belief, i) => (
              <div key={i} className="bg-white dark:bg-slate-700 p-6 rounded-2xl shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow">
                <p className="text-lg font-semibold text-slate-800 dark:text-white flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 text-2xl">✓</span>
                  {belief}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How We Started */}
        <section className="mb-16 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <span>🌱</span> How We Started
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
            ReVibe was created to help communities rebuild after times of isolation — but in a way that respects the environment. We wanted a platform that makes gatherings fun, measurable, and eco-conscious.
          </p>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-10 text-center">
            Core Values
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: '🌱', title: 'Sustainability', color: 'from-green-500 to-emerald-600' },
              { icon: '💬', title: 'Community', color: 'from-blue-500 to-cyan-600' },
              { icon: '🔍', title: 'Transparency', color: 'from-purple-500 to-pink-600' },
              { icon: '🎉', title: 'Joy', color: 'from-yellow-500 to-orange-600' },
              { icon: '🎖', title: 'Gamification', color: 'from-red-500 to-rose-600' }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className={`bg-gradient-to-br ${value.color} w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl shadow-2xl mb-4 hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {value.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
