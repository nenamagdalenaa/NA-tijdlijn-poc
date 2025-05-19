"use client";
import DocumentCard from "@/components/documents/DocumentCard";
import Filter from "@/components/filter/Filter";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { GET_TOP_ENTITIES, GET_DOCUMENTS_BY_QUERY } from "../../graphql/queries/queries";

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");

  // State voor filters
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // Queries
  const [searchDocuments, { loading, data, error }] = useLazyQuery(GET_DOCUMENTS_BY_QUERY);
  const { data: entitiesData, loading: entitiesLoading, error: entitiesError } = useQuery(GET_TOP_ENTITIES);

  const searchResults = data?.searchDocuments ?? [];

  // Gefilterde documenten op basis van filters
  const filteredDocuments = useMemo(() => {
    if (!data?.searchDocuments) return [];

    return data.searchDocuments.filter((doc: any) => {
      const matchesPerson = selectedPersons.length === 0 || doc.persons.some((p: any) => selectedPersons.includes(p.person_id));
      const matchesOrganization = selectedOrganizations.length === 0 || doc.organizations.some((o: any) => selectedOrganizations.includes(o.organization_id));
      const matchesGroup = selectedGroups.length === 0 || doc.groups.some((g: any) => selectedGroups.includes(g.group_id));

      return matchesPerson && matchesOrganization && matchesGroup;
    });
  }, [data?.searchDocuments, selectedPersons, selectedOrganizations, selectedGroups]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      searchDocuments({ variables: { searchQuery: searchTerm } });
    }
  };

  return (
    <div>
      <main className="p-7">
        <h1 className='font-extrabold text-5xl'>Zoek in documenten</h1>
        <p className="mt-2">Zoek op een keyword om naar samenhangende documenten te zoeken.</p>

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

        {loading && <p className="mt-4">Documenten laden...</p>}
        {error && <p className="mt-4 text-red-600">Fout: {error.message}</p>}

        {entitiesData && filteredDocuments.length > 0 && (
          <div className="mt-2 flex h-[70vh] gap-6">
            <div className="w-1/4 overflow-y-auto">
              <Filter
                persons={entitiesData.topEntities.persons}
                organizations={entitiesData.topEntities.organizations}
                groups={entitiesData.topEntities.groups}
                showDateRange={false}
                onFilterChange={({ persons, organizations, groups, dateRange }) => {
                  setSelectedPersons(persons);
                  setSelectedOrganizations(organizations);
                  setSelectedGroups(groups);
                }}
              />
            </div>

            <div className="flex-1 overflow-y-auto bg-white">
              {filteredDocuments.map((doc: any) => (
                <DocumentCard key={doc.document_id} doc={doc} />
              ))}
            </div>
          </div>
        )}

        {data?.searchDocuments?.length === 0 && (
          <p className="mt-4 text-gray-600">Geen documenten gevonden.</p>
        )}
      </main>
    </div>
  );
}
