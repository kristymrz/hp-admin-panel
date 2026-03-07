import ImageCard from "./ImageCard";

type ImageItem = {
  id: number;
  title: string;
  captionSnippet: string;
};

type ImageGridProps = {
  items: ImageItem[];
};

export default function ImageGrid({ items }: ImageGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-[#0f2236] rounded-lg border-2 border-dashed border-[#099ff6]/20">
        <span className="text-[#e8d5a3]/30 text-sm font-[family-name:var(--font-pixelify-sans)]">
          No images yet
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item) => (
        <ImageCard key={item.id} title={item.title} captionSnippet={item.captionSnippet} />
      ))}
    </div>
  );
}
