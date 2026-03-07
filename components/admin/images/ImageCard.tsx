"use client";

import { useState } from "react";
import ImageDetailModal, { type ImageRow } from "./ImageDetailModal";
import ImageEditModal from "./ImageEditModal";
import ImageDeleteModal from "./ImageDeleteModal";

type Props = {
  image: ImageRow;
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ImageCard({ image }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-hidden flex flex-col font-[family-name:var(--font-pixelify-sans)]">
        {/* Image */}
        <div className="w-full h-44 bg-[#0b1e30] border-b border-[#099ff6]/10 overflow-hidden flex items-center justify-center">
          {image.url ? (
            <img
              src={image.url}
              alt="Image"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-[#e8d5a3]/15 text-4xl">🖼️</span>
          )}
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col gap-1 flex-1">
          <p className="text-[#099ff6]/80 text-xs font-mono truncate">
            {image.url ?? "No URL"}
          </p>
          <p className="text-[#e8d5a3]/40 text-xs">
            {formatDate(image.created_datetime_utc)}
          </p>
        </div>

        {/* Actions */}
        <div className="px-4 pb-4 flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 py-1.5 text-xs text-[#e8d5a3]/70 border border-[#e8d5a3]/20 rounded hover:bg-[#e8d5a3]/5 transition-colors cursor-pointer"
          >
            More Info
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className="flex-1 py-1.5 text-xs text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex-1 py-1.5 text-xs text-[#ec6d70] border border-[#ec6d70]/30 rounded hover:bg-[#ec6d70]/10 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      {showModal && (
        <ImageDetailModal image={image} onClose={() => setShowModal(false)} />
      )}
      {showEditModal && (
        <ImageEditModal image={image} onClose={() => setShowEditModal(false)} />
      )}
      {showDeleteModal && (
        <ImageDeleteModal imageId={image.id} onClose={() => setShowDeleteModal(false)} />
      )}
    </>
  );
}
