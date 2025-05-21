"use client";
import DocumentCard from "@/components/documents/DocumentCard";
import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TOP_ENTITIES, GET_DOCUMENTS } from "@/graphql/queries/queries";
import { Document } from "@/graphql/generated/graphql";
import { useParams } from "next/navigation";


export default function Documents() {
    const params = useParams();
    const topicId = params?.topic_id;
    // Queries
    const { data: documentsData, loading: documentsLoading, error: documentsError } = useQuery(GET_DOCUMENTS, {
        variables: { filterOptions: { topicId: topicId } },
        skip: !topicId,
    });
    const { data: entitiesData, loading: entitiesLoading, error: entitiesError } = useQuery(GET_TOP_ENTITIES);

    return (
        <div>
            <main className="p-7">
                <h1 className='font-extrabold text-5xl'>Documenten</h1>

                {documentsLoading && <p className="mt-4">Documenten laden...</p>}
                {documentsError && <p className="mt-4 text-red-600">Fout: {documentsError.message}</p>}

                {entitiesData && documentsData && (
                    <div className="mt-2 flex h-[70vh] gap-6">
                        <div className="w-1/4 overflow-y-auto">
                            {/* <Filter
                persons={entitiesData.topEntities.persons}
                organizations={entitiesData.topEntities.organizations}
                groups={entitiesData.topEntities.groups}
                showDateRange={false}
                onFilterChange={({ persons, organizations, groups, dateRange }) => {
                  setSelectedPersons(persons);
                  setSelectedOrganizations(organizations);
                  setSelectedGroups(groups);
                }}
              /> */}
                        </div>

                        <div className="flex-1 overflow-y-auto bg-white">
                            {documentsData.getDocuments.length > 0 ? (
                                documentsData.getDocuments.map((doc: Document) => (
                                    <DocumentCard key={doc.documentId} document={doc} />
                                ))
                            ) : (
                                <p className="mt-4 text-gray-600">Geen documenten gevonden.</p>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
