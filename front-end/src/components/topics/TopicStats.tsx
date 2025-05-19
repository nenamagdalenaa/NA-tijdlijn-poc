import React from 'react';
import { EntityCount } from '@/graphql/generated/graphql';

interface TopicStatsProps {
  persons?: EntityCount[];
  organizations?: EntityCount[];
  groups?: EntityCount[];
}

export default function TopicStats({ persons, organizations, groups }: TopicStatsProps) {
  return (
    <div className="m-4 p-6 bg-[#e6effa] rounded-lg shadow-md text-left">
      <h2 className="font-bold text-2xl mb-6">Top Entiteiten</h2>

      {persons && persons.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Personen</h3>
          <ul className="list-disc list-inside">
            {persons.map((person, index) => (
              <li key={index} className="mb-1">
                <span className="font-medium">{person.name}</span> ({person.count})
              </li>
            ))}
          </ul>
        </div>
      )}

      {organizations && organizations.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Organisaties</h3>
          <ul className="list-disc list-inside text-gray-600">
            {organizations.map((organization, index) => (
              <li key={index} className="mb-1">
                <span className="font-medium">{organization.name}</span> ({organization.count})
              </li>
            ))}
          </ul>
        </div>
      )}

      {groups && groups.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Bevolkingsgroepen</h3>
          <ul className="list-disc list-inside text-gray-600">
            {groups.map((group, index) => (
              <li key={index} className="mb-1">
                <span className="font-medium">{group.name}</span> ({group.count})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};