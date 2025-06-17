"use client";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";
import TimelineCard from "@/components/timeline/TimelineCard";
import Filter from "@/components/filter/Filter";
import { GET_TIMELINE, GET_ENTITIES, GET_TOPICS } from "@/graphql/queries/queries";
import { Event, FilterOptions } from "@/graphql/generated/graphql";

export default function Timelines() {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const [getTimeline, { loading, data, error }] = useLazyQuery(GET_TIMELINE);
  const { data: entitiesData } = useQuery(GET_ENTITIES);
  const { data: topicsData } = useQuery(GET_TOPICS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const filterOptions: FilterOptions = {
      query: searchTerm.trim() || undefined,
      persons: selectedPersons,
      organizations: selectedOrganizations,
      groups: selectedGroups,
      topics: selectedTopics,
    };

    getTimeline({
      variables: { filterOptions }
    });
  };

  return (
    <main className="flex h-screen">
      {/* Linkerzijde: zoek + filter */}
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

        {entitiesData && (
          <Filter
            persons={entitiesData.getEntities.persons}
            organizations={entitiesData.getEntities.organizations}
            groups={entitiesData.getEntities.groups}
            topics={topicsData.topics}
            selectedPersons={selectedPersons}
            selectedOrganizations={selectedOrganizations}
            selectedGroups={selectedGroups}
            showDateRange={true}
            showTopics={true}
            dateRange={dateRange}
            onFilterChange={({ persons, organizations, groups, dateRange, topics }) => {
              setSelectedPersons(persons);
              setSelectedOrganizations(organizations);
              setSelectedGroups(groups);
              setDateRange(dateRange);
              setSelectedTopics(topics);
            }}

            onApply={() => {
              const filterOptions: FilterOptions = {
                query: searchTerm.trim() || undefined,
                persons: selectedPersons,
                organizations: selectedOrganizations,
                groups: selectedGroups,
                startDate: dateRange.from?.toISOString().split("T")[0],
                endDate: dateRange.to?.toISOString().split("T")[0],
                topics: selectedTopics,
              };
              
              getTimeline({
                variables: { filterOptions }
              });
            }}
          />
        )}
      </div>

      {/* Rechterzijde: Tijdlijn */}
      <div className="flex-1 p-7 overflow-y-auto bg-gray-50">
        {loading && <p className="text-gray-500 mt-4">Tijdlijn laden...</p>}
        {error && <p className="text-red-600 mt-4">Fout: {error.message}</p>}

        {data?.getTimeline?.length > 0 ? (
          <TimelineCard timeline={data.getTimeline as Event[]} />
        ) : (
          !loading && <p className="text-gray-500">Geen resultaten gevonden.</p>
        )}
      </div>
    </main>
  );
}
