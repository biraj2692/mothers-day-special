# Mother's Day Tribute Web Application

A full-stack web application built with Next.js (App Router), Tailwind CSS, and Supabase to create and share beautiful, personalized Mother's Day tributes.

## Features

- **Multi-step Form:** Collect tribute details including name, favorite color, favorite food, personal message, and images.
- **Dynamic Tribute Pages:** Unique URLs for each tribute with a background and UI accents that dynamically adapt to the selected favorite color.
- **Image Gallery:** Stylish Polaroid-style presentation for uploaded photos.
- **QR Code Sharing:** Generate and share QR codes for easy access to the tribute pages.
- **Supabase Integration:** Robust backend for storing text data and uploading images to cloud storage.
- **Modern UI/UX:** Built with Tailwind CSS, Framer Motion for smooth animations, and a responsive design.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Supabase (Database & Storage)
- **Styling:** Tailwind CSS, Glassmorphism effects
- **Typography:** Geist (Default Next.js font), Playfair Display (for messages)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A [Supabase](https://supabase.com/) account and project.

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables from your Supabase project:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

1. Create a `tributes` table in your Supabase project with the following schema:
   - `id` (uuid, primary key)
   - `created_at` (timestamp with time zone)
   - `mom_name` (text)
   - `fav_color` (text)
   - `fav_food` (text)
   - `message` (text)
   - `image_urls` (text array)
2. Create a public storage bucket named `mom-images` for storing the uploaded photos. Ensure public access is enabled.

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

This project can be easily deployed on [Vercel](https://vercel.com/) or any other Next.js compatible hosting platform. Remember to set the environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your hosting provider's dashboard.

