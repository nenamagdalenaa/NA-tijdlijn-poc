"use client";
import DocumentCard from "@/components/documents/DocumentCard";
import { gql, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";

const SEARCH_DOCUMENTS = gql`
query SearchDocuments($searchQuery: String!) {
  searchDocuments(query: $searchQuery) {
    document_id
    title
    summary
    sourceurl
    dossier {
      dossier_id
      title
      sourceurl
    }
  }
}
  `


export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDocuments, { loading, data, error }] = useLazyQuery(SEARCH_DOCUMENTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      searchDocuments({ variables: { searchQuery: searchTerm } });
    }
  };

  return (
    <div>
      <main className="m-6 p-7">
        <h1 className='font-extrabold text-5xl'>Zoek in documenten</h1>
        <p className="mt-5">Zoek op een keyword om naar samenhangende documenten te zoeken.</p>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Bijv. vaccinaties"
            className="mt-6 px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#bedbff] focus:border-[#bedbff] w-[40%]"
          />
          <button
            type="submit"
            className="ml-3 px-4 py-2 bg-[#bedbff] text-lg font-bold rounded hover:bg-[#467ac1] hover:text-white transition"
          >
            Zoek
          </button>
        </form>

        {loading && <p className="mt-4">Laden...</p>}
        {error && <p className="mt-4 text-red-600">Fout: {error.message}</p>}

        {data?.searchDocuments?.length > 0 && (
          <div className="mt-6 space-y-4">
            {data.searchDocuments.map((doc: any) => (
              <DocumentCard key={doc.document_id} doc={doc} />
            ))}
          </div>
        )}

        {data?.searchDocuments?.length === 0 && (
          <p className="mt-4 text-gray-600">Geen documenten gevonden.</p>
        )}
      </main>
    </div>
  );
}