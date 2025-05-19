"use client";
import TimelineCard from "@/components/timeline/TimelineCard";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import Filter from "@/components/filter/Filter";
import { GET_TOP_ENTITIES, GET_TIMELINE_BY_SEARCH } from '../../graphql/queries/queries';

export default function Timelines() {
  const [searchTerm, setSearchTerm] = useState("");

  // State filters
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Queries
  const [searchTimeline, { loading, data, error }] = useLazyQuery(GET_TIMELINE_BY_SEARCH);
  const { data: entitiesData, loading: entitiesLoading, error: entitiesError } = useQuery(GET_TOP_ENTITIES);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      searchTimeline({ variables: { query: searchTerm } });
    }
  };

  // Gefilterde tijdlijn-items
  const filteredTimeline = useMemo(() => {
    if (!data?.getTimelineForQuery) return [];

    return data.getTimelineForQuery.filter((item: any) => {
      const doc = item.document;

      const matchesPerson =
        selectedPersons.length === 0 ||
        doc.persons.some((p: any) => selectedPersons.includes(p.person_id));
      const matchesOrganization =
        selectedOrganizations.length === 0 ||
        doc.organizations.some((o: any) => selectedOrganizations.includes(o.organization_id));
      const matchesGroup =
        selectedGroups.length === 0 ||
        doc.groups.some((g: any) => selectedGroups.includes(g.group_id));

      let matchesDate = true;
      if (startDate) matchesDate = matchesDate && item.date >= startDate;
      if (endDate) matchesDate = matchesDate && item.date <= endDate;

      return matchesPerson && matchesOrganization && matchesGroup && matchesDate;
    });
  }, [data?.getTimelineForQuery, selectedPersons, selectedOrganizations, selectedGroups, startDate, endDate]);

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

        <div className="flex flex-row gap-4 flex-1 overflow-y-auto">
          {data && filteredTimeline.length > 0 && entitiesData && (
            <>
              <div className="w-1/3 bg-white p-4 overflow-y-auto">
                <Filter
                  persons={entitiesData.topEntities.persons}
                  organizations={entitiesData.topEntities.organizations}
                  groups={entitiesData.topEntities.groups}
                  showDateRange={true}
                  onFilterChange={({ persons, organizations, groups, dateRange }) => {
                    setSelectedPersons(persons);
                    setSelectedOrganizations(organizations);
                    setSelectedGroups(groups);
                    setStartDate(dateRange?.from ? dateRange.from.toISOString().split("T")[0] : null);
                    setEndDate(dateRange?.to ? dateRange.to.toISOString().split("T")[0] : null);
                  }}
                />
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                <TimelineCard timeline={filteredTimeline} />
              </div>
            </>
          )}

          {data && filteredTimeline.length === 0 && (
            <p className="mt-4 text-gray-500">Geen resultaten gevonden.</p>
          )}
        </div>
      </main>
    </div>
  );
}
