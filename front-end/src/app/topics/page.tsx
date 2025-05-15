import React from "react";
import TopicGrid from "@/components/topics/TopicGrid";

export default function Topics() {
  return (
    <div className="items-center flex flex-col gap-[32px]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className='mt-6 font-extrabold text-5xl'>Onderwerpen</h1>
        <h1>Klik op een onderwerp voor meer informatie over dat onderwerp.</h1>
        <TopicGrid />
      </main>
    </div>
  );
}
