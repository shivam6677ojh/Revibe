import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900 text-white shadow-2xl sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="text-3xl font-black hover:scale-110 transition-transform flex items-center gap-2">
            🌿 ReVibe
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-semibold hover:text-green-200 transition-colors">Home</Link>
            <Link to="/about" className="font-semibold hover:text-green-200 transition-colors">About</Link>
            <Link to="/events" className="font-semibold hover:text-green-200 transition-colors">Events</Link>
            <Link to="/calculator" className="font-semibold hover:text-green-200 transition-colors">Calculator</Link>
            <Link to="/badges" className="font-semibold hover:text-green-200 transition-colors">Badges</Link>
            <Link to="/community" className="font-semibold hover:text-green-200 transition-colors">Community</Link>
            <Link to="/contact" className="font-semibold hover:text-green-200 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-2xl cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white text-emerald-700 px-6 py-2 rounded-full font-bold hover:bg-green-50 transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link to="/create" className="hidden md:block bg-emerald-500/30 border-2 border-white px-6 py-2 rounded-full font-bold hover:bg-emerald-500/40 transition-colors cursor-pointer">
                + Create Event
              </Link>
              <Link to="/profile" className="hidden md:block hover:text-green-200 transition-colors cursor-pointer">
                Profile
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 text-2xl cursor-pointer"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 px-4 rounded-lg hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block py-2 px-4 rounded-lg hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/events" className="block py-2 px-4 rounded-lg hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>Events</Link>
            <Link to="/calculator" className="block py-2 px-4 rounded-lg hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>Calculator</Link>
            <Link to="/badges" className="block py-2 px-4 rounded-lg hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>Badges</Link>
            <Link to="/community" className="block py-2 px-4 rounded-lg hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>Community</Link>
            <Link to="/contact" className="block py-2 px-4 rounded-lg hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <SignedIn>
              <Link to="/create" className="block py-2 px-4 rounded-lg hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>Create Event</Link>
              <Link to="/profile" className="block py-2 px-4 rounded-lg hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
            </SignedIn>
          </div>
        )}
      </div>
    </nav>
  );
}
