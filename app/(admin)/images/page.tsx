import AddImageButton from "@/components/admin/images/AddImageButton";
import ImageGrid from "@/components/admin/images/ImageGrid";

const placeholderImages = [
  { id: 1, title: "Classroom Moment #1",   captionSnippet: "A candid shot from the spring semester workshop on comedic timing and delivery." },
  { id: 2, title: "Stage Performance",     captionSnippet: "Students performing a short improv set during the end-of-term showcase event." },
  { id: 3, title: "Behind the Scenes",     captionSnippet: "Rehearsal prep before the main show — capturing the energy backstage." },
  { id: 4, title: "Group Photo – Cohort 4",captionSnippet: "The fourth cohort poses together after completing the eight-week program." },
  { id: 5, title: "Workshop Exercise",     captionSnippet: "Participants practicing physical comedy exercises in pairs during week three." },
  { id: 6, title: "Keynote Speaker Visit", captionSnippet: "A visiting comedian leads a Q&A session with students about craft and career." },
];

export default function ImagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
          Images
        </h2>
        <AddImageButton />
      </div>

      <ImageGrid items={placeholderImages} />
    </div>
  );
}
