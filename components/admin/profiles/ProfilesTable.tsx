const placeholderRows = [
  { id: 1, name: "Ada Lovelace",     email: "ada@example.com",     superadmin: true,  joined: "Jan 12, 2024" },
  { id: 2, name: "Grace Hopper",     email: "grace@example.com",   superadmin: false, joined: "Feb 3, 2024"  },
  { id: 3, name: "Alan Turing",      email: "alan@example.com",    superadmin: false, joined: "Mar 19, 2024" },
  { id: 4, name: "Margaret Hamilton",email: "margaret@example.com",superadmin: false, joined: "Apr 7, 2024"  },
  { id: 5, name: "Linus Torvalds",   email: "linus@example.com",   superadmin: true,  joined: "May 22, 2024" },
];

export default function ProfilesTable() {
  return (
    <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-hidden">
      <table className="w-full text-sm font-[family-name:var(--font-pixelify-sans)]">
        <thead>
          <tr className="bg-[#0b1e30] border-b border-[#099ff6]/20">
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium w-12">
              Avatar
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Name
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Email
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Superadmin
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Joined
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {placeholderRows.map((row, i) => (
            <tr
              key={row.id}
              className={`border-b border-[#099ff6]/10 transition-colors hover:bg-[#099ff6]/5 ${
                i % 2 === 0 ? "bg-[#0f2236]" : "bg-[#0d1f33]"
              }`}
            >
              {/* Avatar */}
              <td className="px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-[#703d23]/60 border border-[#C2B280]/20 flex items-center justify-center text-[#e8d5a3]/60 text-xs">
                  {row.name.charAt(0)}
                </div>
              </td>

              {/* Name */}
              <td className="px-4 py-3 text-[#e8d5a3]">{row.name}</td>

              {/* Email */}
              <td className="px-4 py-3 text-[#e8d5a3]/70">{row.email}</td>

              {/* Superadmin badge */}
              <td className="px-4 py-3">
                {row.superadmin ? (
                  <span className="inline-block px-2 py-0.5 rounded text-xs bg-[#3ac586]/15 text-[#3ac586] border border-[#3ac586]/30">
                    Yes
                  </span>
                ) : (
                  <span className="inline-block px-2 py-0.5 rounded text-xs bg-[#e8d5a3]/5 text-[#e8d5a3]/40 border border-[#e8d5a3]/10">
                    No
                  </span>
                )}
              </td>

              {/* Joined */}
              <td className="px-4 py-3 text-[#e8d5a3]/70">{row.joined}</td>

              {/* Actions */}
              <td className="px-4 py-3">
                <button className="px-3 py-1 text-xs text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors cursor-pointer">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
