export default function AddImageButton() {
  return (
    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#099ff6] hover:bg-[#007ecc] text-white text-sm font-semibold rounded-lg shadow transition-colors cursor-pointer font-[family-name:var(--font-pixelify-sans)]">
      <span className="text-base leading-none">+</span>
      Upload Image
    </button>
  );
}
