
# Assignment 3 – Maya's Interview

Developer: Sally Kadi

## Before Coding: My Expectations

### 1. What is server-side fetching?

I expected server-side fetching to retrieve data on the server
before sending the rendered content to the browser.

I chose a Server Component for the employee profile because
the data does not require user interaction.

### 2. What is client-side fetching?

I expected client-side fetching to retrieve data in the browser
after a user interaction.

I used it for the Load posts button because the user decides
when to request the full list.

### 3. Why use Suspense?

I expected Suspense to allow a part of the page to display
a loading fallback while its content is being prepared.

I used Suspense for Recent Posts with a simulated
two-second delay.

### 4. How should the application handle errors?

I expected the application to display a clear error message
instead of failing silently.

The client component includes an error message and Retry button.

## After Coding: What I Learned

### 1. Server Components

The employee profile is fetched in app/page.tsx using
an asynchronous function and fetch().

This allows the server to retrieve the employee information.

### 2. Client Components

app/AllPosts.tsx uses "use client" and React useState.

It handles button clicks, the selected test scenario,
loading status, error messages, and fetched posts.

### 3. Suspense and Loading

app/RecentPosts.tsx is an asynchronous Server Component.

React Suspense provides a loading fallback while the
RecentPosts component waits for its data.

### 4. Error Handling

The application checks response.ok for API requests.

The HTTP 503 test scenario is simulated by throwing an
error in the client component.

The error is caught and displayed to the user.

### 5. Empty Results

An empty response is different from an error.

The application displays "No posts found." when the
selected scenario simulates an empty result.

## Technical Decisions

### Why did I use a Server Component for the profile?

Because the profile does not need interactive browser state.

### Why did I use a Client Component for all posts?

Because loading posts depends on a button click and
requires React state.

### Why did I use Suspense?

To give the user feedback while recent posts are loading
without blocking independent page content.

### What happens when a request fails?

The application displays an error message.
The user can retry the request.

### What would I improve?

I would improve the design, add automated tests,
and implement more realistic API error simulations.

## Reflection

This assignment helped me understand the difference between
server-side and client-side data fetching.

I also practised loading states, Suspense, error handling,
and displaying empty results.

I learned that building an application is not only about
displaying data, but also about handling different situations
and providing a better user experience.
