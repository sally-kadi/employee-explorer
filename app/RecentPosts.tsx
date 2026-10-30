
import { ApiError } from "./ApiError";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type PostsResult =
  | { success: true; posts: Post[] }
  | { success: false; message: string };

async function getRecentPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    "https://dummyjson.com/posts?limit=10",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new ApiError(
      "Failed to load recent posts",
      response.status
    );
  }

  const data: { posts: Post[] } = await response.json();

  if (!Array.isArray(data.posts)) {
    throw new Error("Invalid posts response format");
  }

  return data.posts;
}

async function loadRecentPosts(): Promise<PostsResult> {
  try {
    const posts = await getRecentPosts();
    return { success: true, posts };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: `Recent posts API error (HTTP ${error.status}).`,
      };
    }

    if (error instanceof TypeError) {
      return {
        success: false,
        message: "Network error while loading recent posts.",
      };
    }

    return {
      success: false,
      message: "Unable to load recent posts.",
    };
  }
}

export default async function RecentPosts() {
  const result = await loadRecentPosts();

  if (!result.success) {
    return (
      <section
        role="alert"
        className="mt-6 rounded-xl bg-red-50 p-6 shadow-md"
      >
        <h2 className="mb-2 text-xl font-semibold text-red-800">
          Recent Posts
        </h2>
        <p className="text-red-700">{result.message}</p>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Recent Posts
      </h2>

      <p className="mb-4 text-sm text-gray-500">
        Recent posts retrieved from DummyJSON API.
      </p>

      {result.posts.length === 0 ? (
        <p className="text-gray-600">No recent posts found.</p>
      ) : (
        <ul className="space-y-3">
          {result.posts.slice(0, 3).map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-gray-200 p-3"
            >
              <h3 className="mb-2 font-semibold text-gray-900">
                {post.title}
              </h3>
              <p className="text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
