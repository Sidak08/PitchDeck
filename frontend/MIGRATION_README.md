# Express.js to Next.js Migration Guide

## 🎉 Migration Complete!

The Express.js backend has been successfully converted to Next.js API routes. All functionality has been preserved while gaining the benefits of a unified full-stack application.

## Quick Start

### 1. Environment Setup
```bash
# Copy the environment template
cp .env.example .env.local

# Edit the environment variables
# Set your MongoDB URI and JWT secret
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
# Option 1: Use the setup script (recommended)
./setup-and-test.sh

# Option 2: Manual start
npm run dev
```

### 4. Test the Migration
```bash
# Basic health check
node health-check.js

# Comprehensive API test
node test-api.js
```

## What Was Migrated

### API Endpoints ✅
- **Authentication**: `/api/auth/*` (signup, login, logout, me, favourites)
- **Competitions**: `/api/competitions` (GET, POST)
- **Redirects**: `/api/redirect/*` (competitions, applications)

### Core Features ✅
- JWT-based authentication with HTTP-only cookies
- MongoDB integration with Mongoose
- Data validation with Joi schemas
- CORS handling
- Error management
- TypeScript support throughout

### Frontend Updates ✅
- All components updated to use local API routes
- Removed external API dependencies
- Maintained existing UI/UX

## Architecture Changes

### Before (Express.js)
```
backend/src/
├── server.ts
├── routes/
├── controllers/
├── models/
└── middleware/

frontend/
├── components/
└── pages/
```

### After (Next.js Full-Stack)
```
frontend/
├── app/api/          # API routes (was backend)
├── lib/              # Shared utilities
│   ├── models/       # Database models
│   ├── middleware/   # Auth & validation
│   └── config/       # Database config
├── components/       # React components
└── app/              # Pages & layouts
```

## Environment Variables

Create `.env.local` with these variables:

```bash
# Database
MONGO_URI=mongodb://localhost:27017/pitchdeck

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Environment
NODE_ENV=development

# Optional
NEXT_PUBLIC_UNDER_CONSTRUCTION=false
```

## Testing

### Health Check
```bash
node health-check.js
```
Tests basic endpoint availability and expected responses.

### Full API Test
```bash
node test-api.js
```
Comprehensive test suite covering:
- User registration and login
- Authentication flows
- Competition management
- Favourites functionality
- Redirect endpoints

## Development Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run lint         # Run linter
```

## API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "competitor",
  "school": "Example High School",
  "grade": "12"
}
```

#### POST `/api/auth/login`
Authenticate a user.
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Get current authenticated user (requires auth cookie).

#### POST `/api/auth/logout`
Log out the current user.

#### GET `/api/auth/favourites`
Get user's favourite competitions (requires auth).

#### POST `/api/auth/favourites`
Add/remove a competition from favourites (requires auth).
```json
{
  "competitionId": "competition_id_here"
}
```

### Competition Endpoints

#### GET `/api/competitions`
Get all competitions.

#### POST `/api/competitions`
Create a new competition.
```json
{
  "title": "Competition Title",
  "organizer": "Organizer Name",
  "logo": "https://example.com/logo.png",
  "gradeEligibility": "9-12",
  "deadline": "2024-12-31T23:59:59.000Z",
  "prize": "$1000",
  "status": "open",
  "description": "Competition description",
  "applicationType": "online",
  "applyUrl": "https://example.com/apply",
  "frequency": "annual",
  "dates": ["24/01/01", "24/01/15"],
  "location": "Online",
  "cost": "Free"
}
```

### Redirect Endpoints

#### GET `/api/redirect/competitions`
Redirects to the competitions dashboard.

#### GET `/api/redirect/applications`
Redirects to the external application form.

## Troubleshooting

### Common Issues

#### MongoDB Connection Failed
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env.local`
- Verify network connectivity

#### 500 Internal Server Error
- Check server logs in the terminal
- Verify environment variables are set
- Ensure all dependencies are installed

#### Authentication Issues
- Check `JWT_SECRET` is set in `.env.local`
- Clear browser cookies and try again
- Verify the auth endpoints are working

#### Build Errors
- Run `npm install` to ensure dependencies
- Check for TypeScript errors: `npm run lint`
- Verify all environment variables are set

### Getting Help

1. Check the server console for error messages
2. Run the health check: `node health-check.js`
3. Verify environment setup with: `./setup-and-test.sh`
4. Check that MongoDB is accessible

## Migration Benefits

- **Simplified Deployment**: Single application to deploy
- **Better Performance**: Reduced network latency
- **Unified Development**: One codebase, one dev server
- **Type Safety**: Shared TypeScript types
- **Modern Stack**: Latest Next.js features

## Rollback Plan

If needed, the original Express.js backend is preserved in `/backend` and can be restored by:
1. Starting the Express server: `cd ../backend && npm start`
2. Reverting frontend API URLs to point to Express server
3. Updating CORS settings as needed

---

🎉 **The migration is complete and ready for production!**