"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    // Browser will redirect — no need to reset loading state.
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#eaf6fc]">
      {/* Ocean — bottom half */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#18ace7]" />
      {/* Login card */}
      <div className="relative z-10 w-full max-w-sm mx-4 bg-white/90 backdrop-blur-sm border border-[#18ace7]/30 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6">
        {/* Heading */}
        <h1
          className="text-2xl font-bold tracking-widest text-center text-gray-800 uppercase leading-snug"
          style={{ fontFamily: "var(--font-pixelify-sans)" }}
        >
          ACCESS REQUIRED
          <br />
          BEYOND THIS POINT
        </h1>

        {/* Sign in with Google button */}
        <button
          type="button"
          onClick={handleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-[#18ace7] hover:bg-[#129fd6] active:bg-[#0e89bb] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          style={{ fontFamily: "var(--font-pixelify-sans)" }}
        >
          {/* Google icon — white */}
          <svg
            className="w-5 h-5 flex-shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="white"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="white"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="white"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="white"
            />
          </svg>
          {loading ? "Signing in…" : "Sign in with Google"}
        </button>

        {/* Access requirements info box */}
        <div
          className="w-full border border-gray-300 rounded-lg p-4 text-center text-xs text-gray-500 leading-relaxed bg-gray-50/80"
          style={{ fontFamily: "var(--font-pixelify-sans)" }}
        >
          <span className="font-semibold text-gray-600 block mb-1">
            ACCESS REQUIREMENTS:
          </span>
          Only allow users with{" "}
          <code className="font-mono text-[#0d82b5]">
            profiles.is_superadmin == TRUE
          </code>
        </div>
      </div>
    </main>
  );
}
