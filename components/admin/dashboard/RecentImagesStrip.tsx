type ImageEntry = {
  id: string;
  url: string | null;
};

type Props = {
  images: ImageEntry[];
};

export default function RecentImagesStrip({ images }: Props) {
  return (
    <div className="bg-[#0f2236] rounded-lg shadow-lg p-6 flex flex-col gap-4 font-[family-name:var(--font-pixelify-sans)]">
      <span className="text-[#e8d5a3]/60 text-sm uppercase tracking-widest">
        Recent Images
      </span>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => (
          <div
            key={image.id}
            className="aspect-square rounded-lg bg-[#0b1e30] border border-[#099ff6]/10 overflow-hidden flex items-center justify-center"
          >
            {image.url ? (
              <img
                src={image.url}
                alt="Recent image"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#e8d5a3]/15 text-2xl">🖼️</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
