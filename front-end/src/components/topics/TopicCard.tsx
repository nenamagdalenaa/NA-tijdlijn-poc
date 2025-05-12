import Link from 'next/link';
import React from 'react';

interface TopicCardProps {
    topic_id: string;
    name: string;
    summary: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic_id, name, summary }) => {
    return (
        <Link href={`/topics/${topic_id}`}>
            <div className="topic-card h-full w-130 bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)] rounded-lg p-4 flex text-center flex-col gap-2 text-wrap hover:bg-[#467ac1] hover:text-white transition duration-300 ease-in-out">
                <h2 className='p-2 font-bold text-lg flex items-center justify-center h-full'>{name}</h2>
            </div>
        </Link>
    );
};

export default TopicCard;