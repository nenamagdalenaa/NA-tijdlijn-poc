"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import TimelineCard from "@/components/timeline/TimelineCard";
import Filter from "@/components/filter/Filter";
import {
  GET_TOPIC,
  GET_ENTITIES,
  GET_TIMELINE,
} from "../../../../graphql/queries/queries";

const TimelinePage = () => {
  const params = useParams();
  const topicId = params?.topic_id;

  // State voor filters
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
    []
  );
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });

  const {
    data: timelineData,
    loading: timelineLoading,
    error: timelineError,
    refetch,
  } = useQuery(GET_TIMELINE, {
    variables: { filterOptions: { topicId: topicId } },
    skip: !topicId,
  });
  const { data: topicData, error: topicError } = useQuery(GET_TOPIC, {
    variables: { topicId: topicId },
    skip: !topicId,
  });
  const { data: entitiesData, error: entitiesError } = useQuery(GET_ENTITIES, {
    variables: { topicId },
    skip: !topicId,
  });

  const handleApplyFilters = () => {
    refetch({
      filterOptions: {
        topicId: topicId,
        persons: selectedPersons,
        organizations: selectedOrganizations,
        groups: selectedGroups,
        startDate: dateRange.from ? dateRange.from.toISOString() : null,
        endDate: dateRange.to ? dateRange.to.toISOString() : null,
      },
    });
  };

  if (entitiesError) return <p>Fout: {entitiesError.message}</p>;
  if (timelineError) return <p>Fout: {timelineError.message}</p>;
  if (topicError) return <p>Fout: {topicError.message}</p>;
  if (timelineLoading) return <p>Tijdlijn laden...</p>;

  const topicName = topicData?.topic.name || "";

  return (
    <div className="p-1 h-screen flex">
      <div className="w-1/3 p-7 overflow-y-auto border-r border-gray-300 bg-white">
        <h1 className="font-extrabold text-3xl mb-4">Tijdlijn: {topicName}</h1>
        <Filter
          persons={entitiesData.getEntities.persons}
          organizations={entitiesData.getEntities.organizations}
          groups={entitiesData.getEntities.groups}
          selectedPersons={selectedPersons}
          selectedOrganizations={selectedOrganizations}
          selectedGroups={selectedGroups}
          showDateRange={true}
          showTopics={false}
          dateRange={dateRange}
          onFilterChange={({ persons, organizations, groups, dateRange }) => {
            setSelectedPersons(persons);
            setSelectedOrganizations(organizations);
            setSelectedGroups(groups);
            setDateRange(dateRange);
          }}
          onApply={handleApplyFilters}
        />
      </div>
      <div className="flex-1 p-7 overflow-y-auto bg-gray-50">
        {timelineData.getTimeline && (
          <TimelineCard timeline={timelineData.getTimeline} />
        )}
      </div>
    </div>
  );
};

export default TimelinePage;
