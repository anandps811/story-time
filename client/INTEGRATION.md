# Frontend-Backend Integration Guide

This document describes how the frontend (Next.js) is integrated with the backend (Express) for story creation.

## API Integration

### Story API Service

The story API service is located at `lib/api/story.ts` and follows the same pattern as the existing `auth.ts` API service.

**Key Functions:**
- `createStory(payload)` - Creates a new story using AI
- `getStories(userId?)` - Retrieves all stories (optionally filtered by userId)
- `getStoryById(id)` - Retrieves a single story by ID
- `convertStoryToFrontendFormat(backendStory)` - Converts backend response to frontend format

### Data Mapping

The frontend uses different format values than the backend. Mapping utilities in `lib/utils/api-mappers.ts` handle the conversion:

**Theme Mapping:**
- Frontend: `fantasy` → Backend: `FAIRY TALE`
- Frontend: `space` → Backend: `SPACE`
- Frontend: `adventure` → Backend: `ADVENTURE`
- Frontend: `spooky` → Backend: `SPOOKY`

**Duration Mapping:**
- Frontend: `short` → Backend: `QUICK`
- Frontend: `medium` → Backend: `NORMAL`
- Frontend: `long` → Backend: `LONG`

### Story Creation Flow

1. User fills out the form on `/home/create`:
   - Selects a theme (Step 1)
   - Selects story length (Step 2)
   - Enters the lesson/moral (Step 3)

2. On "CREATE MAGIC" click:
   - Form data is validated
   - Frontend values are mapped to backend format
   - API request is sent to `POST /story/create`
   - Loading state is shown

3. On success:
   - Backend response is converted to frontend format
   - Story data is stored in sessionStorage
   - User is redirected to `/home/story`
   - Success toast notification is shown

4. On error:
   - Error toast notification is shown
   - Loading state is cleared
   - User can retry

### Response Format Conversion

The backend returns story content as a single string. The `convertStoryToFrontendFormat` function:
- Splits content by double newlines (paragraphs)
- Falls back to single newlines if needed
- Returns `StoryData` format with `content` as an array of strings

## Environment Variables

### Client (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Note:** Update this if your backend server runs on a different port.

### Server (.env)

```env
PORT=3000
CLIENT_URL=http://localhost:3000
CONNECTION_STRING=mongodb://localhost:27017/story-time
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
```

## Error Handling

- **Network Errors**: Caught and displayed via toast notifications
- **Validation Errors**: Handled by Zod schema validation on backend
- **API Errors**: Error messages from backend are displayed to user
- **Loading States**: Button is disabled and shows "CREATING..." during API call

## Best Practices Followed

1. **Type Safety**: Full TypeScript types for all API requests/responses
2. **Error Handling**: Comprehensive error handling with user-friendly messages
3. **Loading States**: Proper loading indicators during API calls
4. **Code Reusability**: API service follows existing patterns
5. **Data Transformation**: Clean separation between frontend and backend data formats
6. **User Feedback**: Toast notifications for success/error states

## Testing the Integration

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```

3. Navigate to `http://localhost:3000/home/create`
4. Fill out the form and click "CREATE MAGIC"
5. Verify the story is generated and displayed

## API Endpoints

- `POST /story/create` - Create a new story
- `GET /story` - Get all stories
- `GET /story/:id` - Get a story by ID
