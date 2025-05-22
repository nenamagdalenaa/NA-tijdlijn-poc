import React from 'react';
import DateRangeFilter from './DateFilter';
import EntityFilter from './EntityFilter';

type FilterProps = {
    persons?: Array<{ personId: string; name: string; }>;
    organizations?: Array<{ organizationId: string; name: string; }>;
    groups?: Array<{ groupId: string; name: string; }>;
    showDateRange?: boolean;
    selectedPersons?: string[];
    selectedOrganizations?: string[];
    selectedGroups?: string[];
    dateRange?: { from: Date | null; to: Date | null };
    onFilterChange?: (filters: { persons: string[]; organizations: string[]; groups: string[]; dateRange: { from: Date | null; to: Date | null }; }) => void;
    onApply?: () => void;
};

export default function Filter({
  persons,
  organizations,
  groups,
  showDateRange,
  selectedPersons,
  selectedOrganizations,
  selectedGroups,
  dateRange,
  onFilterChange,
  onApply
}: FilterProps) {

  const handleApplyFilters = () => {
    onFilterChange?.({
      persons: selectedPersons || [],
      organizations: selectedOrganizations || [],
      groups: selectedGroups || [],
      dateRange: { from: dateRange?.from ?? null, to: dateRange?.to ?? null }, 
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
        selected={selectedPersons?.map(id => `person:${id}`) || []}
        onChange={(selected) =>
          onFilterChange?.({
            persons: selected.map(id => id.split(':')[1]),
            organizations: selectedOrganizations || [],
            groups: selectedGroups || [],
            dateRange: { from: dateRange?.from ?? null, to: dateRange?.to ?? null }
          })
        }
      />
      <EntityFilter
        title="Organisaties"
        prefix="org"
        entities={organizations?.map(o => ({ id: o.organizationId, name: o.name })) || []}
        selected={selectedOrganizations?.map(id => `org:${id}`) || []}
        onChange={(selected) =>
          onFilterChange?.({
            persons: selectedPersons || [],
            organizations: selected.map(id => id.split(':')[1]),
            groups: selectedGroups || [],
            dateRange: { from: dateRange?.from ?? null, to: dateRange?.to ?? null }
          })
        }
      />

      <EntityFilter
        title="Bevolkingsgroepen"
        prefix="group"
        entities={groups?.map(g => ({ id: g.groupId, name: g.name })) || []}
        selected={selectedGroups?.map(id => `group:${id}`) || []}
        onChange={(selected) =>
          onFilterChange?.({
            persons: selectedPersons || [],
            organizations: selectedOrganizations || [],
            groups: selected.map(id => id.split(':')[1]),
            dateRange: { from: dateRange?.from ?? null, to: dateRange?.to ?? null }
          })
        }
      />

      {showDateRange && (
        <>
          <h2 className="text-sm font-bold mt-2">Datum</h2>
          <div className="mt-2">
            <DateRangeFilter 
              from={dateRange?.from ?? null} 
              to={dateRange?.to ?? null} 
              onChange={(range) => onFilterChange?.({
                persons: selectedPersons || [],
                organizations: selectedOrganizations || [],
                groups: selectedGroups || [],
                dateRange: { from: range.from ?? null, to: range.to ?? null }
              })}
            />
          </div>
        </>
      )}

      <button
        onClick={handleApplyFilters}
        className="mt-6 mb-2 p-2 bg-gray-400 font-bold hover:bg-gray-300">
        Toepassen
      </button>
    </div>
  );
};
