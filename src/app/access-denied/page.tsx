"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AccessDeniedPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. This area requires admin privileges.
        </p>
        {session ? (
          <div className="text-sm text-gray-500 mb-4">
            You are signed in as <span className="font-medium">{session.user?.email}</span> with role{" "}
            <span className="font-medium capitalize">{session.user?.role || "user"}</span>
          </div>
        ) : (
          <div className="text-sm text-gray-500 mb-4">You are not currently signed in.</div>
        )}
        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
          >
            Go to Home
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 