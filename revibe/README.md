# Revibe

A MERN stack application featuring Clerk authentication, event management with carbon tracking, RSVP system with email confirmations (Nodemailer), and gamified badges.

## Project Structure
```
revibe/
  backend/
    package.json
    server.js
    .env.example
    config/db.js
    middleware/clerkAuth.js
    models/{User.js, Event.js, Rsvp.js, Badge.js}
    routes/{auth.js, events.js, rsvps.js, admin.js, badges.js}
    utils/mail.js
  frontend/
    package.json
    vite.config.js
    .env.example
    index.html
    src/
      main.jsx
      App.jsx
      App.css
      api/axios.js
      pages/{EventList.jsx, EventCreate.jsx, EventDetail.jsx, Profile.jsx, Badges.jsx, AdminPanel.jsx}
      components/{Navbar.jsx, EventCard.jsx, Footer.jsx}
```

## Environment Variables
### Backend `.env`
```
PORT=5000
MONGODB_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_secret_key
SMTP_USER=your_gmail_address
SMTP_PASS=your_gmail_app_password
EMAIL_FROM=Revibe <your_gmail_address>
```

### Frontend `.env`
```
VITE_API_BASE=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Carbon Formula
```
totalCarbon = attendees * avgFootprintPerAttendeeKg * durationHours
```
Recalculated after each RSVP.

## Badge Types
- Early Bird (first X RSVPs)
- Eco Warrior (RSVP to eco-friendly events)
- Low Carbon Host (organizer with low avg footprint)
- Community Champ (attends X events)

## Initial API Overview
- POST /auth/ensure (create or fetch user)
- GET /events (approved events)
- POST /events (organizer)
- GET /events/:id
- PUT /events/:id (organizer/admin)
- POST /events/:id/approve (admin)
- GET /events/:id/carbon
- POST /rsvps/:eventId (RSVP + email + badges)
- GET /badges (current user badges)
- POST /badges/award (manual/admin)
- GET /admin/events/pending

## Setup
Backend:
```
cd backend
npm install
npm run dev
```
Frontend:
```
cd frontend
npm install
npm run dev
```

## Deployment (No Docker)
- Backend: Render (set env vars)
- Frontend: Netlify/Vercel (set publishable key + API base)
- MongoDB Atlas connection string in backend
- Clerk dashboard: allowed URLs (localhost, render, netlify)

## Roadmap Phases
1. Setup folders & tooling
2. Clerk auth (frontend + middleware)
3. Event management & approval
4. RSVP + Nodemailer emails
5. Carbon tracking engine
6. Badge gamification
7. Frontend pages & navigation
8. Testing core flows
9. UI/UX polish
10. Deployment

---
Generated scaffold ready for iterative feature development.
