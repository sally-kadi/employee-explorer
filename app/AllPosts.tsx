
"use client";

import { useState } from "react";
import { ApiError } from "./ApiError";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

type Scenario = "success" | "slow" | "error" | "empty";
type Status = "idle" | "loading" | "success" | "empty" | "error";

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
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      let response: Response;

      if (scenario === "error") {
        response = new Response(
          JSON.stringify({ message: "Service unavailable" }),
          {
            status: 503,
            statusText: "Service Unavailable",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else if (scenario === "empty") {
        response = new Response(
          JSON.stringify({
            posts: [],
            total: 0,
            skip: 0,
            limit: 10,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await fetch(
          "https://dummyjson.com/posts?limit=10",
          { cache: "no-store" }
        );
      }

      if (!response.ok) {
        throw new ApiError(
          "Failed to load posts",
          response.status
        );
      }

      const data: PostsResponse = await response.json();

      if (!data || !Array.isArray(data.posts)) {
        throw new Error("Invalid API response format");
      }

      if (data.posts.length === 0) {
        setStatus("empty");
      } else {
        setPosts(data.posts);
        setStatus("success");
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(
          `HTTP ${error.status}: ${error.message}`
        );
      } else if (error instanceof TypeError) {
        setErrorMessage(
          "Network error. Please check your connection and try again."
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }

      setStatus("error");
    }
  }

  return (
    <section className="mt-6 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Explore All Posts
      </h2>

      <p className="mb-4 text-gray-600">
        Explore sample posts in English and test different
        API response scenarios.
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
        <div
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-4"
        >
          <p className="mb-3 text-red-700">
            {errorMessage}
          </p>

          <button
            onClick={loadPosts}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      )}

      {status === "empty" && (
        <p className="mt-4 text-gray-600">
          No posts found.
        </p>
      )}

      {status === "success" && (
        <div className="mt-6 space-y-4">
          <p className="font-medium text-green-700">
            Successfully loaded {posts.length} posts!
          </p>

          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-gray-200 p-4"
            >
              <h3 className="mb-2 font-semibold text-gray-900">
                {post.title}
              </h3>

              <p className="text-gray-600">
                {post.body}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
