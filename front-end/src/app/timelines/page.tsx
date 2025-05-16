'use client';
import TimelineCard from "@/components/timeline/TimelineCard";
import { gql, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";

const GET_TIMELINE_BY_QUERY = gql`
  query GetTimelineForQuery($query: String!) {
    getTimelineForQuery(query: $query) {
      document {
        document_id
        sourceurl
      }
      date
      description
    }
  }
`;

export default function Timelines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDocuments, { loading, data, error }] = useLazyQuery(GET_TIMELINE_BY_QUERY);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchDocuments({
      variables: {
        query: searchTerm,
      },
    });
  };

  return (
    <div>
      <main className="m-6 p-7 flex flex-col h-[90vh]">
        <h1 className='font-extrabold text-5xl'>Tijdlijnen</h1>
        <p className="mt-5">Zoek op een keyword om een tijdlijn van samenhangende relevante gebeurtenissen te maken.</p>

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

        <div className="flex-1 overflow-y-auto rounded-lg p-4 bg-white mt-6">
          {data && data.getTimelineForQuery.length > 0 && (
            <TimelineCard timeline={data.getTimelineForQuery} />
          )}
          {data && data.getTimelineForQuery.length === 0 && (
            <p className="mt-4 text-gray-500">Geen resultaten gevonden.</p>
          )}
        </div>
      </main>
    </div>
  );
}
