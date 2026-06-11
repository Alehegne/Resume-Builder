// API client with automatic error handling for authentication errors

import { backendUrl } from "@/utils/constants";

export async function fetchWithAuth(url, options = {}, onAuthError = null) {
  try {
    const response = await fetch(url, options);

    // Handle authentication errors
    if (response.status === 401 || response.status === 403) {
      // Clear auth data from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }

      // Call callback if provided (for logout/redirect logic)
      if (onAuthError && typeof onAuthError === "function") {
        onAuthError({
          status: response.status,
          message:
            response.status === 401
              ? "Session expired. Please login again."
              : "Access denied.",
        });
      }
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export async function apiRequest(endpoint, options = {}, onAuthError = null) {
  // Get auth headers
  const authHeaders = getAuthHeaders();

  // Merge with provided headers
  const headers = {
    "Content-Type": "application/json",
    ...authHeaders,
    ...options.headers,
  };

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${backendUrl}${endpoint}`;

  const response = await fetchWithAuth(
    url,
    { ...options, headers },
    onAuthError,
  );

  // Handle error responses
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    if (response.status === 401 || response.status === 403) {
      const error = new Error(errorData.message || "Authentication failed");
      error.status = response.status;
      throw error;
    }

    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
}

export function getAuthHeaders() {
  if (typeof window === "undefined") return {};

  try {
    const user = localStorage.getItem("user");
    if (!user) return {};

    const userData = JSON.parse(user);
    if (userData && userData.token) {
      return {
        Authorization: `Bearer ${userData.token}`,
      };
    }
  } catch (e) {
    console.error("Error reading auth token:", e);
  }

  return {};
}
