export type LLMPromptChainRow = {
  id: number;
  created_datetime_utc: string;
  caption_request_id: number;
};

type Props = {
  chains: LLMPromptChainRow[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LLMPromptChainsTable({ chains }: Props) {
  return (
    <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full text-sm font-[family-name:var(--font-pixelify-sans)]">
        <thead>
          <tr className="bg-[#0b1e30] border-b border-[#099ff6]/20">
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              ID
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
              Caption Request ID
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {chains.map((row, i) => (
            <tr
              key={row.id}
              className={`border-b border-[#099ff6]/10 transition-colors hover:bg-[#099ff6]/5 ${
                i % 2 === 0 ? "bg-[#0f2236]" : "bg-[#0d1f33]"
              }`}
            >
              <td className="px-4 py-3 text-[#e8d5a3]/70 font-mono text-xs">
                {row.id}
              </td>
              <td className="px-4 py-3 text-[#e8d5a3]/70 font-mono text-xs">
                {row.caption_request_id}
              </td>
              <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap text-xs">
                {formatDate(row.created_datetime_utc)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
