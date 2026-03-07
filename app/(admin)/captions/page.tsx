import CaptionSearchBar from "@/components/admin/captions/CaptionSearchBar";
import CaptionsTable from "@/components/admin/captions/CaptionsTable";

export default function CaptionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
        Captions
      </h2>
      <CaptionSearchBar />
      <CaptionsTable />
    </div>
  );
}
