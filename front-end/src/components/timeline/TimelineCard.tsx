import { Document } from "@/graphql/generated/graphql";
import React from "react";

type TimelineEvent = {
  date?: string | null;
  description?: string | null;
  document?: Document | null;
};


type TimelineCardProps = {
  timeline: TimelineEvent[];
};

const TimelineCard: React.FC<TimelineCardProps> = ({ timeline }) => {
  const validTimeline = timeline.filter(e => e.date);

  const groupedByDate: Record<string, TimelineEvent[]> = validTimeline.reduce(
    (acc, event) => {
      const dateKey = new Date(parseInt(event.date!)).toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, TimelineEvent[]>
  );

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="w-full p-3">
      <div className="relative grid grid-cols-[2fr_1fr_5fr] gap-4">
        {sortedDates.map((date, index) => (
          <div key={index} className="contents">
            <div className="text-right pr-4">
              <p className="text-black font-semibold">{date}</p>
            </div>

            <div className="relative flex justify-center">
              <div className="w-1 bg-black h-full absolute top-0 rounded-b-full"></div>
              <div className="absolute w-5 h-5 bg-gray-400 rounded-full border-3 border-gray-400"></div>
            </div>

            <div className="bg-[#e6effa] p-4 shadow">
              <ul className="list-disc list-inside space-y-2">
                {groupedByDate[date].map((event, i) => (
                  <li key={i} className="relative break-words">
                    <span className="whitespace-pre-line">{event.description}</span>

                    <div className="relative inline-flex group ml-2 cursor-pointer">
                      <div className="px-2 py-1 bg-gray-300 text-sm font-bold cursor-pointer hover:bg-gray-200">
                        ℹ️ Info
                      </div>

                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 z-20 hidden group-hover:flex bg-white border border-gray-300 rounded shadow-lg p-3 w-80 text-sm text-black whitespace-normal break-words">
                        <div>
                          <strong>Afkomstig uit</strong> <br />
                          <strong>Titel:</strong> {event.document?.title ?? <em>Onbekend</em>} <br />
                          <strong>Brontype:</strong> {event.document?.sourceType ?? <em>Onbekend</em>} <br />
                          <strong>Personen:</strong>{" "}
                          {event.document?.persons?.map((p) => p.name).join(", ") || <em>Geen</em>} <br />
                          <strong>Organisaties:</strong>{" "}
                          {event.document?.organizations?.map((o) => o.name).join(", ") || <em>Geen</em>} <br />
                          <strong>Bevolkingsgroepen:</strong>{" "}
                          {event.document?.groups?.map((g) => g.name).join(", ") || <em>Geen</em>} <br />

                          {event.document?.sourceUrl ? (
                            <a
                              href={event.document.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              Link naar document
                            </a>
                          ) : (
                            <span className="text-gray-400">Geen link beschikbaar</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineCard;
