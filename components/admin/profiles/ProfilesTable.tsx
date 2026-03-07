type ProfileRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  is_superadmin: boolean;
  is_in_study: boolean;
  is_matrix_admin: boolean;
  created_datetime_utc: string;
};

type Props = {
  profiles: ProfileRow[];
};

function avatarInitial(row: ProfileRow): string {
  if (row.first_name) return row.first_name.charAt(0).toUpperCase();
  if (row.last_name) return row.last_name.charAt(0).toUpperCase();
  if (row.email) return row.email.charAt(0).toUpperCase();
  return "?";
}

function displayName(row: ProfileRow): string {
  if (!row.first_name && !row.last_name) return "—";
  return [row.first_name, row.last_name].filter(Boolean).join(" ");
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function shortId(id: string): string {
  return id.slice(0, 8) + "…";
}

function Badge({ value, activeColor }: { value: boolean; activeColor: string }) {
  return value ? (
    <span className={`inline-block px-2 py-0.5 rounded text-xs border ${activeColor}`}>
      Yes
    </span>
  ) : (
    <span className="inline-block px-2 py-0.5 rounded text-xs bg-[#e8d5a3]/5 text-[#e8d5a3]/40 border border-[#e8d5a3]/10">
      No
    </span>
  );
}

export default function ProfilesTable({ profiles }: Props) {
  return (
    <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full text-sm font-[family-name:var(--font-pixelify-sans)]">
        <thead>
          <tr className="bg-[#0b1e30] border-b border-[#099ff6]/20">
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium w-12">
              Avatar
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Name
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
              Profile ID
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Created
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Email
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
              Superadmin
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
              In Study
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
              Matrix Admin
            </th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((row, i) => (
            <tr
              key={row.id}
              className={`border-b border-[#099ff6]/10 transition-colors hover:bg-[#099ff6]/5 ${
                i % 2 === 0 ? "bg-[#0f2236]" : "bg-[#0d1f33]"
              }`}
            >
              <td className="px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-[#703d23]/60 border border-[#C2B280]/20 flex items-center justify-center text-[#e8d5a3]/60 text-xs">
                  {avatarInitial(row)}
                </div>
              </td>
              <td className="px-4 py-3 text-[#e8d5a3] whitespace-nowrap">
                {displayName(row)}
              </td>
              <td className="px-4 py-3 text-[#099ff6]/70 font-mono text-xs whitespace-nowrap">
                {shortId(row.id)}
              </td>
              <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap text-xs">
                {formatDate(row.created_datetime_utc)}
              </td>
              <td className="px-4 py-3 text-[#e8d5a3]/70 text-xs">
                {row.email ?? "—"}
              </td>
              <td className="px-4 py-3">
                <Badge value={row.is_superadmin} activeColor="bg-[#3ac586]/15 text-[#3ac586] border-[#3ac586]/30" />
              </td>
              <td className="px-4 py-3">
                <Badge value={row.is_in_study} activeColor="bg-[#099ff6]/15 text-[#099ff6] border-[#099ff6]/30" />
              </td>
              <td className="px-4 py-3">
                <Badge value={row.is_matrix_admin} activeColor="bg-[#a0228f]/20 text-[#c94db8] border-[#a0228f]/30" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
