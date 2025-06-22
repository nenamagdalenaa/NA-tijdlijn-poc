import React, { useState, useMemo, useEffect } from "react";
import { FixedSizeList as List } from "react-window";

type Entity = {
  id: string;
  name: string;
};

type EntityFilterProps = {
  title: string;
  entities: Entity[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export default function EntityFilter({
  title,
  entities,
  selected,
  onChange,
}: EntityFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // debounce: wacht 200ms na typen
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const filteredEntities = useMemo(() => {
    return entities.filter((e) =>
      e.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [entities, debouncedSearch]);

  const handleToggle = (id: string) => {
    // console.log(
    //   `[EntityFilter] handleToggle: id=${id}, selected before=`,
    //   selected
    // );
    if (selected.includes(id)) {
      const newSelected = selected.filter((s) => s !== id);
      console.log(
        `[EntityFilter] handleToggle: removing id, selected after=`,
        newSelected
      );
      onChange(newSelected);
    } else {
      const newSelected = [...selected, id];
      console.log(
        `[EntityFilter] handleToggle: adding id, selected after=`,
        newSelected
      );
      onChange(newSelected);
    }
  };

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const entity = filteredEntities[index];
    const id = entity.id;

    if (!entity || !entity.id) return null;

    const isChecked = selected.includes(id);
    console.log(
      `[EntityFilter] Row: entity.id=`,
      id,
      "| selected=",
      selected,
      "| checked=",
      isChecked
    );

    return (
      <div style={style} key={id} className="flex items-center px-1">
        <input
          type="checkbox"
          id={id}
          className="w-3 h-3 text-blue-600 rounded"
          checked={isChecked}
          onChange={() => handleToggle(id)}
        />
        <label htmlFor={id} className="ml-1 text-xs truncate">
          {entity.name}
        </label>
      </div>
    );
  };

  return (
    <div className="mb-2">
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <input
        type="text"
        placeholder={`Zoek ${title.toLowerCase()}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-1 text-xs mb-1 border border-black bg-white"
      />
      <div className="border border-black bg-white">
        <List
          height={144}
          itemCount={filteredEntities.length}
          itemSize={24}
          width="100%"
        >
          {Row}
        </List>
      </div>
    </div>
  );
}
