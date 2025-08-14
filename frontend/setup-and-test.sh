#!/bin/bash

# Express.js to Next.js Migration - Setup and Test Script
# This script helps set up and test the migrated Next.js application

set -e  # Exit on any error

echo "🚀 Express.js to Next.js Migration - Setup and Test"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    log_error "Please run this script from the frontend directory (website/frontend/)"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    log_error "npm is not installed. Please install npm and try again."
    exit 1
fi

echo "📋 Step 1: Environment Setup"
echo "----------------------------"

# Check for .env.local file
if [ ! -f ".env.local" ]; then
    log_warning ".env.local file not found. Creating a default one..."
    cat > .env.local << EOF
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/pitchdeck

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development

# Optional: Disable under construction mode
NEXT_PUBLIC_UNDER_CONSTRUCTION=false
EOF
    log_success "Created .env.local with default values"
    log_warning "Please update MONGO_URI and JWT_SECRET in .env.local for your environment"
else
    log_success ".env.local already exists"
fi

echo ""
echo "📦 Step 2: Dependencies Check"
echo "-----------------------------"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    log_info "Installing dependencies..."
    npm install
    log_success "Dependencies installed"
else
    log_success "Dependencies already installed"
fi

echo ""
echo "🔧 Step 3: Build Test"
echo "--------------------"

log_info "Testing build process..."
if npm run build > /dev/null 2>&1; then
    log_success "Build successful"
else
    log_error "Build failed. Please check for errors and try again."
    exit 1
fi

echo ""
echo "🏥 Step 4: MongoDB Connection Check"
echo "-----------------------------------"

# Check if MongoDB is running (optional)
if command -v mongosh &> /dev/null; then
    log_info "Checking MongoDB connection..."
    MONGO_URI_FROM_ENV=$(grep MONGO_URI .env.local | cut -d '=' -f2)
    if mongosh "$MONGO_URI_FROM_ENV" --eval "db.runCommand('ping')" > /dev/null 2>&1; then
        log_success "MongoDB is accessible"
    else
        log_warning "MongoDB connection failed. The app will still work but with limited functionality."
        log_info "Make sure MongoDB is running and the MONGO_URI in .env.local is correct"
    fi
elif command -v mongo &> /dev/null; then
    log_info "Checking MongoDB connection..."
    MONGO_URI_FROM_ENV=$(grep MONGO_URI .env.local | cut -d '=' -f2)
    if mongo "$MONGO_URI_FROM_ENV" --eval "db.runCommand('ping')" > /dev/null 2>&1; then
        log_success "MongoDB is accessible"
    else
        log_warning "MongoDB connection failed. The app will still work but with limited functionality."
        log_info "Make sure MongoDB is running and the MONGO_URI in .env.local is correct"
    fi
else
    log_warning "MongoDB client not found. Cannot test database connection."
    log_info "Install mongosh or mongo CLI to test database connectivity"
fi

echo ""
echo "🎯 Step 5: API Endpoints Summary"
echo "--------------------------------"

echo "The following Express.js endpoints have been migrated to Next.js:"
echo ""
echo "Authentication Routes:"
echo "  • POST /api/auth/signup    - User registration"
echo "  • POST /api/auth/login     - User login"
echo "  • POST /api/auth/logout    - User logout"
echo "  • GET  /api/auth/me        - Get current user"
echo "  • GET  /api/auth/favourites - Get user favourites"
echo "  • POST /api/auth/favourites - Update favourites"
echo ""
echo "Competition Routes:"
echo "  • GET  /api/competitions   - Get all competitions"
echo "  • POST /api/competitions   - Create competition"
echo ""
echo "Redirect Routes:"
echo "  • GET  /api/redirect/competitions - Redirect to competitions"
echo "  • GET  /api/redirect/applications - Redirect to applications"

echo ""
echo "🚀 Step 6: Starting Development Server"
echo "-------------------------------------"

log_info "Starting Next.js development server..."
log_info "The server will start on http://localhost:3000"
log_info ""
log_info "You can test the APIs using:"
log_info "  • node health-check.js (basic health check)"
log_info "  • node test-api.js (comprehensive API test)"
log_info ""
log_info "Press Ctrl+C to stop the server"
log_info ""

# Start the development server
exec npm run dev
