# Assignment 3 – Testing Report

**Developer:** Sally Kadi  
**Project:** Employee Explorer  
**Framework:** Next.js with TypeScript  
**Original Testing Date:** October 21, 2026  
**Review Update:** October 30, 2026

## 1. Testing Environment

- **Browser:** Google Chrome
- **Development server:** http://localhost:3000
- **Testing method:** Manual browser testing
- **Employee API:** JSONPlaceholder
- **Posts API:** DummyJSON (updated after initial testing)

The employee profile and posts use separate demonstration APIs. The DummyJSON posts are sample content and should not be interpreted as posts authored by the displayed employee.

## 2. Manual Test Results

| Test | Expected Result | Observed Result | Status |
|---|---|---|---|
| Employee Profile | Display employee information | Name, email and company displayed | PASS |
| Recent Posts | Display first three API posts | Three API posts displayed | PASS |
| Success | Load 10 posts | Ten posts displayed during initial testing | PASS – ORIGINAL TEST |
| Slow Response | Display loading, then posts | Loading message followed by posts | PASS – ORIGINAL TEST |
| HTTP 503 | Display HTTP error and Retry | HTTP 503 message and Retry button appeared | PASS |
| Empty Response | Display empty message | No posts found appeared | PASS |
| Retry after Error | Repeat selected scenario | Not reconfirmed after latest changes | PENDING |
| Suspense Fallback | Show independent loading state | Observed during initial testing | PASS – ORIGINAL TEST |
| Profile Request Failure | Display local error without breaking posts | Profile HTTP 503 message appeared while Recent Posts remained visible | PASS |
| Recent Posts Request Failure | Display local error without breaking profile | Recent Posts HTTP 503 test completed | PASS |

The original client test results were recorded before changing the posts API. The updated DummyJSON implementation should be retested before final submission.

## 3. Updated Error Handling

The application uses a custom `ApiError` class extending JavaScript's `Error` class.

The class stores the HTTP status and uses `super(message)` to initialize the inherited error message.

After receiving a response, the application checks `response.ok` before parsing JSON.

The catch handling distinguishes:

- HTTP errors using `ApiError`.
- Network-related failures using `TypeError`.
- Other unexpected errors.

## 4. Client Response Simulation

### Success

The original implementation fetched posts from JSONPlaceholder.

The updated implementation fetches English-language sample posts from DummyJSON and renders the actual `post.title` and `post.body` fields.

**Original observed result:** Successfully loaded 10 posts.

**Updated DummyJSON result:** Pending final browser reconfirmation.

### Slow Response

The client includes a two-second simulated delay before requesting posts.

**Original observed result:** A loading message appeared, followed by posts.

**Result:** PASS for the original loading and completion test.

The configured delay was verified in code but not independently timed.

### HTTP 503 Error

The application creates a local `Response` object with HTTP status 503.

This response passes through the same `response.ok` validation as an actual API response.

The application throws `ApiError` when the response is unsuccessful.

**Observed:** HTTP 503 message and Retry button appeared.

**Result:** PASS.

### Empty Response

The application creates a successful local `Response` containing an empty posts collection.

The updated DummyJSON implementation uses the response structure `{ posts: [] }`.

The response passes through the same JSON parsing and validation path as a successful API response.

**Observed before the latest API change:** No posts found.

**Result:** PASS for the original test; updated implementation pending reconfirmation.

### Retry

Retry repeats the currently selected scenario.

During original testing, retrying the HTTP 503 scenario reproduced the failure. Selecting Success and loading again returned posts.

**Current review status:** PENDING reconfirmation after the latest changes.

## 5. Independent Server Sections

The Employee Profile and Recent Posts use separate Suspense boundaries.

Expected request failures are caught locally and converted into section-specific messages.

### Employee Profile Failure

A temporary HTTP 503 response was used to test the profile section.

**Observed:** The Employee Profile displayed an HTTP 503 error while Recent Posts continued displaying content.

**Result:** PASS.

### Recent Posts Failure

A temporary HTTP 503 response was used to test Recent Posts.

**Result:** PASS – temporary failure test completed.

Both files were subsequently restored to their normal API-fetching implementations.

These tests demonstrate that an expected request failure in one server section does not automatically prevent the other section from rendering.

## 6. Code Quality Checks

| Command | Result |
|---|---|
| `npm run lint` | PASS – no reported errors |
| `npm run build` | PASS – production build completed |
| TypeScript compilation | PASS |

These results were observed in the local terminal on October 30, 2026, after the code updates.

## 7. Screenshot Evidence

Screenshots should be stored in `docs/evidence/`.

Recommended evidence files:

- `success.png` – Employee Profile and Recent Posts
- `client-success.png` – Successful client fetch
- `client-loading.png` – Loading state
- `client-503.png` – HTTP 503 error and Retry button
- `client-empty.png` – Empty response
- `profile-error.png` – Independent Employee Profile failure
- `recent-posts-error.png` – Independent Recent Posts failure
- `lint-pass.jpeg` – Successful lint command
- `build-pass.jpeg` – Successful production build

These are intended filenames, not confirmation that the files have been saved. Only add Markdown image links after the corresponding screenshot files exist.

## 8. Corrections After Review

The initial implementation used plain `Error` objects and directly simulated failure and empty states.

Following the review, the implementation was corrected to:

- Use `ApiError extends Error`.
- Preserve HTTP status information.
- Process simulated responses through the normal response-handling path.
- Render actual API post titles and bodies.
- Handle server-section errors locally.
- Change the client slow simulation from three seconds to two seconds.
- Separate data-loading error handling from JSX rendering to satisfy lint requirements.

The posts API was also changed to DummyJSON to display more readable English-language sample content. This is an additional change made after the original tests.

The original predictions and observations should remain documented rather than being rewritten as though the corrected implementation existed from the beginning.

## 9. Known Limitations

- JSONPlaceholder and DummyJSON provide demonstration data from different sources.
- HTTP 503 and Empty scenarios are simulated locally.
- Retry repeats the selected scenario, including the selected error.
- No automated test suite has been added.
- Some final client scenarios need reconfirmation after changing the posts API.
- Screenshot evidence must be attached before final submission.

## 10. Conclusion

The assignment now includes custom HTTP error handling, shared response-processing logic for simulated failures, independent server-section error handling, and rendering of actual API post fields.

Independent Profile and Recent Posts failure simulations were completed.

Lint and production build checks passed.

Remaining work includes reconfirming the updated client scenarios, attaching screenshot evidence, reviewing the interview documentation, and pushing the completed assignment to the required GitHub branch.