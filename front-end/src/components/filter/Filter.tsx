import React from 'react';
import DateRangeFilter from './DateFilter';
import EntityFilter from './EntityFilter';

type FilterProps = {
  persons?: Array<{ personId: string; name: string; }>;
  organizations?: Array<{ organizationId: string; name: string; }>;
  groups?: Array<{ groupId: string; name: string; }>;
  topics?: Array<{ topicId: string; name: string; }>;
  showDateRange?: boolean;
  showTopics?: boolean;
  selectedPersons?: string[];
  selectedOrganizations?: string[];
  selectedGroups?: string[];
  dateRange?: { from: Date | null; to: Date | null };
  selectedTopics?: string[];
  onFilterChange?: (filters: { persons: string[]; organizations: string[]; groups: string[]; dateRange: { from: Date | null; to: Date | null }; topics: string[]; }) => void;
  onApply?: () => void;
};

export default function Filter({
  persons,
  organizations,
  groups,
  topics,
  showDateRange,
  showTopics,
  selectedPersons,
  selectedOrganizations,
  selectedGroups,
  dateRange,
  selectedTopics,
  onFilterChange,
  onApply
}: FilterProps) {

  const handleApplyFilters = () => {
    onFilterChange?.({
      persons: selectedPersons || [],
      organizations: selectedOrganizations || [],
      groups: selectedGroups || [],
      dateRange: { from: dateRange?.from ?? null, to: dateRange?.to ?? null },
      topics: selectedTopics || [],
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
            dateRange: { from: dateRange?.from ?? null, to: dateRange?.to ?? null },
            topics: selectedTopics || [],
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
            dateRange: { from: dateRange?.from ?? null, to: dateRange?.to ?? null },
            topics: selectedTopics || [],
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
            dateRange: { from: dateRange?.from ?? null, to: dateRange?.to ?? null },
            topics: selectedTopics || [],
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
                dateRange: { from: range.from ?? null, to: range.to ?? null },
                topics: selectedTopics || [],
              })}
            />
          </div>
        </>
      )}

      {showTopics && (
        <>
          <EntityFilter
            title="Topics"
            prefix="topic"
            entities={topics?.map(t => ({ id: t.topicId, name: t.name })) || []}
            selected={selectedTopics?.map(id => `topic:${id}`) || []}
            onChange={(selected) =>
              onFilterChange?.({
                persons: selectedPersons || [],
                organizations: selectedOrganizations || [],
                groups: selected.map(id => id.split(':')[1]),
                dateRange: { from: dateRange?.from ?? null, to: dateRange?.to ?? null },
                topics: selectedTopics || [],
              })
            }
          />
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
