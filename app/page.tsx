
import { Suspense } from "react";
import RecentPosts from "./RecentPosts";
import AllPosts from "./AllPosts";
import { ApiError } from "./ApiError";

type Employee = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

type EmployeeResult =
  | { success: true; employee: Employee }
  | { success: false; message: string };

async function getEmployee(): Promise<Employee> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new ApiError(
      "Failed to load employee",
      response.status
    );
  }

  return response.json();
}

async function loadEmployee(): Promise<EmployeeResult> {
  try {
    const employee = await getEmployee();

    return {
      success: true,
      employee,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: `Employee API error (HTTP ${error.status}).`,
      };
    }

    if (error instanceof TypeError) {
      return {
        success: false,
        message: "Network error while loading employee.",
      };
    }

    return {
      success: false,
      message: "Unable to load employee profile.",
    };
  }
}

async function EmployeeProfile() {
  const result = await loadEmployee();

  if (!result.success) {
    return (
      <section
        role="alert"
        className="rounded-xl bg-red-50 p-6 shadow-md"
      >
        <h2 className="mb-2 text-xl font-semibold text-red-800">
          Employee Profile
        </h2>

        <p className="text-red-700">{result.message}</p>
      </section>
    );
  }

  const employee = result.employee;

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

        <AllPosts />
      </div>
    </main>
  );
}
