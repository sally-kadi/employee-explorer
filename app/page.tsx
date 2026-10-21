
import { Suspense } from "react";
import RecentPosts from "./RecentPosts";
import AllPosts from "./AllPosts";

type Employee = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

async function getEmployee(): Promise<Employee> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to load employee");
  }

  return response.json();
}

async function EmployeeProfile() {
  const employee = await getEmployee();

  return (
    <section className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Employee Profile
      </h2>

      <div className="space-y-3 text-gray-800">
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Company:</strong> {employee.company.name}
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Employee Explorer
        </h1>

        <p className="mb-8 text-gray-600">
          Assignment 3 - Yehia Meets Maya
        </p>

        {/* Employee Profile */}
        <Suspense
          fallback={
            <div
              role="status"
              className="rounded-xl bg-white p-6 text-gray-600 shadow-md"
            >
              Loading employee profile...
            </div>
          }
        >
          <EmployeeProfile />
        </Suspense>

        {/* Recent Posts */}
        <Suspense
          fallback={
            <div
              role="status"
              className="mt-6 rounded-xl bg-white p-6 text-gray-600 shadow-md"
            >
              Loading recent posts...
            </div>
          }
        >
          <RecentPosts />
        </Suspense>

        {/* Client-side Posts */}
        <AllPosts />
      </div>
    </main>
  );
}
