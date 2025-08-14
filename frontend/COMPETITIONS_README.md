# Local Competitions Management

This document explains how to manage case competitions stored locally in JSON format instead of using MongoDB.

## Overview

The website now uses a local JSON file (`data/competitions.json`) to store competition data. This approach provides:
- **No database dependency** - No need for MongoDB connection
- **Fast loading** - Direct file system access
- **Easy management** - JSON format is human-readable and editable
- **Version control friendly** - Changes can be tracked in git

## File Structure

### Competitions Data
Location: `data/competitions.json`

Each competition object contains:

```json
{
  "id": "unique-competition-id",
  "title": "Competition Name",
  "organizer": "Organization Name",
  "logo": "/logos/placeholder.svg",
  "gradeEligibility": "High School Students",
  "deadline": "2025-03-01T23:59:59.000Z",
  "prize": "Prize description",
  "status": "open|closing-soon|closed",
  "description": "Detailed description of the competition",
  "applicationType": "external|internal",
  "applyUrl": "https://application-url.com",
  "frequency": "Annual|Biannual|etc",
  "dates": ["start-date", "end-date"],
  "location": "Virtual|In-person|Virtual and In-person",
  "cost": "Free|$50|etc",
  "registrationOpens": "Optional description of when registration opens"
}
```

### Required Fields
- `id`: Unique identifier (kebab-case recommended)
- `title`: Competition name
- `organizer`: Organization hosting the competition
- `deadline`: ISO 8601 date string
- `status`: One of "open", "closing-soon", or "closed"
- `applicationType`: "external" or "internal"
- `applyUrl`: URL to application page

### Optional Fields
- `registrationOpens`: Description of when registration opens
- `logo`: Path to logo image (defaults to placeholder)
- `prize`: Prize description
- `description`: Detailed description
- `frequency`: How often the competition occurs
- `dates`: Array of start and end dates
- `location`: Competition format
- `cost`: Cost to participate

## Adding New Competitions

### Method 1: Direct JSON Editing
1. Open `data/competitions.json`
2. Add your new competition object to the array
3. Ensure the `id` is unique
4. Save the file

### Method 2: API Endpoint
Send a POST request to `/api/competitions`:

```bash
curl -X POST http://localhost:3000/api/competitions \
  -H "Content-Type: application/json" \
  -d '{
    "id": "new-competition-2025",
    "title": "New Competition",
    "organizer": "Sample Organization",
    "deadline": "2025-06-01T23:59:59.000Z",
    "status": "open",
    "applicationType": "external",
    "applyUrl": "https://example.com/apply"
  }'
```

### Method 3: Using Utility Functions
```typescript
import { addCompetition } from '@/lib/utils/competitions';

const newCompetition = {
  id: 'new-competition-2025',
  title: 'New Competition',
  organizer: 'Sample Organization',
  // ... other fields
};

const success = addCompetition(newCompetition);
```

## Updating Competitions

### Direct JSON Editing
1. Open `data/competitions.json`
2. Find the competition by `id`
3. Modify the desired fields
4. Save the file

### API Endpoint
Send a PUT request to `/api/competitions/[id]`:

```bash
curl -X PUT http://localhost:3000/api/competitions/ihscc-2025 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "closing-soon",
    "deadline": "2025-02-15T23:59:59.000Z"
  }'
```

### Using Utility Functions
```typescript
import { updateCompetition } from '@/lib/utils/competitions';

const success = updateCompetition('ihscc-2025', {
  status: 'closing-soon',
  deadline: '2025-02-15T23:59:59.000Z'
});
```

## Managing Competition Status

### Status Values
- **`open`**: Currently accepting applications
- **`closing-soon`**: Deadline approaching (within 2 weeks)
- **`closed`**: No longer accepting applications

### Updating Status
Regularly review and update competition statuses based on deadlines:

```typescript
import { updateCompetition } from '@/lib/utils/competitions';

// Mark as closing soon
updateCompetition('competition-id', { status: 'closing-soon' });

// Mark as closed
updateCompetition('competition-id', { status: 'closed' });
```

## Logo Management

### Adding Logos
1. Add logo files to `public/logos/`
2. Update the competition's `logo` field to point to the new file
3. Recommended formats: SVG, PNG (48x48px or higher)

### Logo Path Format
```json
{
  "logo": "/logos/organization-name.svg"
}
```

## API Endpoints

### GET `/api/competitions`
Returns all competitions sorted by deadline (earliest first)

### GET `/api/competitions/[id]`
Returns a specific competition by ID

### POST `/api/competitions`
Creates a new competition

### PUT `/api/competitions/[id]`
Updates an existing competition

### DELETE `/api/competitions/[id]`
Deletes a competition

### GET `/api/competitions/stats`
Returns competition statistics

## Utility Functions

The `lib/utils/competitions.ts` file provides helper functions:

```typescript
import {
  getAllCompetitions,
  getCompetitionsSortedByDeadline,
  getCompetitionById,
  getOpenCompetitions,
  getClosingSoonCompetitions,
  searchCompetitions,
  getFreeCompetitions,
  addCompetition,
  updateCompetition,
  removeCompetition,
  getCompetitionsStats
} from '@/lib/utils/competitions';
```

## Best Practices

### ID Naming Convention
- Use kebab-case: `ivey-hscc-2025`
- Include year when applicable
- Keep it descriptive but concise

### Date Format
- Always use ISO 8601 format: `2025-03-01T23:59:59.000Z`
- Include timezone information
- Use UTC for consistency

### Regular Maintenance
1. **Weekly**: Review and update competition statuses
2. **Monthly**: Add new competitions as they're announced
3. **Quarterly**: Remove old/closed competitions
4. **As needed**: Update URLs, dates, and details

### File Backup
- The JSON file is version controlled with git
- Consider creating periodic backups before major changes
- Test changes in development before deploying

## Troubleshooting

### Common Issues

1. **Competition not appearing**: Check that the JSON is valid and the server has been restarted
2. **Logo not loading**: Verify the file exists in `public/logos/` and the path is correct
3. **Date parsing errors**: Ensure dates are in ISO 8601 format
4. **Duplicate IDs**: Each competition must have a unique `id`

### Validation
The system includes basic validation for required fields. Missing required fields will result in API errors.

### Development vs Production
- In development: Changes to JSON file require server restart
- In production: File changes take effect immediately
- Always test changes locally before deploying