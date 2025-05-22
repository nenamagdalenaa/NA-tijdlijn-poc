import React, { useState, useMemo, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';

type Entity = {
    id: string;
    name: string;
};

type EntityFilterProps = {
    title: string;
    prefix: string;
    entities: Entity[];
    selected: string[];
    onChange: (selected: string[]) => void;
};

export default function EntityFilter({
    title,
    prefix,
    entities,
    selected,
    onChange,
}: EntityFilterProps) {
    const [searchTerm, setSearchTerm] = useState('');
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
        if (selected.includes(id)) {
            onChange(selected.filter((s) => s !== id));
        } else {
            onChange([...selected, id]);
        }
    };

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const entity = filteredEntities[index];
        const safeId = `${prefix}:${entity.id}`;

        if (!entity || !entity.id) return null;

        return (
            <div style={style} key={safeId} className="flex items-center px-1">
                <input
                    type="checkbox"
                    id={safeId}
                    className="w-3 h-3 text-blue-600 rounded"
                    checked={selected.includes(safeId)}
                    onChange={() => handleToggle(safeId)}
                />
                <label htmlFor={safeId} className="ml-1 text-xs truncate">
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
                className="w-full p-1 text-xs mb-1 border border-gray-300 bg-white"
            />
            <div className="border border-gray-300 bg-white">
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
