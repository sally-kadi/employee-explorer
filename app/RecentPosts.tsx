
type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const englishTitles: Record<number, string> = {
  1: "Getting Started with Our Team",
  2: "A Day in the Life of an Employee",
  3: "Working Together on New Projects",
};

export default async function RecentPosts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=1",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to load recent posts");
  }

  const posts: Post[] = await response.json();

  return (
    <section className="mt-6 rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Recent Posts
      </h2>

      <p className="mb-4 text-sm text-gray-500">
        Sample posts retrieved from the API.
      </p>

      <ul className="space-y-3">
        {posts.slice(0, 3).map((post) => (
          <li
            key={post.id}
            className="rounded-lg border border-gray-200 p-3 text-gray-800"
          >
            {englishTitles[post.id] ?? post.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
