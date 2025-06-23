import React from "react";
import DateRangeFilter from "./DateFilter";
import EntityFilter from "./EntityFilter";

type FilterProps = {
  persons?: Array<{ personId: string; name: string }>;
  organizations?: Array<{ organizationId: string; name: string }>;
  groups?: Array<{ groupId: string; name: string }>;
  topics?: Array<{ topicId: string; name: string }>;
  showDateRange?: boolean;
  showTopics?: boolean;
  selectedPersons?: string[];
  selectedOrganizations?: string[];
  selectedGroups?: string[];
  dateRange?: { from: Date | null; to: Date | null };
  selectedTopics?: string[];
  onFilterChange?: (filters: {
    persons: string[];
    organizations: string[];
    groups: string[];
    dateRange: { from: Date | null; to: Date | null };
    topics: string[];
  }) => void;
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
  onApply,
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

  const entityFilters = [
    {
      title: "Personen",
      entities: persons?.map((p) => ({ id: p.personId, name: p.name })) || [],
      selected: selectedPersons || [],
      key: "persons",
      show: true,
    },
    {
      title: "Organisaties",
      entities:
        organizations?.map((o) => ({ id: o.organizationId, name: o.name })) ||
        [],
      selected: selectedOrganizations || [],
      key: "organizations",
      show: true,
    },
    {
      title: "Bevolkingsgroepen",
      entities: groups?.map((g) => ({ id: g.groupId, name: g.name })) || [],
      selected: selectedGroups || [],
      key: "groups",
      show: true,
    },
    {
      title: "Onderwerpen",
      entities:
        topics?.map((t) => {
          return { id: String(t.topicId), name: t.name };
        }) || [],
      selected: selectedTopics || [],
      key: "topics",
      show: showTopics,
    },
  ];

  return (
    <div className="bg-gray-200 p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">Filter</h2>

      {entityFilters
        .filter((f) => f.show)
        .map(({ title, entities, selected, key }) => (
          <EntityFilter
            key={key}
            title={title}
            entities={entities}
            selected={selected}
            onChange={(newSelected) => {
              onFilterChange?.({
                persons:
                  key === "persons" ? newSelected : selectedPersons || [],
                organizations:
                  key === "organizations"
                    ? newSelected
                    : selectedOrganizations || [],
                groups: key === "groups" ? newSelected : selectedGroups || [],
                topics:
                  key === "topics"
                    ? newSelected.map(String)
                    : selectedTopics || [],
                dateRange: {
                  from: dateRange?.from ?? null,
                  to: dateRange?.to ?? null,
                },
              });
            }}
          />
        ))}

      {showDateRange && (
        <>
          <h2 className="text-sm font-bold mt-2">Datum</h2>
          <div className="mt-2">
            <DateRangeFilter
              from={dateRange?.from ?? null}
              to={dateRange?.to ?? null}
              onChange={(range) =>
                onFilterChange?.({
                  persons: selectedPersons || [],
                  organizations: selectedOrganizations || [],
                  groups: selectedGroups || [],
                  dateRange: { from: range.from ?? null, to: range.to ?? null },
                  topics: selectedTopics || [],
                })
              }
            />
          </div>
        </>
      )}

      <button
        onClick={handleApplyFilters}
        className="mt-6 mb-2 p-2 bg-gray-400 font-bold hover:bg-gray-300"
      >
        Toepassen
      </button>
    </div>
  );
}
