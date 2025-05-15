import React from "react";

type TimelineEvent = {
  date: string;
  description: string;
  document: {
    document_id: string;
    sourceurl: string;
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
            {/* Datum links */}
            <div className="text-right pr-4">
              <p className="text-black font-semibold">{date}</p>
            </div>
  
            {/* Verticale lijn met cirkel */}
            <div className="relative flex justify-center">
              <div className="w-1 bg-[#467ac1] h-full absolute top-0 rounded-b-full"></div>
              {/* Cirkel */}
              <div className="absolute w-5 h-5 bg-[#bedbff] rounded-full border-3 border-[#bedbff]"></div>
            </div>
  
            {/* Card rechts */}
            <div className="bg-[#e6effa] p-4 rounded-lg shadow">
              <ul className="list-disc list-inside space-y-2">
                {groupedByDate[date].map((event, i) => (
                  <li key={i}>
                    {event.description}{" "}
                    {event.document?.sourceurl && (
                      <a
                        href={event.document.sourceurl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        (Bekijk document)
                      </a>
                    )}
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
