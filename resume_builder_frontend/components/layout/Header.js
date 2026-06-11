"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import React from "react";
export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  const showResumes = () => {
    router.push("/user");
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">RB</span>
          </div>
          <span className="text-xl font-bold text-foreground">
            ResumeBuilder
          </span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {isAuthenticated ? (
            <>
              <Link
                href="/builder"
                className="text-foreground hover:text-primary transition"
              >
                Builder
              </Link>
              <button
                onClick={showResumes}
                className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition font-medium"
              >
                dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-foreground hover:text-primary transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

// {
//   /* Mobile Menu */
// }
// {
//   menuOpen && (
//     <div className="md:hidden border-t border-border bg-card">
//       <nav className="flex flex-col gap-4 px-4 py-4">
//         {isAuthenticated ? (
//           <>
//             <Link
//               href="/builder"
//               className="text-foreground hover:text-primary transition block py-2"
//             >
//               Builder
//             </Link>
//             <button
//               onClick={() => {
//                 showResumes();
//                 setMenuOpen(false);
//               }}
//               className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition font-medium w-full text-left"
//             >
//               Dashboard
//             </button>
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setMenuOpen(false);
//               }}
//               className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition w-full"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               href="/login"
//               className="text-foreground hover:text-primary transition block py-2"
//               onClick={() => setMenuOpen(false)}
//             >
//               Login
//             </Link>
//             <Link
//               href="/signup"
//               className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition block text-center"
//               onClick={() => setMenuOpen(false)}
//             >
//               Sign Up
//             </Link>
//           </>
//         )}
//       </nav>
//     </div>
//   );
// }
