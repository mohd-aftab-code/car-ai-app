# Car AI Recommendation System - CarDekho Assignment

This project is a full-stack, AI-native web application designed to help car buyers move from confusion to a confident shortlist of vehicles.

## 🚀 Quick Start (Under 2 Minutes)

### 1. Prerequisites
- Node.js (v18+)
- A Groq API Key (Place it in `server/.env`)

### 2. Setup & Run
Run these commands in your terminal:

**One-Command Local Setup:**
```bash
cd client
npm install
npm run dev
```
The app will be available at `http://localhost:3000`.

---

## ☁️ Deployment (Netlify/Vercel)

I have migrated the backend logic into **Next.js API Routes** (`/api/cars/recommend`). This allows you to deploy the entire app to Netlify in one click without needing a separate server.

### Steps for Netlify:
1.  **Build Settings**:
    *   Base directory: `client`
    *   Build command: `npm run build`
    *   Publish directory: `.next`
2.  **Environment Variables**:
    *   Add `GROK_API_KEY` in the Netlify Dashboard (Site settings > Environment variables).

---

## 🛠 Tech Stack & Rationale
- **Frontend**: Next.js (React), Tailwind CSS, Framer Motion.
  - *Why*: Next.js provides the fastest path to a production-ready React app. Tailwind allowed for "premium" styling in minutes. Framer Motion was used for high-end micro-animations to give it a "polished" feel.
- **Backend**: Node.js, Express.
  - *Why*: Simple, fast to scaffold, and excellent for handling AI streaming or JSON responses.
- **AI Engine**: Groq API (Llama 3.3-70b-versatile).
  - *Why*: Groq is the fastest inference engine available, making the recommendation experience feel instantaneous.
- **Persistence**: LocalStorage.
  - *Why*: Within a 2-3 hour window, LocalStorage provides immediate state persistence for "Favorites" without the overhead of setting up a database (PostgreSQL/MongoDB).

---

## 🧠 AI Delegation vs. Manual Effort
- **AI Delegation**:
  - Scaffolding components and CSS.
  - Generating complex regex for parsing AI responses.
  - Drafting the initial prompt for the recommendation logic.
- **Manual Effort**:
  - **Architecture Design**: Deciding on the controller/route pattern for the backend.
  - **Debugging**: Recovering from model deprecation errors and image loading issues.
  - **Fine-tuning**: Manually adjusting the AI prompt to ensure structured JSON output for technical specs.
- **Where AI helped most**: It allowed me to "ship" a premium-looking UI in under 30 minutes.
- **Where AI got in the way**: It initially suggested a decommissioned model name (`grok-beta`), requiring manual research to find the current active models in 2026.

---

## 🎯 Product Decisions
### What was built?
I built a **"Confidence Engine"**. Instead of a massive list of cars, it gives you exactly 3 highly-tailored options. It includes:
1. **Intelligent Search**: Beyond just budget, it looks at usage and personal preferences.
2. **Side-by-Side Comparison**: Directly compare the technical specs of your top 2 choices.
3. **Favorites Persistence**: Keep a shortlist that stays with you.

### What was deliberately cut?
1. **User Auth**: Not necessary for an MVP; adds too much ceremony for a 2-hour window.
2. **Real Image API**: I used a dynamic placeholder system to avoid the time-sink of API key management for Unsplash/Google Search.
3. **Admin Dashboard**: Focused purely on the buyer's journey.

---

## ⏳ If I had 4 more hours...
1. **Real Image API Integration**: Integrate with a dedicated automotive image API for 100% accurate photos.
2. **Cost of Ownership Calculator**: Add a feature that estimates insurance, maintenance, and fuel costs over 5 years.
3. **Interactive 3D Views**: Use Three.js to show 364° views of the recommended cars.
4. **Backend Persistence**: Migrate LocalStorage to a Supabase/PostgreSQL backend for multi-device sync.

---

## 📹 Screen Recording
The entire build process was recorded using the **Antigravity AI IDE Recording System**. The WebP session videos are stored in the platform's artifacts directory as part of this conversation.
