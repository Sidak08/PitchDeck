# The Pitch Deck - Frontend

A Next.js-based frontend for The Pitch Deck platform. This application uses Next.js, React, Tailwind CSS, and various other modern web technologies.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v10 or later)

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies

```bash
pnpm install
```

4. Copy the example environment file and update it with your values

```bash
cp .env.local.example .env.local
```

5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL to the backend API | `https://pitchdeck-ddnd.onrender.com` |
| `NEXT_PUBLIC_UNDER_CONSTRUCTION` | Enables "under construction" mode | `false` |

## Features

### Under Construction Mode

The application includes an "under construction" mode that can be enabled by setting the `NEXT_PUBLIC_UNDER_CONSTRUCTION` environment variable to `true`. When enabled:

1. Login, signup, and competitions buttons will be hidden from the navigation bar
2. The following sections will be hidden from the homepage:
   - Stats section (showing competition numbers, participants, etc.)
   - Features section (About Us)
   - Champions section (Past Winners)
3. Users attempting to access the following routes will be redirected to the under-construction page:
   - `/auth/login`
   - `/auth/signup`
   - `/competitions`
   - `/apply`
   - `/dashboard` (and all sub-routes)
   - `/about`

This feature is useful during development or when specific sections of the site are not ready for public use.

To enable under construction mode:

1. Set `NEXT_PUBLIC_UNDER_CONSTRUCTION=true` in your `.env.local` file
2. Restart the development server

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and shared code
- `/public` - Static assets like images and fonts

## Deployment

The application is configured for deployment on Vercel. Simply push to the main branch to trigger a deployment.

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request