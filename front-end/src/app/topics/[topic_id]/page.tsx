"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import TopicView from '@/components/topics/TopicView';
import { GET_ENTITIES_BY_TOPIC, GET_TOPIC } from '../../../graphql/queries/queries';

const TopicPage = () => {
  const params = useParams();
  const topicId = params?.topic_id as string;

  if (!topicId) return <div>Loading topic...</div>;

  const { data: topicData, loading: topicLoading, error: topicError } = useQuery(GET_TOPIC, {
    variables: { topicId: topicId },
    skip: !topicId,
  });

  const { data: entitiesData, loading: entitiesLoading, error: entitiesError } = useQuery(GET_ENTITIES_BY_TOPIC, {
    variables: { topicId },
    skip: !topicId,
  });

  if (topicLoading || entitiesLoading) return <div>Loading...</div>;
  if (topicError) return <div>Error loading topic: {topicError.message}</div>;
  if (entitiesError) return <div>Error loading entities: {entitiesError.message}</div>;

  const { name, summary } = topicData.topic;
  const { persons, organizations, groups } = entitiesData.topEntitiesByTopic;

  return (
    <div className="p-4">
      <TopicView
        topic_id={topicId}
        name={name}
        summary={summary}
        persons={persons}
        organizations={organizations}
        groups={groups}
      />
    </div>
  );
};

export default TopicPage;
