"use client";
import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import TimelineCard from "@/components/timeline/TimelineCard";
import { GET_TIMELINE_BY_SEARCH } from '../../graphql/queries/queries';

export default function Timelines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeline, { loading, data, error }] = useLazyQuery(GET_TIMELINE_BY_SEARCH);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      searchTimeline({ variables: { query: searchTerm } });
    }
  };

  return (
    <div>
      <main className="p-7 flex flex-col h-[90vh]">
        <h1 className="font-extrabold text-5xl">Tijdlijnen</h1>
        <p className="mt-2">
          Zoek op een keyword om een tijdlijn van samenhangende relevante gebeurtenissen te maken.
        </p>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Bijv. Wuhan"
            className="mt-6 px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#bedbff] focus:border-[#bedbff] w-[40%]"
          />
          <button
            type="submit"
            className="ml-3 px-4 py-2 bg-[#bedbff] text-lg font-bold rounded hover:bg-[#467ac1] hover:text-white transition"
          >
            Zoek
          </button>
        </form>

        {loading && <p className="mt-4">Tijdlijn laden...</p>}
        {error && <p className="mt-4 text-red-600">Fout: {error.message}</p>}

        <div className="flex-1 overflow-y-auto p-3">
          {data?.getTimelineByQuery.length > 0 ? (
            <TimelineCard timeline={data.getTimelineByQuery} />
          ) : (
            !loading && <p className="mt-4 text-gray-500">Geen resultaten gevonden.</p>
          )}
        </div>
      </main>
    </div>
  );
}
