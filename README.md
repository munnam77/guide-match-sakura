# 🌸 SakuraGuide - Guide-Traveler Matching Platform

A production-quality demo application connecting Japanese tour guides with travelers. Built with Next.js 15, TypeScript, and TailwindCSS.

## Demo Purpose

This is a **DEMO APPLICATION** designed to impress the client (富樫里恵 / private-guide-sakura) who wants to build a platform connecting travelers with Japanese tour guides. The client values quality and honesty after being burned by a previous developer.

## Features

### Landing Page
- Beautiful hero section with sakura pink theme
- Search bar with area input
- "How it works" section (3 steps)
- Featured guides grid (6 guides)
- Testimonials section
- CTA section

### Authentication
- **Three one-click demo login buttons** on login page:
  - 🧳 旅行者としてログイン (Login as Traveler)
  - 🗾 ガイドとしてログイン (Login as Guide)
  - ⚙️ 管理者としてログイン (Login as Admin)
- Auth context with localStorage persistence
- Protected routes by role

### Guide Search & Discovery
- Advanced filters (area, language, specialty, price, rating)
- Sort options (recommended, rating, price)
- Beautiful guide cards with ratings and specialties
- Search functionality

### Guide Profile
- Large hero photo with gallery placeholder
- Detailed bio, languages, certifications
- Specialty badges
- Availability calendar
- Tour plans with pricing
- Reviews section with ratings breakdown
- "Book this Guide" CTA button

### Traveler Dashboard
- Upcoming bookings overview
- Past bookings with review status
- Favorite guides grid
- Stats cards (bookings, completed tours, favorites, messages)

### Guide Dashboard
- Today's schedule
- Upcoming bookings with traveler info
- Earnings summary (this month, total)
- Stats cards (earnings, bookings, rating, total earnings)
- Accept/decline bookings functionality

### Admin Dashboard
- Overview stats (users, guides, bookings, revenue)
- **Guide approval queue** with pending registrations
  - View qualification documents
  - Approve/reject pending guides
- User management table
- Booking management
- **Word filter settings** (banned words list management)
- Commission rate settings

### Messaging System
- Conversation list sidebar
- Real-time-style chat window
- **Word filter in action** - filters banned words to ***
- Message bubbles with timestamps
- Attachment support (mock)
- Filter notification when banned words detected

### Booking Flow
- Date selection with availability calendar
- Tour plan selection
- Number of people selector
- Special requests textarea
- Price breakdown
- Mock payment button (Stripe-style)
- Safety notice with return guarantee

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Date Handling**: date-fns
- **State Management**: React Context API

## Mock Data

The application includes comprehensive mock data:

- **8 Guides** (6 approved, 2 pending approval)
  - Realistic Japanese names and bios
  - Areas: Tokyo, Kyoto, Osaka, Hokkaido, Okinawa, Hiroshima
  - Multiple specialties, languages, certifications
  - Tour plans with pricing
  - Availability calendars

- **4 Travelers** with realistic data
- **10 Bookings** with various statuses
- **15 Reviews** with ratings and comments
- **Message threads** with word filtering examples
- **Admin settings** with word filter list

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Login

On the login page, click any of the three demo buttons:

1. **🧳 旅行者としてログイン** - See the traveler experience
2. **🗾 ガイドとしてログイン** - See the guide dashboard and earnings
3. **⚙️ 管理者としてログイン** - See the admin panel with approval queue

## Key Demo Features to Show Client

1. **One-Click Demo Login** - No registration needed to explore
2. **Guide Approval System** - Admin can review and approve pending guides
3. **Word Filter** - Automatic filtering of banned words in messages
4. **Beautiful UI** - FAANG-level polish with sakura pink theme
5. **Complete User Flows** - From browsing to booking to messaging
6. **Responsive Design** - Mobile-first approach
7. **Japanese Language** - All UI in Japanese as requested

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── login/page.tsx     # Login with 3 demo buttons
│   ├── guides/
│   │   ├── page.tsx       # Guide search
│   │   └── [id]/page.tsx  # Guide profile
│   ├── dashboard/
│   │   ├── traveler/      # Traveler dashboard
│   │   ├── guide/         # Guide dashboard
│   │   └── admin/         # Admin dashboard
│   └── messages/          # Messaging with word filter
├── components/
│   ├── ui/                # shadcn components
│   ├── layout/            # Header, Footer
│   ├── guides/            # GuideCard, Filters, ReviewCard
│   ├── booking/           # BookingDialog
│   └── dashboard/         # StatsCard
├── contexts/
│   └── AuthContext.tsx    # Authentication with demo logins
├── data/                  # Mock data
│   ├── guides.ts          # 8 guides (6 approved, 2 pending)
│   ├── travelers.ts       # 4 travelers
│   ├── bookings.ts        # 10 bookings
│   ├── reviews.ts         # 15 reviews
│   ├── messages.ts        # Message threads
│   └── settings.ts        # Word filter settings
└── types/
    └── index.ts           # TypeScript types
```

## Design Philosophy

- **Sakura Pink Theme** (#F472B6 / pink-400) as primary color
- **Warm, Clean, Modern** design - Airbnb Experiences meets Japanese aesthetics
- **FAANG-level UI/UX** - Every pixel matters
- **Smooth Transitions** - Hover states, shadows, animations
- **Mobile-First** - Responsive design throughout

## What Makes This Demo Special

1. ✅ **Fully Functional** - All pages work with mock data
2. ✅ **Production Quality** - Clean code, TypeScript, best practices
3. ✅ **Complete Features** - Approval system, word filter, booking flow
4. ✅ **Beautiful Design** - Polished UI that impresses
5. ✅ **Easy to Demo** - One-click login, realistic data
6. ✅ **Compiles Without Errors** - Production build tested

## Next Steps for Real Implementation

When converting to a real application:

1. Replace mock data with database (PostgreSQL/MongoDB)
2. Implement real authentication (NextAuth.js)
3. Add payment processing (Stripe)
4. Implement file upload for guide photos and documents
5. Add real-time messaging (WebSocket/Pusher)
6. Implement email notifications
7. Add search with Algolia or Elasticsearch
8. Deploy to Vercel or AWS

---

Built with ❤️ for 富樫里恵 (private-guide-sakura) to demonstrate quality and capability.
