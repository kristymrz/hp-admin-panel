import ProfileSearchBar from "@/components/admin/profiles/ProfileSearchBar";
import ProfilesTable from "@/components/admin/profiles/ProfilesTable";

export default function ProfilesPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
        Profiles
      </h2>
      <ProfileSearchBar />
      <ProfilesTable />
    </div>
  );
}
