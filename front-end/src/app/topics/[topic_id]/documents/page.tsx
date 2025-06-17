"use client";
import DocumentCard from "@/components/documents/DocumentCard";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_ENTITIES, GET_DOCUMENTS, GET_TOPIC } from "@/graphql/queries/queries";
import { Document } from "@/graphql/generated/graphql";
import { useParams } from "next/navigation";
import Filter from "@/components/filter/Filter";


export default function Documents() {
    const params = useParams();
    const topicId = params?.topic_id;

    const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
    const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    // Queries
    const { data: documentsData, loading: documentsLoading, error: documentsError, refetch } = useQuery(GET_DOCUMENTS, {
        variables: { filterOptions: { topicId: topicId } },
        skip: !topicId,
    });
    const { data: entitiesData } = useQuery(GET_ENTITIES);
    const { data: topicData } = useQuery(GET_TOPIC, {
        variables: { topicId: topicId },
        skip: !topicId,
    });

    const handleApplyFilters = () => {
        refetch({
            filterOptions: {
                topicId: topicId,
                persons: selectedPersons,
                organizations: selectedOrganizations,
                groups: selectedGroups,
            },
        });
    };

    const topicName = topicData?.topic.name || "";

    return (
        <div>
            <main className="p-7">
                <h1 className='font-extrabold text-3xl mb-4'>Documenten: {topicName}</h1>

                {documentsLoading && <p className="mt-4">Documenten laden...</p>}
                {documentsError && <p className="mt-4 text-red-600">Fout: {documentsError.message}</p>}

                {entitiesData && documentsData && (
                    <div className="mt-2 flex h-screen gap-6">
                        <div className="w-1/4 overflow-y-auto">
                            <Filter
                                persons={entitiesData.getEntities.persons}
                                organizations={entitiesData.getEntities.organizations}
                                groups={entitiesData.getEntities.groups}
                                selectedPersons={selectedPersons}
                                selectedOrganizations={selectedOrganizations}
                                selectedGroups={selectedGroups}
                                showDateRange={false}
                                showTopics={false}
                                onFilterChange={({ persons, organizations, groups }) => {
                                    setSelectedPersons(persons);
                                    setSelectedOrganizations(organizations);
                                    setSelectedGroups(groups);
                                }}
                                onApply={handleApplyFilters}
                            />
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
