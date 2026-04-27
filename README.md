# CarDekho Assignment: AI Car Recommender

Hey! This is my submission for the CarDekho assignment. I built a full-stack web app that takes the guesswork out of car buying. Instead of overwhelming users with a massive list of cars, it uses AI to take their budget, preferences, and usage, and returns exactly 3 highly-tailored options.

## How to run it locally

You'll need Node.js installed and a Groq API key.

1. Go into the `client` folder: 
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file inside the `client` directory and add your API key:
   ```env
   GROQ_API_KEY=your_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be running at `http://localhost:3000`.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes (Serverless)
- **AI Integration:** Groq API (using the LLaMA 3.3 model for super fast responses)
- **State/Storage:** React State & LocalStorage for saving favorites

I chose Next.js because it let me build both the frontend UI and the backend API in one cohesive codebase, which made deploying to Netlify super easy. Tailwind and Framer Motion helped me put together a polished, premium-looking UI quickly.

## Core Features

- **Smart Search:** It doesn't just filter by price. It actually understands natural language inputs like "daily commute with family" or "needs a sunroof and good mileage".
- **Comparison Tool:** You can pick two cars from the results and compare their specs side-by-side in a modal.
- **Favorites:** You can save cars to your favorites list. This is saved in your browser's LocalStorage, so your shortlist stays there even if you refresh the page.

## Trade-offs & Decisions

Given the time constraints, I had to make a few deliberate cuts to focus on the core user experience:
- **No User Auth:** I skipped building a login/signup system since it wasn't strictly necessary for the core MVP and would have taken up too much time.
- **Placeholder Images:** Managing API keys and rate limits for real car images (like Unsplash or Google Custom Search) can be tricky, so I set up a dynamic placeholder system that pulls relevant images based on the car's name.
- **Simplified Backend:** Initially, I had a separate Express server, but I moved the logic into Next.js API routes to make hosting much simpler.

## If I had more time...

If I were to keep working on this, here's what I'd build next:
1. **Real Image API:** Hooking up a dedicated automotive API to pull the exact, high-quality photos of the recommended cars.
2. **Cost Calculator:** A tool to estimate the 5-year cost of ownership (insurance, fuel, maintenance).
3. **Real Database:** Moving the favorites system from LocalStorage to a proper database like PostgreSQL/Supabase so users can access their saved cars across different devices.
