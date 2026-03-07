"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { generatePresignedUrl, registerImageUrl, generateCaptions } from "@/app/actions/upload";

type Props = {
  onClose: () => void;
};

type UploadState = "idle" | "uploading" | "complete" | "error";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
];

const ACCEPTED_EXTENSIONS = ".jpeg,.jpg,.png,.webp,.gif,.heic";

function getContentType(file: File): string {
  if (file.type && ACCEPTED_TYPES.includes(file.type)) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "heic" || ext === "heif") return "image/heic";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  return file.type;
}

function isValidFile(file: File): boolean {
  const contentType = getContentType(file);
  return ACCEPTED_TYPES.includes(contentType);
}

export default function ImageUploadModal({ onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  async function uploadFile(file: File) {
    if (!isValidFile(file)) {
      setErrorMessage(
        `Invalid file type "${file.type || file.name}". Accepted formats: JPEG, PNG, WEBP, GIF, HEIC.`
      );
      setUploadState("error");
      return;
    }

    setUploadState("uploading");
    setErrorMessage("");

    try {
      const contentType = getContentType(file);

      // Step 1: Generate presigned URL
      const { presignedUrl, cdnUrl } = await generatePresignedUrl(contentType);

      // Step 2: Upload bytes directly to S3
      const putRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: file,
      });

      if (!putRes.ok) throw new Error("Failed to upload file to storage.");

      // Step 3: Register the CDN URL in the pipeline
      const { imageId } = await registerImageUrl(cdnUrl);

      // Step 4: Generate captions for the uploaded image
      await generateCaptions(imageId);

      setUploadState("complete");

      // Navigate to page 1 after a short delay so user sees the success state
      setTimeout(() => {
        router.push("/images");
        onClose();
      }, 2000);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Upload failed.");
      setUploadState("error");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleRetry() {
    setUploadState("idle");
    setErrorMessage("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
      onClick={uploadState === "idle" ? onClose : undefined}
    >
      <div
        className="bg-[#0f2236] rounded-lg shadow-2xl w-full max-w-md font-[family-name:var(--font-pixelify-sans)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#099ff6]/20">
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Upload Image</h3>
          {uploadState === "idle" && (
            <button
              onClick={onClose}
              className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <div className="px-6 py-6">
          {/* Idle — drop zone */}
          {uploadState === "idle" && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-3 h-52 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
                isDragging
                  ? "border-[#099ff6] bg-[#099ff6]/10"
                  : "border-[#099ff6]/25 hover:border-[#099ff6]/50 hover:bg-[#099ff6]/5"
              }`}
            >
              <span className="text-4xl text-[#e8d5a3]/20">☁</span>
              <div className="text-center">
                <p className="text-[#e8d5a3]/80 text-sm">
                  Drag & drop an image here
                </p>
                <p className="text-[#e8d5a3]/40 text-xs mt-0.5">
                  or click to browse
                </p>
              </div>
              <p className="text-[#e8d5a3]/25 text-xs tracking-wide">
                JPEG · PNG · WEBP · GIF · HEIC
              </p>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {/* Uploading */}
          {uploadState === "uploading" && (
            <div className="flex flex-col items-center justify-center gap-4 h-52">
              <div className="w-10 h-10 rounded-full border-2 border-[#099ff6]/20 border-t-[#099ff6] animate-spin" />
              <p className="text-[#e8d5a3]/80 text-sm">Uploading image...</p>
            </div>
          )}

          {/* Complete */}
          {uploadState === "complete" && (
            <div className="flex flex-col items-center justify-center gap-3 h-52">
              <span className="text-4xl text-[#3ac586]">✓</span>
              <p className="text-[#3ac586] text-sm font-semibold">
                Upload complete!
              </p>
              <p className="text-[#e8d5a3]/40 text-xs">
                Redirecting to images...
              </p>
            </div>
          )}

          {/* Error */}
          {uploadState === "error" && (
            <div className="flex flex-col items-center justify-center gap-4 h-52">
              <span className="text-4xl text-[#ec6d70]">✕</span>
              <div className="text-center">
                <p className="text-[#ec6d70] text-sm font-semibold">
                  Upload failed
                </p>
                <p className="text-[#e8d5a3]/50 text-xs mt-1 max-w-xs">
                  {errorMessage}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleRetry}
                  className="px-4 py-1.5 text-xs text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors cursor-pointer"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 text-xs text-[#e8d5a3]/60 border border-[#e8d5a3]/20 rounded hover:bg-[#e8d5a3]/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
