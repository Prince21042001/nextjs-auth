"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Only show client-side elements after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Check if user has admin role
  const isAdmin = session?.user?.role === "admin";
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-10 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-blue-600 font-bold text-xl tracking-tight">MERN App</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex space-x-1">
                <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all">
                  Home
                </Link>
                <Link href="/about" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all">
                  About
                </Link>
                {session && (
                  <Link href="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all">
                    Dashboard
                  </Link>
                )}
                {/* Admin links */}
                {isAdmin && (
                  <>
                    <Link href="/admin/users" className="px-3 py-2 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all">
                      User Management
                    </Link>
                    <Link href="/admin/audit" className="px-3 py-2 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all">
                      Audit Logs
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile menu button - only render on client to prevent hydration mismatch */}
          {mounted && (
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
          
          {/* Show loading state during server rendering or when status is loading */}
          {(!mounted || status === "loading") ? (
            <div className="animate-pulse bg-blue-100 h-8 w-20 rounded-lg"></div>
          ) : (
            <div className="hidden md:flex items-center">
              {session ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {session.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt="Profile" 
                        className="h-8 w-8 rounded-full border-2 border-blue-200"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-700 font-medium text-sm">
                          {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                    <span className="text-sm text-gray-700 hidden sm:inline-block font-medium">
                      {session.user?.name || session.user?.email}
                      {isAdmin && (
                        <span className="ml-1 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Admin
                        </span>
                      )}
                    </span>
                  </div>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all shadow-sm"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Link href="/register" className="inline-flex items-center px-4 py-2 border border-blue-200 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all shadow-sm">
                    Register
                  </Link>
                  <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all shadow-sm">
                    Login
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
        
        {/* Mobile menu - only render on client to prevent hydration mismatch */}
        {mounted && mobileMenuOpen && (
          <div className="md:hidden py-3 px-2 space-y-1 sm:px-3 border-t border-gray-200 animate-fade-in">
            <Link href="/" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700">
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700">
              About
            </Link>
            {session && (
              <Link href="/dashboard" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                Dashboard
              </Link>
            )}
            {isAdmin && (
              <>
                <Link href="/admin/users" className="block px-3 py-2 rounded-lg text-base font-medium text-purple-700 hover:bg-purple-50 hover:text-purple-800">
                  User Management
                </Link>
                <Link href="/admin/audit" className="block px-3 py-2 rounded-lg text-base font-medium text-purple-700 hover:bg-purple-50 hover:text-purple-800">
                  Audit Logs
                </Link>
              </>
            )}
            {session && (
              <div className="pt-2 border-t border-gray-200 mt-2">
                <div className="flex items-center px-3 py-2">
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full border-2 border-blue-200 mr-2"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <span className="text-blue-700 font-medium text-sm">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-gray-700 font-medium">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <button
                  className="w-full mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </button>
              </div>
            )}
            {!session && (
              <div className="pt-2 border-t border-gray-200 mt-2 flex flex-col space-y-2">
                <Link href="/login" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                  Login
                </Link>
                <Link href="/register" className="w-full inline-flex items-center justify-center px-4 py-2 border border-blue-200 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
