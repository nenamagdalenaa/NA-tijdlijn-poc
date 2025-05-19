import React from "react";

type Dossier = {
  dossier_id: string;
  title: string;
  sourceurl?: string;
};

type Document = {
  document_id: string;
  title: string;
  summary: string;
  sourceurl: string;
  dossier?: Dossier | null;
};

const DocumentCard: React.FC<{ doc: Document }> = ({ doc }) => {
  return (
    <div className="bg-[#e6effa] p-4 rounded-md shadow mb-4">
      <h2 className="font-bold text-xl">{doc.title}</h2>
      <p className="text-gray-600 italic">{doc.summary}</p>
      <a
        href={doc.sourceurl}
        className="text-blue-500 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bekijk document
      </a>

      {doc.dossier && (
        <div className="mt-2 text-sm text-gray-700">
          <p>Afkomstig uit dossier: {doc.dossier.title}</p>
          {doc.dossier.sourceurl && (
            <a
              href={doc.dossier.sourceurl}
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

export default DocumentCard;