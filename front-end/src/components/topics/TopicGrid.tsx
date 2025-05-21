import React from 'react';
import TopicCard from './TopicCard';
import { Topic } from '@/graphql/generated/graphql';

interface TopicGridProps {
  topics: Topic[]
}

export default function TopicGrid({topics}: TopicGridProps) {
  return (
    <div>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
      {topics.map((topic) => (
        <TopicCard
          key={topic.topicId ?? ''}
          name={topic.name ?? ''} 
          topicId={topic.topicId ?? ''}
          />
      ))}
    </div>
    </div>
    
  );
};

