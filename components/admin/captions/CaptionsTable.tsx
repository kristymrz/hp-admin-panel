const placeholderRows = [
  { id: 1, text: "Nothing says 'growth' like accidentally calling your professor 'Mom'.", image: "Classroom Moment #1",    author: "Ada Lovelace",      created: "Jan 15, 2024" },
  { id: 2, text: "The mic was hot. So was the embarrassment.",                          image: "Stage Performance",     author: "Grace Hopper",      created: "Feb 8, 2024"  },
  { id: 3, text: "Behind every great punchline is a very confused first draft.",         image: "Behind the Scenes",     author: "Alan Turing",        created: "Mar 22, 2024" },
  { id: 4, text: "We came, we saw, we forgot our lines. 10/10 would do again.",         image: "Group Photo – Cohort 4",author: "Margaret Hamilton",  created: "Apr 11, 2024" },
  { id: 5, text: "Comedy is just tragedy plus timing, and we nailed the tragedy part.",  image: "Workshop Exercise",     author: "Linus Torvalds",     created: "May 27, 2024" },
];

export default function CaptionsTable() {
  return (
    <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-hidden">
      <table className="w-full text-sm font-[family-name:var(--font-pixelify-sans)]">
        <thead>
          <tr className="bg-[#0b1e30] border-b border-[#099ff6]/20">
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Caption
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
              Associated Image
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
              Author
            </th>
            <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
              Created
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
              {/* Caption text */}
              <td className="px-4 py-3 text-[#e8d5a3] max-w-sm">
                <span className="line-clamp-2 leading-relaxed">{row.text}</span>
              </td>

              {/* Associated image */}
              <td className="px-4 py-3 text-[#099ff6]/80 whitespace-nowrap">
                {row.image}
              </td>

              {/* Author */}
              <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap">
                {row.author}
              </td>

              {/* Created date */}
              <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap">
                {row.created}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
