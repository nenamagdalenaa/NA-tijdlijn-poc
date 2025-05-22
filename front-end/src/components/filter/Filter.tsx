import React, { useState } from 'react';
import DateRangeFilter from './DateFilter';
import EntityFilter from './EntityFilter';

type FilterProps = {
    persons?: Array<{ personId: string; name: string; }>;
    organizations?: Array<{ organizationId: string; name: string; }>;
    groups?: Array<{ groupId: string; name: string; }>;
    showDateRange?: boolean;
    onFilterChange?: (filters: { persons: string[]; organizations: string[]; groups: string[]; }) => void;
    onApply?: () => void;
};

export default function Filter({ persons, organizations, groups, showDateRange, onFilterChange, onApply }: FilterProps) {
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
            groups: selectedGroups
        });

        onApply?.();
    };

    return (
        <div className='bg-gray-200 p-4 shadow-md'>
            <h2 className="text-xl font-bold mb-2">Filter</h2>
            <EntityFilter
                title="Personen"
                prefix="person"
                entities={persons?.map(p => ({ id: p.personId, name: p.name })) || []}
                selected={selectedPersons.map(id => `person:${id}`)}
                onChange={(selected) =>
                    setSelectedPersons(selected.map(id => id.split(':')[1]))
                }
            />
            <EntityFilter
                title="Organisaties"
                prefix='org'
                entities={organizations?.map(o => ({ id: o.organizationId, name: o.name })) || []}
                selected={selectedOrganizations.map(id => `org:${id}`)}
                onChange={(selected) =>
                    setSelectedOrganizations(selected.map(id => id.split(':')[1]))
                }
            />

            <EntityFilter
                title="Bevolkingsgroepen"
                prefix='group'
                entities={groups?.map(g => ({ id: g.groupId, name: g.name })) || []}
                selected={selectedGroups.map(id => `group:${id}`)}
                onChange={(selected) =>
                    setSelectedGroups(selected.map(id => id.split(':')[1]))
                }
            />

            {showDateRange && (
                <><h2 className="text-md font-bold mt-2">Datum</h2><div className="mt-2">
                    <DateRangeFilter from={dateRange.from} to={dateRange.to} onChange={setDateRange} />
                </div></>
            )}

            <button
                onClick={handleApplyFilters}
                className="mt-6 mb-2 p-2 bg-gray-400 font-bold hover:bg-gray-300">
                Toepassen
            </button>
        </div>
    );
};
