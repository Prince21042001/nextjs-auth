"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("overview");
  
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!session) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-3xl mx-auto mt-10">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Access denied</h3>
            <div className="mt-2 text-red-700">
              <p>You must be signed in to view this page.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "settings", name: "Settings" },
    { id: "activity", name: "Activity" },
  ];
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        <p className="mt-2 text-blue-100">
          Logged in as: <span className="font-semibold">{session.user?.email}</span>
        </p>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap
                ${activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800">Account Status</h3>
                <p className="mt-2 text-blue-600">Active</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-lg font-medium text-green-800">Data Usage</h3>
                <p className="mt-2 text-green-600">12% of quota</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-medium text-purple-800">API Calls</h3>
                <p className="mt-2 text-purple-600">243 this month</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">No recent activity to display.</p>
            </div>
          </div>
        )}
        
        {activeTab === "settings" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-gray-600 mb-6">Manage your account preferences and settings.</p>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium">Profile Information</h3>
                <p className="text-sm text-gray-500 mt-1">Update your account profile information.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium">Security Settings</h3>
                <p className="text-sm text-gray-500 mt-1">Manage your password and security preferences.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium">Notification Preferences</h3>
                <p className="text-sm text-gray-500 mt-1">Control when and how you receive notifications.</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "activity" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
            <p className="text-gray-600 mb-6">View your recent account activity.</p>
            
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Logged in</p>
                  <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
