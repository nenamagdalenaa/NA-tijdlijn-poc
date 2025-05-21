import React, { useState } from 'react';
import DateRangeFilter from './DateFilter';

type FilterProps = {
    persons?: Array<{ id: string; name: string; }>;
    organizations?: Array<{ id: string; name: string; }>;
    groups?: Array<{ id: string; name: string; }>;
    showDateRange?: boolean;
    onFilterChange?: (filters: { persons: string[]; organizations: string[]; groups: string[]; dateRange: { from: Date | null; to: Date | null; }; }) => void;
};

export default function Filter({ persons, organizations, groups, showDateRange, onFilterChange }: FilterProps) {
    const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
    const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
        from: null,
        to: null,
    });

    const handleApplyFilters = () => {
        onFilterChange?.({
            persons: selectedPersons,
            organizations: selectedOrganizations,
            groups: selectedGroups,
            dateRange,
        });
    };

    return (
        <div className='bg-[#e6effa] p-4 rounded-lg shadow-md'>
            <h2 className="text-xl font-bold mb-2">Filter</h2>
            <h2 className="text-md font-bold mb-1">Personen</h2>
            {persons?.map((person, idx) => {
                const personId = person.id ?? String(idx);
                return (
                    <div key={personId}>
                        <input
                            type="checkbox"
                            id={`person-${personId}`}
                            value={personId}
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                            checked={selectedPersons.includes(personId)}
                            onChange={(e) => {
                                const updated = e.target.checked
                                    ? [...selectedPersons, personId]
                                    : selectedPersons.filter(id => id !== personId);
                                setSelectedPersons(updated);
                            }}
                        />
                        <label htmlFor={`person-${personId}`} className="ml-2">{person.name}</label>
                    </div>
                );
            })}
            <h2 className="text-md font-bold mb-1 mt-2">Organisaties</h2>
            {organizations?.map((org, idx) => {
                const orgId = org.id ?? String(idx);
                return (
                    <div key={orgId}>
                        <input
                            type="checkbox"
                            id={`organization-${orgId}`}
                            value={orgId}
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                            checked={selectedOrganizations.includes(orgId)}
                            onChange={(e) => {
                                const updated = e.target.checked
                                    ? [...selectedOrganizations, orgId]
                                    : selectedOrganizations.filter(id => id !== orgId);
                                setSelectedOrganizations(updated);
                            }}
                        />
                        <label htmlFor={`organization-${orgId}`} className="ml-2">{org.name}</label>
                    </div>
                );
            })}
            <h2 className="text-md font-bold mb-1 mt-2">Bevolkingsgroepen</h2>
            {groups?.map((group, idx) => {
                const groupId = group.id ?? String(idx);
                return (
                    <div key={groupId}>
                        <input
                            type="checkbox"
                            id={`group-${groupId}`}
                            value={groupId}
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                            checked={selectedGroups.includes(groupId)}
                            onChange={(e) => {
                                const updated = e.target.checked
                                    ? [...selectedGroups, groupId]
                                    : selectedGroups.filter(id => id !== groupId);
                                setSelectedGroups(updated);
                            }}
                        />
                        <label htmlFor={`group-${groupId}`} className="ml-2">{group.name}</label>
                    </div>
                );
            })}

            {showDateRange && (
                <><h2 className="text-md font-bold mt-2">Datum</h2><div className="mt-2">
                    <DateRangeFilter from={dateRange.from} to={dateRange.to} onChange={setDateRange} />
                </div></>
            )}

            <button
                onClick={handleApplyFilters}
                className="mt-6 mb-2 p-2 bg-[#bedbff] font-bold rounded hover:bg-[#467ac1] hover:text-white transition">
                Toepassen
            </button>
        </div>
    );
};
