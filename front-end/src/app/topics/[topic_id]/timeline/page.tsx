"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import TimelineCard from "@/components/timeline/TimelineCard";
import Filter from "@/components/filter/Filter";
import { GET_TOPIC_BY_ID, GET_TOP_ENTITIES_BY_TOPIC, GET_TIMELINE_BY_TOPIC_ID } from "../../../../graphql/queries/queries";

const TimelinePage = () => {
  const params = useParams();
  const topic_id = params?.topic_id;

  // State voor filters
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Query met filters
  const { data: timelineData, loading: timelineLoading, error: timelineError, refetch } = useQuery(GET_TIMELINE_BY_TOPIC_ID, {
    variables: {
      topic_id,
      persons: selectedPersons.length > 0 ? selectedPersons : null,
      organizations: selectedOrganizations.length > 0 ? selectedOrganizations : null,
      groups: selectedGroups.length > 0 ? selectedGroups : null,
      startDate,
      endDate,
    },
    skip: !topic_id,
  });

  // Topic en entities
  const { data: topicData, loading: topicLoading, error: topicError } = useQuery(GET_TOPIC_BY_ID, {
    variables: { id: topic_id },
    skip: !topic_id,
  });

  const { data: entitiesData, loading: entitiesLoading, error: entitiesError } = useQuery(GET_TOP_ENTITIES_BY_TOPIC, {
    variables: { topic_id },
    skip: !topic_id,
  });

  const handleFilterChange = (type: string, values: string[] | { startDate: string; endDate: string }) => {
    if (type === "persons") setSelectedPersons(values as string[]);
    if (type === "organizations") setSelectedOrganizations(values as string[]);
    if (type === "groups") setSelectedGroups(values as string[]);
    if (type === "date") {
      const { startDate, endDate } = values as { startDate: string; endDate: string };
      setStartDate(startDate);
      setEndDate(endDate);
    }

    // Refetch data met nieuwe filters
    refetch();
  };

  if (topicLoading || entitiesLoading) return <p>Onderwerpen laden...</p>;
  if (entitiesError) return <p>Fout: {entitiesError.message}</p>;
  if (timelineError) return <p>Fout: {timelineError.message}</p>;
  if (topicError) return <p>Fout: {topicError.message}</p>;
  if (timelineLoading) return <p>Tijdlijn laden...</p>;

  const { name } = topicData.topic;

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Sticky header */}
      <h1 className="text-4xl font-bold mb-6 sticky top-0 bg-white z-10">
        Tijdlijn: {name}
      </h1>

      {/* Flex-container voor de filter en de tijdlijn */}
      <div className="flex flex-row gap-4 flex-1 overflow-y-auto">
        {/* Filter component */}
        <div className="w-1/3 bg-white p-4 overflow-y-auto">
          <Filter
            persons={entitiesData.topEntitiesByTopic.persons}
            organizations={entitiesData.topEntitiesByTopic.organizations}
            groups={entitiesData.topEntitiesByTopic.groups}
            onFilterChange={({ persons, organizations, groups, dateRange }) => {
              setSelectedPersons(persons);
              setSelectedOrganizations(organizations);
              setSelectedGroups(groups);
              setStartDate(dateRange.from ? dateRange.from.toISOString().split("T")[0] : null);
              setEndDate(dateRange.to ? dateRange.to.toISOString().split("T")[0] : null);
              refetch({
                topic_id,
                persons,
                organizations,
                groups,
                startDate: dateRange.from ? dateRange.from.toISOString().split("T")[0] : null,
                endDate: dateRange.to ? dateRange.to.toISOString().split("T")[0] : null,
              });
            }}
          />

        </div>

        {/* Scrollbare TimelineCard */}
        <div className="flex-1 overflow-y-auto rounded-lg p-4 bg-white">
          <TimelineCard
            timeline={timelineData.getTimelineForTopic}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
