"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Dashboard",       href: "/" },
  { label: "Profiles",        href: "/profiles" },
  { label: "Images",          href: "/images" },
  { label: "Captions",        href: "/captions" },
  { label: "Humor Flavors",   href: "/humor-flavors" },
  { label: "LLMs",            href: "/llms" },
  { label: "Terms",           href: "/terms" },
  { label: "Sign Up Domains", href: "/sign-up-domains" },
  { label: "Email Addresses", href: "/email-addresses" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="shrink-0 w-56 bg-[#0b1e30] border-r border-[#099ff6]/20 flex flex-col pt-6 overflow-y-auto font-[family-name:var(--font-pixelify-sans)]">
      <nav className="flex flex-col gap-1 px-3">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded text-base transition-colors ${
                isActive
                  ? "bg-[#099ff6]/20 text-[#099ff6] border-l-2 border-[#099ff6]"
                  : "text-[#e8d5a3]/80 hover:bg-[#099ff6]/10 hover:text-[#e8d5a3] border-l-2 border-transparent"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-6 pb-6 text-[#C2B280]/20 text-xs tracking-widest uppercase">
        HP Admin
      </div>
    </aside>
  );
}
