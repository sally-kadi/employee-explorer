
# Assignment 3 – Testing Report

**Developer:** Sally Kadi  
**Project:** Employee Explorer  
**Framework:** Next.js with TypeScript  
**Testing Date:** October 21, 2026

## Testing Environment

- Browser: Google Chrome
- Development server: http://localhost:3000
- Testing method: Manual testing

## Manual Test Results

| Test | Expected Result | Actual Result | Status |
|------|-----------------|---------------|--------|
| Employee Profile | Display employee name, email, and company | Employee information displayed correctly | PASS |
| Recent Posts | Display the first 3 post titles | Three post titles displayed | PASS |
| Load posts - Success | Load all employee posts | Successfully loaded 10 posts | PASS |
| Slow Response | Show loading state, then posts | Loading message appeared, followed by 10 posts | PASS |
| HTTP 503 Error | Show error message and Retry button | Error message and Retry button appeared | PASS |
| Empty Response | Show No posts found | No posts found appeared | PASS |
| Retry after error | Allow another request | Retry showed the error again; switching to Success and loading posts returned 10 posts | PASS |
| Suspense loading fallback | Show fallback while recent posts load | Loading recent posts appeared while Employee Profile remained visible, then three post titles appeared | PASS |

## Test Details

### 1. Employee Profile

The application fetched and displayed:

- Name: Leanne Graham
- Email: Sincere@april.biz
- Company: Romaguera-Crona

**Result: PASS**

### 2. Recent Posts

The application displayed the first three post titles
from the JSONPlaceholder API.

**Result: PASS**

### 3. Successful Client Fetch

Selected scenario: Success

Clicked: Load posts

Observed: Successfully loaded 10 posts!

**Result: PASS**

### 4. Slow Response

Selected scenario: Slow response

Observed a loading message followed by the post results.

**Result: PASS**

### 5. HTTP 503 Error

Selected scenario: HTTP 503 Error

Observed:

- HTTP 503: Service unavailable
- Retry button

The HTTP 503 error is simulated in the client component,
not returned by the API.

**Result: PASS**

### 6. Empty Response

Selected scenario: Empty response

Observed: No posts found.

The empty response is simulated in the client component.

**Result: PASS**

### 7. Retry After Error

Selected HTTP 503 Error and clicked Load posts.

Clicked Retry and observed the error message again.

Changed the scenario to Success and clicked Load posts.

Observed: Successfully loaded 10 posts!

**Result: PASS**

### 8. Suspense Loading

Refreshed the application.

Observed:

- Loading recent posts... appeared.
- Employee Profile remained visible.
- Three recent post titles appeared afterward.

**Result: PASS**

## Known Limitations

- HTTP 503 and empty responses are simulated client-side.
- The application uses JSONPlaceholder test data.
- No automated tests have been added yet.
- Changing the scenario resets the current results.
- Retry repeats the currently selected scenario.

## Conclusion

All eight documented manual tests passed.

The application demonstrates:

- Server-side data fetching
- Client-side data fetching
- React Suspense
- Loading states
- Error handling
- Empty results
- Retry functionality

The application is ready for the final build and
repository checks before submission.
