import SignInButton from "./SignInButton";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

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

        {/* Error banner */}
        {error === "auth_failed" && (
          <div
            className="w-full border border-red-300 rounded-lg px-4 py-3 text-center text-xs text-red-600 bg-red-50"
            style={{ fontFamily: "var(--font-pixelify-sans)" }}
          >
            Sign-in failed. Please try again.
          </div>
        )}

        <SignInButton />

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
