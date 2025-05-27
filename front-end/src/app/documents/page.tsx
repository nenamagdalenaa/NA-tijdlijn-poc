"use client";
import DocumentCard from "@/components/documents/DocumentCard";
import Filter from "@/components/filter/Filter";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_ENTITIES, GET_DOCUMENTS } from "../../graphql/queries/queries";
import { Document } from "@/graphql/generated/graphql";

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const [getDocuments, { loading, data, error }] = useLazyQuery(GET_DOCUMENTS);
  const { data: entitiesData, loading: entitiesLoading, error: entitiesError } = useQuery(GET_ENTITIES);

  const documents = data?.getDocuments ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const filterOptions: any = {
      query: searchTerm.trim() || undefined,
      persons: selectedPersons,
      organizations: selectedOrganizations,
      groups: selectedGroups,
    };

    getDocuments({
      variables: { filterOptions }
    });
  };

  return (
    <main className="flex h-screen">
      {/* Linkerzijde: Titel, beschrijving, zoekveld, filters */}
      <div className="w-1/3 p-7 overflow-y-auto border-r border-gray-300 bg-white">
        <h1 className="font-extrabold text-4xl mb-2">Zoek in documenten</h1>
        <p className="mb-6 text-gray-700">Zoek op een keyword om naar samenhangende documenten te zoeken.</p>

        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Bijv. vaccinaties"
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
            showDateRange={false}
            selectedPersons={selectedPersons}
            selectedOrganizations={selectedOrganizations}
            selectedGroups={selectedGroups}
            onFilterChange={({ persons, organizations, groups }) => {
              setSelectedPersons(persons);
              setSelectedOrganizations(organizations);
              setSelectedGroups(groups);
            }}
            onApply={() => {
              const filterOptions: any = {
                query: searchTerm.trim() || undefined,
                persons: selectedPersons,
                organizations: selectedOrganizations,
                groups: selectedGroups,
              };

              getDocuments({
                variables: { filterOptions }
              });
            }}
          />
        )}
      </div>

      <div className="flex-1 p-7 overflow-y-auto bg-gray-50">
        {loading && <p className="mt-4">Documenten laden...</p>}
        {error && <p className="mt-4 text-red-600">Fout: {error.message}</p>}

        {data && documents.length > 0 && (
          documents.map((doc: Document) => (
            <DocumentCard key={doc.documentId} document={doc} />
          ))
        )}
      </div>
    </main>
  );
}
