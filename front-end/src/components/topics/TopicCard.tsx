import Link from 'next/link';
import React from 'react';

interface TopicCardProps {
    topicId: string
    name: string;
}

export default function TopicCard({ topicId, name }: TopicCardProps) {
    return (
        <Link href={`/topics/${topicId}`}>
            <div className="topic-card h-full w-130 bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)] p-2 flex text-center flex-col gap-2 text-wrap hover:bg-[#e6effa]">
                <h2 className='p-2 font-bold text-lg flex items-center justify-center h-full'>{name}</h2>
            </div>
        </Link>
    );
};
