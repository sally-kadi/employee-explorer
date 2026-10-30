
# Assignment 3 – Maya's Interview

**Developer:** Sally Kadi  
**Project:** Employee Explorer  
**Framework:** Next.js and TypeScript

## 1. Before Coding: My Initial Expectations

### What is server-side fetching?

I expected server-side fetching to retrieve data on the server before sending the rendered content to the browser.

I chose a Server Component for the employee profile because the data does not require user interaction.

### What is client-side fetching?

I expected client-side fetching to retrieve data in the browser after a user interaction.

I used it for the Load posts button because the user decides when to request the full list.

### Why use Suspense?

I expected Suspense to allow part of the page to display a loading fallback while its content was being prepared.

I used Suspense for Recent Posts with a simulated two-second delay.

### How should the application handle errors?

I expected the application to display a clear error message instead of failing silently.

My initial implementation used plain Error objects and a Retry button.

## 2. After Coding: What I Learned

### Server Components

I used an asynchronous Server Component to fetch employee information.

This helped me understand how data can be loaded on the server without requiring client-side state.

### Client Components

I used `"use client"` and React `useState` in `AllPosts.tsx`.

The component handles user interaction, selected scenarios, loading states, errors, and fetched posts.

### Suspense

I used separate Suspense boundaries for Employee Profile and Recent Posts.

This allows each section to show its own loading fallback while waiting for data.

I also learned that Suspense handles waiting, but it does not replace request error handling.

### Error Handling

My first implementation used plain Error objects.

After the code review, I created a custom `ApiError` class that extends `Error` and stores the HTTP status.

I also changed the HTTP 503 simulation to use a `Response` object instead of directly throwing an error.

This allows simulated responses to pass through the same validation logic as real API responses.

### Empty Results

An empty response is not the same as a failed request.

My original implementation simulated a successful `Response` containing an empty array.

After switching to DummyJSON, I updated the simulated response to contain an empty posts collection using the structure `{ posts: [] }`.

The application parses the response and displays "No posts found." when the posts collection is empty.

## 3. Technical Interview Questions

### 1. Why did you use a Server Component for the employee profile?

I used a Server Component because the employee profile does not require interactive browser state.

The server can fetch the employee information and render it as part of the page.

### 2. Why did you use a Client Component for All Posts?

I used a Client Component because users need to click a button, choose a scenario, and interact with the page.

React state allows me to update the interface based on the result.

### 3. Why did you use Suspense?

I used Suspense to show loading feedback while server content is being prepared.

The profile and recent posts have separate boundaries so they can load independently.

### 4. What happens if you move the Server and Client boundary?

If I move more logic into a Client Component, that logic can use browser interaction and React state, but it may require more JavaScript in the browser.

If I move data fetching into a Server Component, I can fetch data on the server, but I cannot directly use client-side event handlers or React state there.

I learned to keep interactive logic in Client Components and non-interactive server fetching in Server Components.

### 5. Why did you create ApiError extends Error?

I created `ApiError` to distinguish HTTP response failures from other errors.

The custom class stores the HTTP status so I can display a more specific error message.

For example, an HTTP 503 response can be handled differently from a network failure.

### 6. Why do we use super(message)?

Because `ApiError` extends the built-in `Error` class.

`super(message)` calls the parent `Error` constructor and initializes the inherited error message.

Without calling `super()` first, I cannot correctly initialize the subclass constructor before using `this`.

### 7. What is the difference between a network error and an HTTP error?

A network error happens when the request cannot be completed, such as when the connection fails.

An HTTP error happens when the server returns a response with an unsuccessful status, such as 404 or 503.

`fetch` does not automatically reject a promise for HTTP 404 or 503 responses.

That is why I check `response.ok` and throw an `ApiError` when the HTTP response is unsuccessful.

### 8. Why did you use Response objects for the test scenarios?

My original implementation directly threw an error for HTTP 503 and directly changed the state for Empty.

After reviewing the feedback, I changed both scenarios to use local `Response` objects.

Now the simulated responses pass through the same response validation and JSON parsing path as the real API.

This makes the simulations more useful for testing the actual application logic.

### 9. What happens when the employee ID changes?

The employee profile currently fetches `/users/1` from JSONPlaceholder.

The posts sections now use DummyJSON to display readable English-language sample content. These posts are not linked to the displayed employee.

Changing the employee ID would update the profile only.

To display posts belonging to the selected employee, I would need to use a consistent API and pass the same employee ID to the related posts request.

I would also handle cases where the employee does not exist, such as an HTTP 404 response.

### 10. What happens if one Server Component fails?

The Employee Profile and Recent Posts have separate loading boundaries and local error handling.

If one request fails, that section can display its own error message while the other section remains available.

This is different from allowing the error to propagate and affect the entire page.

### 11. What happens when Retry is clicked?

Retry calls the same loading function again.

If the selected scenario is still HTTP 503, the application will reproduce the same error.

Changing the scenario to Success allows a new successful request.

Retry does not automatically change the selected scenario.

### 12. What did you learn from the slow response simulation?

I learned that loading feedback is important when a request takes time.

The client slow scenario uses a two-second delay before fetching posts.

During this time, the interface displays a loading message and prevents repeated button clicks.

### 13. How did you use AI during this assignment?

I used AI assistance while developing and reviewing parts of the application.

One suggestion I checked was separating data-fetching error handling from JSX rendering.

After receiving lint errors related to JSX inside `try/catch`, I moved the error handling into a separate function that returns a result object.

I then ran the lint and build commands to verify that the updated code passed those checks.

I did not treat the AI suggestion alone as proof that the application was correct.

## 4. Corrections After Code Review

The reviewer identified several areas that needed improvement.

I made the following corrections:

- Added a custom `ApiError` subclass with HTTP status information.
- Used `Response` objects for HTTP 503 and Empty scenarios.
- Added local error handling for Employee Profile and Recent Posts.
- Replaced fixed post titles and descriptions with the actual API fields.
- Changed the client slow simulation from three seconds to two seconds.
- Separated JSX rendering from `try/catch` blocks after lint feedback.
- Ran lint and production build checks successfully.

### Additional API Update

After implementing the review corrections, I switched the posts API from JSONPlaceholder to DummyJSON to display more readable English-language sample content.

The application still renders the actual `post.title` and `post.body` values returned by the API.

The employee profile and posts now use different demonstration APIs, so the posts are not presented as belonging to the displayed employee.

The initial expectations above were preserved to show how my understanding changed during development.

## 5. What Would I Improve Next?

I would add automated tests for successful requests, HTTP failures, network failures, and empty responses.

I would also make the employee ID configurable and reuse it across the profile and posts requests using a consistent data source.

These improvements would make the application easier to maintain and test.

## 6. Final Reflection

This assignment helped me understand the difference between server-side and client-side fetching.

I learned how Suspense supports loading states and why request failures need separate error handling.

The code review helped me improve my implementation by testing simulated responses through the same logic as real API responses.

I also learned the importance of checking my code with lint, build, and manual tests instead of assuming that a working UI means everything is correct.
