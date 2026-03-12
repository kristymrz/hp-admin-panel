"use client";

import { useState } from "react";
import EmailAddressEditModal from "./EmailAddressEditModal";
import EmailAddressDeleteModal from "./EmailAddressDeleteModal";
import EmailAddressCreateModal from "./EmailAddressCreateModal";

export type EmailAddressRow = {
  id: number;
  created_datetime_utc: string;
  modified_datetime_utc: string | null;
  email_address: string;
};

type Props = {
  rows: EmailAddressRow[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EmailAddressesTable({ rows }: Props) {
  const [editRow, setEditRow] = useState<EmailAddressRow | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      {/* Create button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#099ff6] hover:bg-[#007ecc] text-white text-sm font-semibold rounded-lg shadow transition-colors cursor-pointer font-[family-name:var(--font-pixelify-sans)]"
        >
          <span className="text-base leading-none">+</span>
          Add Email Address
        </button>
      </div>

      <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-sm font-[family-name:var(--font-pixelify-sans)]">
          <thead>
            <tr className="bg-[#0b1e30] border-b border-[#099ff6]/20">
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                ID
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Email Address
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Created
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Modified
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-[#099ff6]/10 transition-colors hover:bg-[#099ff6]/5 ${
                  i % 2 === 0 ? "bg-[#0f2236]" : "bg-[#0d1f33]"
                }`}
              >
                <td className="px-4 py-3 text-[#e8d5a3]/70 font-mono text-xs">
                  {row.id}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3] text-xs">
                  {row.email_address}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap text-xs">
                  {formatDate(row.created_datetime_utc)}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap text-xs">
                  {row.modified_datetime_utc ? formatDate(row.modified_datetime_utc) : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setEditRow(row)}
                      className="px-3 py-1 text-xs text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDeleteId(row.id)}
                      className="px-3 py-1 text-xs text-[#ec6d70] border border-[#ec6d70]/30 rounded hover:bg-[#ec6d70]/10 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <EmailAddressCreateModal onClose={() => setShowCreate(false)} />
      )}
      {editRow && (
        <EmailAddressEditModal row={editRow} onClose={() => setEditRow(null)} />
      )}
      {deleteId !== null && (
        <EmailAddressDeleteModal rowId={deleteId} onClose={() => setDeleteId(null)} />
      )}
    </>
  );
}
