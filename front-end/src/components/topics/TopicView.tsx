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

export default function TopicView({ topic_id, name, summary, persons, organizations, groups }: TopicViewProps) {
    return (
        <div>
            <div className="flex items-center justify-between m-6">
                <h1 className="font-extrabold text-4xl">{name}</h1>
                <div>
                    <Link href={`/topics/${topic_id}/timeline`}>
                        <button className="mr-3 px-4 py-2 bg-gray-400 text-lg font-bold hover:bg-gray-300">
                            Ga naar tijdlijn
                        </button>
                    </Link>
                    <Link href={`/topics/${topic_id}/documents`}>
                        <button className="px-4 py-2 bg-gray-400 text-lg font-bold hover:bg-gray-300">
                            Ga naar documenten
                        </button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 flex-1 overflow-y-auto">
                <div className="col-span-2 text-left ml-0 overflow-auto">
                    <h1 className="m-6 font-extrabold text-2xl">Samenvatting</h1>
                    <p className="m-6 text-justify whitespace-pre-line">{summary}</p>
                </div>
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