"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery, gql } from '@apollo/client';
import TopicView from '@/components/topics/TopicView';


const GET_TOPIC_BY_ID = gql`
  query GetTopicById($id: ID!) {
    topic(id: $id) {
      name
      summary
    }
  }
`;

const GET_TOP_ENTITIES_BY_TOPIC = gql`
  query GetTopEntitiesByTopic($topic_id: ID!) {
    topEntitiesByTopic(topic_id: $topic_id) {
      persons {
        id
        name
        count
      }
      organizations {
        id
        name
        count
      }
      groups {
        id
        name
        count
      }
    }
  }
`;

const TopicPage = () => {
  const params = useParams();
  const topic_id = params?.topic_id as string;

  if (!topic_id) return <div>Loading topic...</div>;

  const { data: topicData, loading: topicLoading, error: topicError } = useQuery(GET_TOPIC_BY_ID, {
    variables: { id: topic_id },
    skip: !topic_id,
  });

  const { data: entitiesData, loading: entitiesLoading, error: entitiesError } = useQuery(GET_TOP_ENTITIES_BY_TOPIC, {
    variables: { topic_id },
    skip: !topic_id,
  });

  if (topicLoading || entitiesLoading) return <div>Loading...</div>;
  if (topicError) return <div>Error loading topic: {topicError.message}</div>;
  if (entitiesError) return <div>Error loading entities: {entitiesError.message}</div>;

  const { name, summary } = topicData.topic;
  const { persons, organizations, groups } = entitiesData.topEntitiesByTopic;

  return (
    <div className="p-4">
      <TopicView
        topic_id={topic_id}
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
