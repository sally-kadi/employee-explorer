
"use client";

import { useState } from "react";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type Scenario = "success" | "slow" | "error" | "empty";
type Status = "idle" | "loading" | "success" | "empty" | "error";

// Friendly English text for displaying sample API posts
const sampleTitles = [
  "Getting Started with Our Team",
  "A Day in the Life of an Employee",
  "Working Together on New Projects",
  "Building a Positive Workplace",
  "Improving Communication at Work",
  "Learning New Skills Every Day",
  "Planning Our Next Team Project",
  "Sharing Ideas and Solving Problems",
  "Celebrating Team Achievements",
  "Looking Ahead to Future Opportunities",
];

const sampleDescriptions = [
  "Meet our team and learn how we collaborate to achieve our goals.",
  "Discover the daily responsibilities and experiences of our employees.",
  "Explore how teamwork helps us complete successful projects.",
  "Learn why a supportive and welcoming workplace matters.",
  "Find out how clear communication improves teamwork.",
  "Discover opportunities for learning and professional growth.",
  "See how we organize tasks and prepare for upcoming projects.",
  "Learn how creative thinking helps us solve everyday challenges.",
  "Celebrate important milestones and successful team projects.",
  "Explore our plans for continuous improvement and future success.",
];

export default function AllPosts() {
  const [scenario, setScenario] = useState<Scenario>("success");
  const [status, setStatus] = useState<Status>("idle");
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPosts() {
    setStatus("loading");
    setPosts([]);
    setErrorMessage("");

    try {
      if (scenario === "slow") {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      if (scenario === "error") {
        throw new Error("HTTP 503: Service unavailable");
      }

      if (scenario === "empty") {
        setStatus("empty");
        return;
      }

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=1",
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load posts`);
      }

      const data: Post[] = await response.json();

      if (data.length === 0) {
        setStatus("empty");
      } else {
        setPosts(data);
        setStatus("success");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
      setStatus("error");
    }
  }

  return (
    <section className="mt-6 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Explore All Posts
      </h2>

      <p className="mb-4 text-gray-600">
        Explore sample employee posts and test different API response scenarios.
      </p>

      <label
        htmlFor="scenario"
        className="mb-2 block font-medium text-gray-800"
      >
        Choose a test scenario
      </label>

      <select
        id="scenario"
        value={scenario}
        onChange={(event) => {
          setScenario(event.target.value as Scenario);
          setStatus("idle");
          setPosts([]);
          setErrorMessage("");
        }}
        disabled={status === "loading"}
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
      >
        <option value="success">Success</option>
        <option value="slow">Slow response</option>
        <option value="error">HTTP 503 Error</option>
        <option value="empty">Empty response</option>
      </select>

      <button
        onClick={loadPosts}
        disabled={status === "loading"}
        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Loading..." : "Load posts"}
      </button>

      {status === "loading" && (
        <p role="status" className="mt-4 text-blue-700">
          Loading posts, please wait...
        </p>
      )}

      {status === "error" && (
        <div role="alert" className="mt-4 rounded-lg bg-red-50 p-4">
          <p className="mb-3 text-red-700">{errorMessage}</p>
          <button
            onClick={loadPosts}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      )}

      {status === "empty" && (
        <p className="mt-4 text-gray-600">No posts found.</p>
      )}

      {status === "success" && (
        <div className="mt-6 space-y-4">
          <p className="font-medium text-green-700">
            Successfully loaded {posts.length} posts!
          </p>

          <p className="text-sm text-gray-500">
            Displaying friendly English descriptions for sample API data.
          </p>

          {posts.map((post, index) => (
            <article
              key={post.id}
              className="rounded-lg border border-gray-200 p-4"
            >
              <h3 className="mb-2 font-semibold text-gray-900">
                {sampleTitles[index] ?? post.title}
              </h3>
              <p className="text-gray-600">
                {sampleDescriptions[index] ?? post.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
