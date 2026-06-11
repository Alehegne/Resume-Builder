// hooks/useAuthError.js
// Hook for handling authentication errors and redirects

import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { useCallback } from "react";

/**
 * Hook for handling authentication errors
 * @returns {Object} Object with error handling functions
 */
export function useAuthError() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleAuthError = useCallback(
    async (error) => {
      if (!error) return;

      const status = error.status || error.response?.status;
      const message = error.message || "Authentication error";

      if (status === 401) {
        // Session expired - logout user
        await logout();

        // Show error message
        alert("Your session has expired. Please login again.");

        // Redirect to login
        router.push("/login");
      } else if (status === 403) {
        // Permission denied
        alert("You do not have permission to access this resource.");

        // Redirect to home or profile
        router.push("/");
      }
    },
    [logout, router],
  );

  return { handleAuthError };
}

export default useAuthError;
