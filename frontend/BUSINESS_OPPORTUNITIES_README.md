# Business Opportunities Feature

This document describes the Business Opportunities feature that provides a dedicated platform for students to discover and apply to various business programs, internships, fellowships, and other career development opportunities. The feature is designed with a consistent green theme that matches the brand identity of The Pitch Deck platform.

## Overview

The Business Opportunities page serves as a comprehensive directory of business-related programs and opportunities for high school students and young entrepreneurs. It follows the same architectural pattern as the competitions feature but focuses on educational programs, internships, summer academies, and professional development opportunities.

## Features

### 1. Opportunity Discovery
- Browse through a curated list of business opportunities
- View detailed information for each program including:
  - Program title and organizing institution
  - Start and end dates
  - Cost information (Free, Paid, or Variable)
  - Format (In-person, Virtual, or Hybrid)
  - Eligibility requirements
  - Program description
  - Application links

### 2. Advanced Filtering
- **Search**: Text search across titles, organizers, descriptions, and categories
- **Category Filter**: Filter by program type (Business Academy, Leadership Program, Entrepreneurship Program, etc.)
- **Format Filter**: Filter by delivery method (In-person, Virtual, Hybrid)
- **Cost Filter**: Filter by cost structure (Free, Paid, Not Specified)
- **Status Filter**: Filter by availability (Open, Upcoming, Closed)

### 3. Favorites System
- Save opportunities to favorites for quick access
- Persistent storage using localStorage
- Visual indicators for favorited items

### 4. Responsive Design
- Mobile-optimized interface
- Card-based layout for easy browsing
- Dark/light theme support
- Consistent green theme matching the competition pages

### 5. Visual Design
- **Brand Colors**: Uses The Pitch Deck's signature green palette (#19613F primary, #2CA15F secondary)
- **Green Accents**: Applied to buttons, badges, borders, and highlights for consistency
- **Card Footers**: Green gradient footers similar to competition cards
- **Status Indicators**: Color-coded badges with green for "open" opportunities
- **Interactive Elements**: Green hover states and focus indicators

## Technical Implementation

### File Structure
```
website/frontend/
├── app/business-opportunities/
│   └── page.tsx                           # Main page component
├── components/business-opportunities/
│   ├── opportunity-card.tsx               # Individual opportunity display
│   ├── opportunity-filters.tsx            # Search and filter controls
│   └── opportunity-grid.tsx               # Grid layout and data fetching
├── data/
│   └── business-opportunities.json        # Opportunity data source
└── public/data/
    └── business-opportunities.json        # Public data endpoint
```

### Data Schema

Each business opportunity follows this structure:

```typescript
interface BusinessOpportunity {
  id: string;                    // Unique identifier
  title: string;                 // Program name
  organizer: string;             // Institution/organization
  logo: string;                  // Logo URL
  gradeEligibility: string;      // Target audience
  startDate: string;             // Program start date
  endDate: string;               // Program end date
  cost: string;                  // Cost information
  format: string;                // Delivery format
  status: string;                // Current status
  description: string;           // Program description
  applicationType: string;       // Application type
  applyUrl: string;             // Application link
  category: string;             // Program category
}
```

### Categories

The system supports the following program categories:
- **Business Academy**: Intensive business education programs
- **Leadership Program**: Leadership development opportunities
- **Entrepreneurship Program**: Startup and entrepreneurship focused
- **Internship**: Professional work experience
- **Fellowship**: Mentorship and development programs
- **Scholarship Program**: Academic scholarship opportunities
- **Career Development**: Career-focused skill building
- **Conference**: Business conferences and events

## Navigation Integration

The Business Opportunities page is integrated into the main navigation menu between "Competitions" and "About" sections, accessible at `/business-opportunities`.

## Data Management

### Adding New Opportunities

1. Update `website/frontend/data/business-opportunities.json`
2. If adding a new logo, download it and save it to `website/frontend/public/logos/business-opportunities/`
3. Update the logo path in the JSON to use the local path (e.g., `/logos/business-opportunities/organization-name.png`)
4. Copy the updated file to `website/frontend/public/data/business-opportunities.json`
5. Ensure all required fields are properly formatted
6. Test the application to verify the new opportunity appears correctly

### Logo Management

All organization logos are stored locally to avoid external dependency issues and improve performance:

**Logo Directory**: `website/frontend/public/logos/business-opportunities/`

**Current Logos**:
- `schulich.png` - Schulich School of Business
- `ivey.png` - Ivey Business School  
- `mina-project.gif` - The MINA Project
- `icon-talent.jpg` - ICON Talent (used for both Scholars and Fellowship programs)
- `ja-canada.png` - Junior Achievement Canada (used for both JA programs)
- `target-alpha.jpg` - Target Alpha
- `fblc.png` - Future Business Leaders of Canada
- `sunlife.svg` - Sun Life Financial
- `brampton.png` - City of Brampton
- `ubc.png` - UBC Sauder School of Business

**Adding New Logos**:
1. Download the logo image from the organization's official website
2. Save it with a descriptive filename in the logos directory
3. Update the JSON data to reference the local path: `/logos/business-opportunities/filename.ext`
4. Supported formats: PNG, JPG, GIF, SVG

**Logo Guidelines**:
- Use official logos when possible
- Prefer PNG or SVG formats for better quality
- Keep file sizes reasonable (under 500KB)
- Use descriptive filenames (organization-name.png)

### Status Management

Opportunities can have the following statuses:
- **open**: Currently accepting applications
- **upcoming**: Will open for applications in the future
- **closed**: No longer accepting applications

The system automatically sorts opportunities with "open" status first for better visibility.

## Visual Theme Integration

The Business Opportunities page maintains visual consistency with the rest of The Pitch Deck platform through:

### Color Scheme
- **Primary Green**: `#19613F` - Used for main text, borders, and primary actions
- **Secondary Green**: `#2CA15F` - Used for accents, highlights, and secondary elements
- **Green Gradients**: Applied to buttons and card footers for visual appeal

### Design Elements
- Card borders use green theme colors with opacity
- Search bar and filters styled with green focus states
- Badge colors incorporate green variants for categories
- Loading states and icons use green theming
- Filter pills and active states maintain green consistency

### Consistency Features
- Matches competition page styling patterns
- Uses same gradient button styles
- Maintains consistent hover and focus states
- Preserves brand identity across all pages

## Current Opportunities

The initial dataset includes 12 business opportunities from various institutions:

1. **Schulich Business Excellence Academy (SBEA)** - Free business academy program
2. **Ivey Summer Leadership Program** - $350 leadership development program
3. **The MINA Project** - Entrepreneurship-focused program
4. **ICON Talent Scholars** - High-potential student development
5. **JA Company Program** - Free entrepreneurship education
6. **JA Career Accelerator** - Career development programs
7. **Target Alpha STC Regional Executive** - Leadership training
8. **FBLC NAC/NTC** - Business leadership conferences
9. **ICON Fellowship** - Intensive fellowship program
10. **Sun Life DBTS** - Paid technology internship
11. **Summer Company Program** - Young entrepreneur support
12. **UBC Sauder Mini Business School** - Comprehensive business education

## Future Enhancements

Potential improvements for the business opportunities feature:
- Application deadline tracking and notifications
- Integration with user profiles for personalized recommendations
- Application status tracking
- Rating and review system
- Calendar integration for important dates
- Email notifications for new opportunities matching user preferences
- Logo optimization and lazy loading
- Multi-language support for international programs
- Enhanced green theme animations and micro-interactions
- Custom green-themed loading skeletons

## Maintenance

Regular maintenance tasks:
- Update opportunity statuses as programs open/close
- Add new opportunities as they become available
- Verify application links are still active
- Update cost and date information as needed
- Remove outdated or discontinued programs
- Check logo image accessibility and update if organizations change their branding
- Optimize logo file sizes periodically
- Backup logo files before making updates

The business opportunities feature provides students with a centralized platform to discover and pursue professional development opportunities, complementing the existing competitions platform to create a comprehensive resource for business-minded students.