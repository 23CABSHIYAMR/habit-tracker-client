# ✨ Habit Tracker Full-Stack Application

A premium, full-featured habit tracking application designed for consistency and visual excellence. This project features a robust Next.js frontend integrated with an Express/MongoDB backend, offering a seamless experience across various time-horizons (Day, Week, Month, Year).

## 🚀 Technical Architecture

### Frontend Layer
- **Framework**: Next.js 15 (App Router) for optimized routing and server-side rendering support.
- **Styling**: A sophisticated mix of **Tailwind CSS** for utility-first responsiveness, **Bootstrap 5** for structural components, and custom **SCSS** for a unique, premium design system.
- **State Management**: **Redux Toolkit** is utilized for global UI state (modals, auth, user preferences) and local data persistence.
- **Data Fetching & Caching**: **TanStack Query (React Query)** handles server state. It implements:
    - **Intelligent Caching**: Redux and React Query work in tandem to persist analytics and log data, minimizing redundant API calls during navigation.
    - **Optimistic Updates**: Using `useMutation`, the UI reflects habit completions instantly before the database confirms success.
- **Animations & UX**:
    - Localized **Confetti bursts** using `canvas-confetti` anchored to specific UI interaction points.
    - Smooth, animated **Progress Bars** that match chart aesthetics.
    - Dynamic Tooltips providing context-rich habit data on hover.

### Backend Layer
- **Runtime**: Node.js with **Express.js**.
- **Database**: **MongoDB** with **Mongoose** for schema-based data modeling.
- **Authentication**: Hybrid JWT and **Google OAuth 2.0** for flexible user onboarding.
- **Architecture**: Modular structure (Controllers, Services, Models, Middleware) with strictly typed/structured API responses.

---

## ✨ Key Features

### 📅 Multi-Timeline Habit Dashboard
- **Day View**: Focused daily task list with a sidebar log.
- **Week Grid**: A compact 7-day visualization for weekly consistency.
- **Month Calendar**: A full-month breakdown showing daily completion percentages and habit heatmaps.
- **Yearly Analytics**: High-level view of annual progress.
- **All-Time Stats**: Comprehensive historical record of all habit interactions.

### 🛠️ Advanced Habit Management
- **CRUD Operations**: Create, Edit, and Delete habits with unique names and frequencies.
- **Custom Palettes**: Select from curated color schemes that automatically theme the UI (charts, confetti, progress bars) for that specific habit.
- **Smart Validation**: Navigation is strictly bounded by the user's account creation date, preventing interactions with "pre-account" or "future" data.

### 📊 Deep Analytics
- **Achievement Percentages**: Real-time calculation of completion rates for any viewed period.
- **Trend Indicators**: Compare performance against the *previous* period (e.g., "Up 12% from last month") with color-coded trend arrows.
- **Date-Range Tooltips**: Hover over progress bars to see the exact coverage range.

---

## 🛠️ Implementation Details

### API & Routing
The frontend uses a structured service layer (`habitService`, `logService`) built on **Axios**. Routing is handled via the Next.js App Router, featuring:
- **(MainBody) Grouping**: Organizes shared layouts across all analytics views.
- **Dynamic Segments**: Used for habit-specific data retrieval and editing.

### Data Caching Strategy
A unique two-tier caching methodology is implemented:
1. **React Query**: Manages the "Stale-While-Revalidate" flow for active data fetching.
2. **Redux Store**: Caches "History Ranges" and "Analytics Reports" once fetched. This ensures that switching between 'Week' and 'Month' is instantaneous, as the app first checks the Redux `rangeCache` before triggering new network requests.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- NPM or PNPM

### Installation
1. **Clone & Install Dependencies**:
   ```bash
   # Frontend
   cd frontend && npm install
   # Backend
   cd backend && npm install
   ```
2. **Environment Configuration**:
   Create `.env` files in both directories following the provided `.env.example` templates.
3. **Run Development Mode**:
   - Backend: `npm run dev`
   - Frontend: `npm run dev`

---

## 📜 Development Scripts
- `npm run dev`: Start Next.js with Turbopack.
- `npm run sass`: Re-compile the premium SCSS design system.
- `npm run build`: Prepare production bundle.
- `npm run lint`: Code quality check.

---

*Built with ❤️ for productivity and visual excellence.*