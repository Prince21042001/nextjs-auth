"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface AuditLog {
  _id: string;
  timestamp: string;
  actorId: string;
  targetUserId: string;
  action: string;
  details: Record<string, any>;
  actor?: { name: string; email: string };
  target?: { name: string; email: string };
}

interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export default function AuditLogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    totalPages: 1,
    totalCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterAction, setFilterAction] = useState(searchParams.get("action") || "");
  
  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1");
  
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        setLoading(true);
        
        // Build query string
        const queryParams = new URLSearchParams();
        queryParams.set("page", currentPage.toString());
        queryParams.set("limit", "20");
        if (filterAction) {
          queryParams.set("action", filterAction);
        }
        
        const res = await fetch(`/api/admin/audit?${queryParams.toString()}`);
        
        if (!res.ok) {
          throw new Error(res.status === 403 ? "Unauthorized" : "Failed to load audit logs");
        }
        
        const data = await res.json();
        setLogs(data.logs);
        setPagination(data.pagination);
      } catch (err: any) {
        setError(err.message || "Failed to load audit logs");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session?.user.role === "admin") {
      fetchAuditLogs();
    }
  }, [status, session, currentPage, filterAction]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const action = e.target.value;
    setFilterAction(action);
    
    // Reset to page 1 when changing filters
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (action) {
      params.set("action", action);
    } else {
      params.delete("action");
    }
    
    router.push(`/admin/audit?${params.toString()}`);
  };
  
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/admin/audit?${params.toString()}`);
  };
  
  // Format timestamp
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };
  
  // Get action badge color
  const getActionColor = (action: string) => {
    switch (action) {
      case "UPDATE_ROLE":
        return "bg-blue-100 text-blue-800";
      case "DELETE_USER":
        return "bg-red-100 text-red-800";
      case "CREATE_USER":
        return "bg-green-100 text-green-800";
      case "RESET_PASSWORD":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
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
        <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
        <div className="mt-4 sm:mt-0">
          <Link 
            href="/admin/users" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to User Management
          </Link>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <label htmlFor="action-filter" className="block text-sm font-medium text-gray-700 mr-2">
            Filter by action:
          </label>
          <select
            id="action-filter"
            value={filterAction}
            onChange={handleFilterChange}
            className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">All actions</option>
            <option value="UPDATE_ROLE">Update Role</option>
            <option value="DELETE_USER">Delete User</option>
            <option value="CREATE_USER">Create User</option>
            <option value="RESET_PASSWORD">Reset Password</option>
          </select>
        </div>
        
        <p className="mt-2 text-sm text-gray-700 sm:mt-0">
          Showing {logs.length} of {pagination.totalCount} logs
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
                      Timestamp
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Admin
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Target User
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                        No audit logs found
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                          {formatDate(log.timestamp)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(log.action)}`}>
                            {log.action.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.actor ? (
                            <div>
                              <div className="font-medium">{log.actor.name}</div>
                              <div className="text-xs">{log.actor.email}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400">Unknown</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.target ? (
                            <div>
                              <div className="font-medium">{log.target.name}</div>
                              <div className="text-xs">{log.target.email}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400">Unknown</span>
                          )}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {log.details && Object.keys(log.details).length > 0 ? (
                            <ul className="list-disc list-inside">
                              {Object.entries(log.details).map(([key, value]) => (
                                <li key={key} className="text-xs">
                                  <span className="font-medium">{key.replace(/([A-Z])/g, " $1").trim()}:</span>{" "}
                                  {typeof value === "object" ? JSON.stringify(value) : String(value)}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400">No details</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(Math.min(pagination.totalPages, currentPage + 1))}
              disabled={currentPage === pagination.totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === pagination.totalPages 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{pagination.totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 
                      ? "text-gray-300 cursor-not-allowed" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">First</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M8.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L4.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 
                      ? "text-gray-300 cursor-not-allowed" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === pagination.totalPages 
                      ? "text-gray-300 cursor-not-allowed" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handlePageChange(pagination.totalPages)}
                  disabled={currentPage === pagination.totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === pagination.totalPages 
                      ? "text-gray-300 cursor-not-allowed" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Last</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M11.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L15.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 