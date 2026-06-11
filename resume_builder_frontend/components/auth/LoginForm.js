"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { validateLoginForm } from "@/utils/validators";
import { sendLogEvent } from "../../lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated, error } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  // const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "admin") {
        router.push("/admin");
      } else {
        console.log("Redirecting to builder page...");
        router.push("/user");
      }
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSubmitError("");

    const validationErrors = validateLoginForm(
      formData.email,
      formData.password,
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await login(formData.email, formData.password);
      console.log("Login successful now:", res, "role:", res.role);
      if (res.role === "admin") {
        console.log("Redirecting to admin page...");
        router.push("/admin");
        return;
      } else {
        //log user action
        const action = {
          user_id: res.userId,
          action: "User logged in",
        };

        sendLogEvent(action);

        console.log("Redirecting to builder page...");
        router.push("/builder");
      }
    } catch (error) {
      // setSubmitError("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  /*
  backend response format:
  {
  "success":true,
  "message":"Login successful",
  "data":{"userId":3,
  "email":"alex2@gmail.com"},
  "error":null}
  */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in to your resume builder account
          </p>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive text-destructive rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  errors.email ? "border-destructive" : "border-border"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  errors.password ? "border-destructive" : "border-border"
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
