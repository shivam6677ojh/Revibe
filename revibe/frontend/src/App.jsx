import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useApi } from "./api/axios.js";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Loader from "./components/Loader.jsx";
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import EventList from './pages/EventList.jsx';
import EventDetail from './pages/EventDetail.jsx';
import EventCreate from './pages/EventCreate.jsx';
import CarbonCalculator from './pages/CarbonCalculator.jsx';
import Badges from './pages/Badges.jsx';
import Community from './pages/Community.jsx';
import Contact from './pages/Contact.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import Profile from './pages/Profile.jsx';

function AuthSync() {
  const { user } = useUser();
  const api = useApi();
  
  useEffect(() => {
    if (user) {
      api.post('/auth/ensure').catch(err => console.error('Auth sync failed:', err));
    }
  }, [user, api]);
  
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading && <Loader onLoadComplete={() => setLoading(false)} />}
      {!loading && (
        <BrowserRouter>
          <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
            <Navbar />
            <SignedIn>
              <AuthSync />
            </SignedIn>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/calculator" element={<CarbonCalculator />} />
              <Route path="/community" element={<Community />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/badges" element={<Badges />} />
              <Route path="/create" element={<EventCreate />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            <Chatbot />
          </div>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}
export default App;
