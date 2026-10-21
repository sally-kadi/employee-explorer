
# Employee Explorer
## Assignment 3 – Yehia Meets Maya

**Developer:** Sally Kadi  
**Technology:** Next.js, TypeScript, React, Tailwind CSS

## Project Overview

Employee Explorer is a small Next.js application created for
Assignment 3: Yehia Meets Maya.

The project demonstrates server-side data fetching, client-side
data fetching, React Suspense, loading states, and error handling.

## Features

### 1. Employee Profile
- Fetches employee information using a Server Component.
- Displays the employee's name, email, and company.
- Uses the JSONPlaceholder API.

### 2. Recent Posts
- Fetches the employee's posts on the server.
- Displays the first three post titles.
- Uses React Suspense with a loading fallback.
- Includes a simulated two-second delay.

### 3. Explore All Posts
- Uses a Client Component.
- Loads posts when the user clicks "Load posts".
- Displays post titles and bodies.
- Supports loading, success, empty, and error states.
- Includes a Retry button.

## Test Scenarios

The application provides four scenarios:

1. Success – Fetches employee posts successfully.
2. Slow response – Simulates a three-second delay.
3. HTTP 503 Error – Simulates a service-unavailable error.
4. Empty response – Simulates an empty result.

The HTTP 503 and empty-response scenarios are simulated in the
client component rather than returned by the API.

## Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- JSONPlaceholder REST API

## API Endpoints

Employee profile:
https://jsonplaceholder.typicode.com/users/1

Employee posts:
https://jsonplaceholder.typicode.com/posts?userId=1

## How to Run the Project

1. Clone the repository.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open http://localhost:3000 in your browser.

## Project Structure

```text
app/
  page.tsx
  RecentPosts.tsx
  AllPosts.tsx
  layout.tsx
  globals.css

docs/
  INTERVIEW.md
  TESTING.md

README.md
```

## Documentation

- docs/INTERVIEW.md – Technical explanations and interview reflections.
- docs/TESTING.md – Manual testing results.

## Author

Sally Kadi

GitHub: https://github.com/sally-kadi
