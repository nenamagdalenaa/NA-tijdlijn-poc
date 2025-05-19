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
            {persons?.map(person => (
                <div key={person.id}>
                    <input
                        type="checkbox"
                        id={`person-${person.id}`}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedPersons.includes(person.id)}
                        onChange={(e) => {
                            const updated = e.target.checked
                                ? [...selectedPersons, person.id]
                                : selectedPersons.filter(id => id !== person.id);
                            setSelectedPersons(updated);
                        }}
                    />
                    <label htmlFor={`person-${person.id}`} className="ml-2">{person.name}</label>
                </div>
            ))}
            <h2 className="text-md font-bold mb-1 mt-2">Organisaties</h2>
            {organizations?.map(org => (
                <div key={org.id}>
                    <input
                        type="checkbox"
                        id={`organization-${org.id}`}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedOrganizations.includes(org.id)}
                        onChange={(e) => {
                            const updated = e.target.checked
                                ? [...selectedOrganizations, org.id]
                                : selectedOrganizations.filter(id => id !== org.id);
                            setSelectedOrganizations(updated);
                        }}
                    />
                    <label htmlFor={`organization-${org.id}`} className="ml-2">{org.name}</label>
                </div>
            ))}
            <h2 className="text-md font-bold mb-1 mt-2">Bevolkingsgroepen</h2>
            {groups?.map(group => (
                <div key={group.id}>
                    <input
                        type="checkbox"
                        id={`group-${group.id}`}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedGroups.includes(group.id)}
                        onChange={(e) => {
                            const updated = e.target.checked
                                ? [...selectedGroups, group.id]
                                : selectedGroups.filter(id => id !== group.id);
                            setSelectedGroups(updated);
                        }}
                    />
                    <label htmlFor={`group-${group.id}`} className="ml-2">{group.name}</label>
                </div>
            ))}

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
