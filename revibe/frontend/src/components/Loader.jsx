import React, { useEffect, useState } from 'react';

export default function Loader({ onLoadComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadComplete(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 flex items-center justify-center overflow-hidden">
      {/* Animated Background Leaves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              fontSize: `${20 + Math.random() * 30}px`,
              opacity: 0.3
            }}
          >
            🍃
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Spinning Leaf Circle */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 animate-spin-slow">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-12 h-12 text-4xl"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translate(50px) rotate(-${i * 45}deg)`,
                  transformOrigin: 'center'
                }}
              >
                🌿
              </div>
            ))}
          </div>
          
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
              <span className="text-4xl">♻️</span>
            </div>
          </div>
        </div>

        {/* Brand Name with Animated Gradient */}
        <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 dark:from-emerald-400 dark:via-teal-400 dark:to-green-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
          ReVibe
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 font-semibold animate-fade-in">
          Sustainable Events, Vibrant Future 🌍
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium">
          {progress}%
        </p>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 text-3xl animate-bounce-slow">
        <span className="animate-pulse" style={{ animationDelay: '0s' }}>🌱</span>
        <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>🌿</span>
        <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>🍀</span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(-10%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
