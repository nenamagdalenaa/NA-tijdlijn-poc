import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DateProps = {
    from: Date | null;
    to: Date | null;
    onChange: (dateRange: { from: Date | null; to: Date | null }) => void;
};

export default function DateRangeFilter({ from, to, onChange }: DateProps) {

    return (
        <div className="flex gap-4 items-center">
            <div className="flex flex-col">
                <label className="text-sm mb-1 font-bold">Van</label>
                <DatePicker
                    selected={from ?? null} 
                    onChange={(date: Date | null) => onChange({ from: date, to })}
                    selectsStart
                    startDate={from ?? null}
                    endDate={to ?? null}
                    placeholderText="Selecteer een datum"
                    className="border border-black px-2 py-1 text-sm bg-white"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    openToDate={from ?? new Date()} 
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm mb-1 font-bold">Tot</label>
                <DatePicker
                    selected={to ?? null} 
                    onChange={(date: Date | null) => onChange({ from, to: date })}
                    selectsEnd
                    startDate={from ?? null}
                    endDate={to ?? null}  
                    minDate={from ?? undefined} 
                    placeholderText="Selecteer een datum"
                    className="border border-black px-2 py-1 text-sm bg-white"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    openToDate={to ?? new Date()}
                />
            </div>
        </div>
    );
}
