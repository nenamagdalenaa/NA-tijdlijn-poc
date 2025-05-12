"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import TopicCard from './TopicCard';

interface Topic {
  topic_id: string;
  name: string;
  summary: string;
  top_words: string;
}

interface TopicsData {
  topics: Topic[];
}

const GET_TOPICS = gql`
  query GetTopics {
    topics {
      topic_id
      name
      summary
      top_words
    }
  }
`;

const TopicGrid = () => {
  const { data, loading, error } = useQuery<TopicsData>(GET_TOPICS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data?.topics) return <div>No topics found.</div>;

  return (
    <div>
      <h1 className='p-3 font-extrabold text-5xl'>Onderwerpen</h1>
      <h1 className='p-3'>Klik op een onderwerp voor meer informatie over dat onderwerp.</h1>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
      {data.topics.map((topic) => (
        <TopicCard
          key={topic.topic_id}
          name={topic.name} 
          topic_id={topic.topic_id}
          summary={topic.summary}        
          />
      ))}
    </div>
    </div>
    
  );
};

export default TopicGrid;
