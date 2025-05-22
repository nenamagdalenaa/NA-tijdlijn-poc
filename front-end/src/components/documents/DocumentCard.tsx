"use client";

import React from "react";
import { Document } from "@/graphql/generated/graphql";

interface DocumentCardProps {
  document: Document;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="bg-[#e6effa] p-4 shadow mb-4 relative">
      {/* Header: titel + knoppen rechtsboven */}
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-xl">{document.title}</h2>
        <div className="flex gap-2">
          {document.sourceUrl && (
            <a
              href={document.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-sm font-semibold hover:bg-gray-200"
            >
              Document
              <ExternalLinkIcon />
            </a>
          )}
          {document.dossier?.sourceUrl && (
            <a
              href={document.dossier.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-sm font-semibold hover:bg-gray-200"
            >
              Dossier
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>

      {/* Datum */}
      <p className="text-gray-600">
        <strong>
          {document.scrapedDate
            ? new Date(parseInt(document.scrapedDate)).toLocaleDateString("nl-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            : "Geen datum"}
        </strong>
      </p>

      {/* Samenvatting */}
      <p className="mt-2 text-gray-600 italic">{document.summary}</p>

      {/* Dossier info */}
      {document.dossier && (
        <div className="mt-3 text-sm text-gray-700">
          <p><strong>Uit dossier: </strong>{document.dossier.title}</p>
        </div>
      )}

      {/* Onderste regel: tooltip links onderin */}
      <div className="mt-4 flex justify-start">
        <div className="relative group inline-block">
          <div className="px-2 py-1 bg-gray-300 text-sm font-bold cursor-pointer hover:bg-gray-200">
            ℹ️ Info
          </div>
          <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white border border-gray-300 shadow-lg p-3 w-64 z-10 text-sm text-gray-800">
            <p className="font-semibold mb-2">Topic informatie</p>
            <ul className="list-disc pl-5">
              {document.topics.map((topic, index) => (
                <li key={topic.topicId ?? index}>
                  <strong>{topic.name}</strong>:{" "}
                  {topic.probability != null
                    ? `${(topic.probability * 100).toFixed(1)}%`
                    : "Onbekend"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔗 External link icon component
function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 13.5V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V8.25A2.25 2.25 0 016.75 6h4.5M15 3h6m0 0v6m0-6L10.5 13.5"
      />
    </svg>
  );
}
