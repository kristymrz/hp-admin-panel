import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export default async function AdminHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="shrink-0 h-16 bg-[#703d23] border-b border-[#C2B280]/30 flex items-center justify-between px-6 font-[family-name:var(--font-pixelify-sans)]">
      <div className="flex items-center gap-3">
        <span className="text-[#e8d5a3]/60 text-xl">⚓</span>
        <h1 className="text-[#e8d5a3] text-3xl font-semibold tracking-wide">
          HUMOR PROJECT CONTROL ROOM
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[#e8d5a3]/80 text-lg">Welcome, {user?.email}</span>
        <form action={signOut}>
          <button type="submit" className="px-4 py-1.5 text-base text-[#e8d5a3] border border-[#e8d5a3]/40 rounded hover:bg-[#e8d5a3]/10 hover:border-[#e8d5a3]/70 transition-colors cursor-pointer">
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
