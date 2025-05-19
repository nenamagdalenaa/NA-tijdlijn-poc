import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DateProps = {
    from: Date | null;
    to: Date | null;
    onChange: (range: { from: Date | null; to: Date | null }) => void;
};

export default function DateRangeFilter({ from, to, onChange }: DateProps) {
    return (
        <div className="flex gap-4 items-center">
            <div className="flex flex-col">
                <label className="text-sm mb-1 font-bold">Van</label>
                <DatePicker
                    selected={from}
                    onChange={(date) => onChange({ from: date, to })}
                    selectsStart
                    startDate={from}
                    endDate={to}
                    placeholderText="Selecteer een datum"
                    className="border border-black rounded px-2 py-1 text-sm"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    openToDate={new Date('2019-12-01')}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm mb-1 font-bold">Tot</label>
                <DatePicker
                    selected={to}
                    onChange={(date) => onChange({ from, to: date })}
                    selectsEnd
                    startDate={from}
                    endDate={to}
                    minDate={from || undefined}
                    placeholderText="Selecteer een datum"
                    className="border border-black rounded px-2 py-1 text-sm"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    openToDate={new Date('2019-12-01')}
                />
            </div>
        </div>
    );
};