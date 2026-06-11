"use client";

import React, { createContext, useState, useCallback } from "react";
import { backendUrl } from "@/utils/constants";

export const AuthContext = createContext();

/**
 * Get Authorization header object for API requests
 * @returns {Object} Headers object with Authorization Bearer token
 */
export function getAuthHeaders() {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  if (!user) return {};

  try {
    const userData = JSON.parse(user);
    if (userData.token) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      };
    }
  } catch (e) {
    console.error("Error parsing user data:", e);
  }

  return { "Content-Type": "application/json" };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //authenticated if user data exists in localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/user/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let message = "Something went wrong";

        try {
          const errData = await response.json();
          message = errData.message || message;
        } catch {
          message = response.statusText;
        }

        throw new Error(message);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
      setIsAuthenticated(true);

      return data.data;
    } catch (err) {
      setError(err.message); // 👈 store error for UI
      throw err; // optional (keep for component-level handling)
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/user/register.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        let message = "Something went wrong";

        try {
          const errData = await response.json();
          message = errData.message || message;
        } catch {
          message = response.statusText;
        }

        throw new Error(message);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
      setIsAuthenticated(true);

      return data.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const logout = useCallback(async () => {
    try {
      // Call backend logout endpoint
      const headers = getAuthHeaders();
      await fetch(`${backendUrl}/user/logout.php`, {
        method: "POST",
        headers: headers,
      }).catch(() => {
        // Error is okay, we'll logout anyway
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Clear local data regardless of API response
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    }
  }, []);

  const getToken = useCallback(() => {
    if (user && user.token) {
      return user.token;
    }
    return null;
  }, [user]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    error,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
