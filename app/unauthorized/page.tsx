import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#eaf6fc]">
      {/* Ocean — bottom half */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#18ace7]" />

      <div
        className="relative z-10 w-full max-w-sm mx-4 bg-white/90 backdrop-blur-sm border border-[#18ace7]/30 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6"
        style={{ fontFamily: "var(--font-pixelify-sans)" }}
      >
        <h1 className="text-2xl font-bold tracking-widest text-center text-gray-800 uppercase leading-snug">
          Access Denied
        </h1>

        <p className="text-sm text-center text-gray-500 leading-relaxed">
          You must be a superadmin to access this area.
        </p>

        <Link
          href="/login"
          className="w-full flex items-center justify-center py-3 px-6 rounded-full bg-[#18ace7] hover:bg-[#129fd6] active:bg-[#0e89bb] text-white font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200"
        >
          Sign in with a different account
        </Link>
      </div>
    </main>
  );
}
