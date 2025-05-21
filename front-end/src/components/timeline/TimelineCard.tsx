import React from "react";

type TimelineEvent = {
  date: string;
  description: string;
  document: {
    documentId: string;
    sourceUrl: string;
    title: string;
    sourceType: string;
    persons: Array<{
      personId: string;
      name: string;
    }>;
    organizations: Array<{
      organizationId: string;
      name: string;
    }>;
    groups: Array<{
      groupId: string;
      name: string;
    }>;
  };
};

type TimelineCardProps = {
  timeline: TimelineEvent[];
};

const TimelineCard: React.FC<TimelineCardProps> = ({ timeline }) => {
  const groupedByDate: Record<string, TimelineEvent[]> = timeline.reduce(
    (acc, event) => {
      const dateKey = new Date(parseInt(event.date)).toLocaleDateString("nl-NL", {
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
              <div className="w-1 bg-[#467ac1] h-full absolute top-0 rounded-b-full"></div>
              <div className="absolute w-5 h-5 bg-[#bedbff] rounded-full border-3 border-[#bedbff]"></div>
            </div>

            <div className="bg-[#e6effa] p-4 rounded-lg shadow">
              <ul className="list-disc list-inside space-y-2">
                {groupedByDate[date].map((event, i) => (
                  <li key={i} className="relative">
                    {event.description}{" "}
                    <div className="relative inline-flex group ml-2 cursor-pointer text-gray-400 hover:text-blue-600">
                      ℹ️
                      <div className="absolute bottom-full pb-2 left-1/2 -translate-x-1/2 z-20 hidden group-hover:flex bg-white border border-gray-300 rounded shadow-lg p-3 w-80 text-sm text-black">
                        <div>
                          <strong>Afkomstig uit</strong> <br />
                          <strong>Titel:</strong> {event.document?.title ?? <em>Onbekend</em>}
                          <br />
                          <strong>Brontype:</strong> {event.document?.sourceType ?? <em>Onbekend</em>}
                          <br />
                          <strong>Personen:</strong>{" "}
                          {event.document?.persons?.map((person) => person.name).join(", ") || <em>Geen</em>}
                          <br />
                          <strong>Organisaties:</strong>{" "}
                          {event.document?.organizations?.map((org) => org.name).join(", ") || <em>Geen</em>}
                          <br />
                          <strong>Bevolkingsgroepen:</strong>{" "}
                          {event.document?.groups?.map((group) => group.name).join(", ") || <em>Geen</em>}
                          <br />
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
