"use client";
import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import TimelineCard from "@/components/timeline/TimelineCard";
import { GET_TIMELINE_BY_SEARCH } from "@/graphql/queries/queries";

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
    <main className="flex h-screen">
      {/* Sidebar links */}
      <div className="w-1/3 p-7 overflow-y-auto border-r border-gray-300 bg-white">
        <h1 className="font-extrabold text-4xl mb-2">Tijdlijnen</h1>
        <p className="mb-6 text-gray-700">
          Zoek op een keyword om een tijdlijn van samenhangende relevante gebeurtenissen te maken.
        </p>

        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Bijv. Wuhan"
            className="w-full px-3 py-2 border border-gray-300 text-base focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
          />
          <button
            type="submit"
            className="mt-3 w-full px-4 py-2 bg-gray-400 text-lg font-bold hover:bg-gray-300"
          >
            Zoek
          </button>
        </form>

        {loading && <p className="text-gray-500">Tijdlijn laden...</p>}
        {error && <p className="text-red-600">Fout: {error.message}</p>}
      </div>

      {/* Timeline rechts */}
      <div className="flex-1 p-7 overflow-y-auto bg-gray-50">
        {data?.getTimelineByQuery?.length > 0 ? (
          <TimelineCard timeline={data.getTimelineByQuery} />
        ) : (
          !loading && <p className="text-gray-500">Geen resultaten gevonden.</p>
        )}
      </div>
    </main>
  );
}
