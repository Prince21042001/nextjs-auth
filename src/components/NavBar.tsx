"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();
  
  // Check if user has admin role
  const isAdmin = session?.user?.role === "admin";
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-blue-600 font-bold text-xl">MERN App</span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  About
                </Link>
                {session && (
                  <Link href="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                    Dashboard
                  </Link>
                )}
                {/* Admin links */}
                {isAdmin && (
                  <>
                    <Link href="/admin/users" className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors">
                      User Management
                    </Link>
                    <Link href="/admin/audit" className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors">
                      Audit Logs
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {status === "loading" ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 hidden sm:inline-block">
                  {session.user?.email}
                  {isAdmin && (
                    <span className="ml-1 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </span>
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/register" className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  Register
                </Link>
                <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
