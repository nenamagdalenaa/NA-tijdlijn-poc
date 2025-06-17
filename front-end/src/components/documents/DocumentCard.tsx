"use client";

import React from "react";
import { Document } from "@/graphql/generated/graphql";
import ExternalLinkIcon from "./LinkIcon";

function getConfidenceColor(prob: number): 'red' | 'orange' | 'green' {
  if (prob >= 0.3) return 'green';
  if (prob >= 0.05) return 'orange';
  return 'red';
}

export default function DocumentCard({ document }: { document: Document }) {
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
            <div>
              <p className="font-semibold mb-1 underline">Entiteiten</p>
              <strong>Personen:</strong>{" "}
              {document?.persons?.map((p) => p.name).join(", ") || <em>Geen</em>} <br />
              <strong>Organisaties:</strong>{" "}
              {document?.organizations?.map((o) => o.name).join(", ") || <em>Geen</em>} <br />
              <strong>Bevolkingsgroepen:</strong>{" "}
              {document?.groups?.map((g) => g.name).join(", ") || <em>Geen</em>} <br />
            </div>
            <p className="font-semibold mt-2 mb-1 underline">Topic zekerheid</p>
            <ul className="list-disc pl-5">
              {document.topics.map((topic, index) => {
                const prob = topic.probability ?? 0;
                const color = getConfidenceColor(prob);

                return (
                  <li key={topic.topicId ?? index} className="flex items-center gap-2">
                    <strong>{topic.name}</strong>:
                    <span
                      className={`w-2.5 h-2.5 rounded-full inline-block ${color === 'green' ? 'bg-green-500' : color === 'orange' ? 'bg-orange-400' : 'bg-red-500'}`}
                      title={`Zekerheid: ${(prob * 100).toFixed(1)}%`}
                    />
                    <span>
                      {topic.probability != null
                        ? `(${(prob * 100).toFixed(1)}%)`
                        : "Onbekend"}
                    </span>
                  </li>
                );
              })}
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
};