"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import TimelineCard from "@/components/timeline/TimelineCard";

const GET_TOPIC_BY_ID = gql`
  query GetTopicById($id: ID!) {
    topic(id: $id) {
      name    }
  }
`;

const GET_TIMELINE = gql`
  query GetTimelineForTopic($topic_id: ID!) {
    getTimelineForTopic(topic_id: $topic_id) {
      document {
        document_id
        sourceurl
      }
      date
      description
    }
  }
`;

const TimelinePage = () => {
  const params = useParams();
  const topic_id = params?.topic_id;

  const { data: timelineData, loading: timelineLoading, error: timelineError } = useQuery(GET_TIMELINE, {
    variables: { topic_id },
    skip: !topic_id,
  });

  const { data: topicData, loading: topicLoading, error: topicError } = useQuery(GET_TOPIC_BY_ID, {
      variables: { id: topic_id },
      skip: !topic_id,
    });

  if (timelineLoading) return <p>Tijdlijn laden...</p>;
  if (timelineError) return <p>Fout: {timelineError.message}</p>;

  const { name } = topicData.topic;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4"><span className="text-[#467ac1]">Tijdlijn: </span>{name}</h1>
      <div className="overflow-y-auto">
      <TimelineCard timeline={timelineData.getTimelineForTopic} />
      </div>
    </div>
  );
};

export default TimelinePage;
