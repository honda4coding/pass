# Pass - Mock Interviews Platform (Frontend)

Pass is a platform that connects users with industry experts for mock interviews to prepare for their dream jobs.

## Tech Stack
- Next.js (React)
- SCSS Modules
- Zustand for State Management
- Axios for API requests
- PayPal React SDK for Payments

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory and add the following variable:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

When deploying to Vercel, you need to configure the following Environment Variables in your Vercel project settings:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | The URL of your deployed Backend API. Example: `https://your-backend-url.vercel.app/api/v1` |

**Important Note:** Make sure your backend API is deployed FIRST, so you can copy its URL and place it here in the Frontend's Vercel settings.
