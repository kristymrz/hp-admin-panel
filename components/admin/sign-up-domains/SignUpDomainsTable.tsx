"use client";

import { useState } from "react";
import SignUpDomainEditModal from "./SignUpDomainEditModal";
import SignUpDomainDeleteModal from "./SignUpDomainDeleteModal";
import SignUpDomainCreateModal from "./SignUpDomainCreateModal";

export type SignUpDomainRow = {
  id: number;
  created_datetime_utc: string;
  apex_domain: string;
};

type Props = {
  domains: SignUpDomainRow[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function SignUpDomainsTable({ domains }: Props) {
  const [editRow, setEditRow] = useState<SignUpDomainRow | null>(null);
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
          Add Domain
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
                Apex Domain
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Created
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {domains.map((row, i) => (
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
                  {row.apex_domain}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap text-xs">
                  {formatDate(row.created_datetime_utc)}
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
        <SignUpDomainCreateModal onClose={() => setShowCreate(false)} />
      )}
      {editRow && (
        <SignUpDomainEditModal domain={editRow} onClose={() => setEditRow(null)} />
      )}
      {deleteId !== null && (
        <SignUpDomainDeleteModal domainId={deleteId} onClose={() => setDeleteId(null)} />
      )}
    </>
  );
}
