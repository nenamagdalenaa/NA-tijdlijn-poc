import React from "react";
import { Document } from "@/graphql/generated/graphql";

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="bg-[#e6effa] p-4 rounded-md shadow mb-4">
      <h2 className="font-bold text-xl">{document.title}</h2>
      <p className="text-gray-600 italic">{document.summary}</p>
      <a
        href={document.sourceurl ?? ''}
        className="text-blue-500 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bekijk document
      </a>

      {document.dossier && (
        <div className="mt-2 text-sm text-gray-700">
          <p>Afkomstig uit dossier: {document.dossier.title}</p>
          {document.dossier.sourceurl && (
            <a
              href={document.dossier.sourceurl}
              className="text-blue-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Naar dossier
            </a>
          )}
        </div>
      )}
    </div>
  );
};
