import React from "react";
import TopicGrid from "@/components/topics/TopicGrid";

export default function Topics() {
  return (
    <div className="p-7 flex flex-col h-[90vh]">
      {/* Fixed top section */}
      <header className="sticky top-0 z-10 bg-white">
        <h1 className="font-extrabold text-5xl">Onderwerpen</h1>
        <p>Klik op een onderwerp voor meer informatie over dat onderwerp.</p>
      </header>

      {/* Scrollable grid */}
      <div className="flex-1 overflow-y-auto rounded-lg p-4 bg-white mt-6">
        <TopicGrid />
      </div>
    </div>
  );
}
