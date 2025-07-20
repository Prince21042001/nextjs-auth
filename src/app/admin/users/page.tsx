"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  image?: string;
}

function RoleControl({ user, currentUserId }: { user: User; currentUserId: string }) {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [currentRole, setCurrentRole] = useState(user.role || "user");
  
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setError("");
    setUpdating(true);
    
    try {
      const res = await fetch(`/api/admin/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update role");
      }
      
      setCurrentRole(newRole);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };
  
  // Check if this is the current user (self)
  const isSelf = user._id === currentUserId;
  
  return (
    <div>
      <div className="flex items-center space-x-2">
        <select
          value={currentRole}
          onChange={handleChange}
          disabled={updating || (isSelf && currentRole === "admin")}
          className={`block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            isSelf && currentRole === "admin" ? "opacity-70" : ""
          }`}
        >
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
        {updating && (
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        )}
      </div>
      
      {isSelf && currentRole === "admin" && (
        <div className="text-xs text-gray-500 mt-1">You cannot demote yourself</div>
      )}
      
      {error && (
        <div className="text-xs text-red-500 mt-1">{error}</div>
      )}
    </div>
  );
}

export default function AdminUserPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        
        if (!res.ok) {
          throw new Error(res.status === 403 ? "Unauthorized" : "Failed to load users");
        }
        
        const data = await res.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchUsers();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || (session && session.user.role !== "admin")) {
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
              <p>You must be an admin to view this page.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
        <p className="mt-2 text-sm text-gray-700 sm:mt-0">
          Total users: <span className="font-medium">{users.length}</span>
        </p>
      </div>
      
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created At
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex items-center">
                          {user.image && (
                            <img 
                              src={user.image} 
                              alt={`${user.name}'s avatar`} 
                              className="h-8 w-8 rounded-full mr-3"
                            />
                          )}
                          {user.name || "N/A"}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "admin" 
                            ? "bg-purple-100 text-purple-800" 
                            : user.role === "moderator"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}>
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <RoleControl user={user} currentUserId={session?.user.id || ""} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 