import Link from 'next/link';
import React from 'react';

interface TopicCardProps {
  topicId: string;
  name: string;
}

export default function TopicCard({ topicId, name }: TopicCardProps) {
  return (
    <Link href={`/topics/${topicId}`} passHref>
      <div className="topic-card bg-gray-300 p-4 hover:bg-gray-200 transition shadow-sm w-full h-full flex items-center justify-center text-center break-words">
        <h2 className="font-bold text-lg">{name}</h2>
      </div>
    </Link>
  );
}
