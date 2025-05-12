import React from 'react';
import TopicStats from './TopicStats';
import Link from 'next/link';

interface TopicViewProps {
    topic_id: string;
    name: string;
    summary: string;
    persons?: Array<{ id: string; name: string; count: number }>;
    organizations?: Array<{ id: string; name: string; count: number }>;
    groups?: Array<{ id: string; name: string; count: number }>;
}

console.log(TopicStats);

const TopicView: React.FC<TopicViewProps> = ({ topic_id, name, summary, persons, organizations, groups }) => {
    return (
        <div>
            {/* Flex-container voor de titel en de knop */}
            <div className="flex items-center justify-between m-6">
                <h1 className="font-extrabold text-5xl">{name}</h1>
                <Link href={`/topics/${topic_id}/timeline`}>
                    <button className="px-4 py-2 bg-[#bedbff] text-lg font-bold rounded hover:bg-[#467ac1] hover:text-white transition">
                        Ga naar tijdlijn
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {/* Linkerkant */}
                <div className="col-span-2 text-left ml-0 overflow-auto">
                    <h1 className="m-6 font-extrabold text-2xl">Samenvatting</h1>
                    <p className="m-6 text-justify whitespace-pre-line">{summary}</p>
                </div>
            

                {/* Rechterkant */}
                <div className="col-span-1 text-right mr-0">
                    <TopicStats 
                    persons={persons} 
                    organizations={organizations} 
                    groups={groups} />
                     
                </div>
               
            </div>
            
        </div>
    );
};

export default TopicView;