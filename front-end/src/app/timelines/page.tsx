import React from "react";

const CustomTextField: React.FC = () => {
    return (
      <input
        type="text"
        className="mt-6 px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#bedbff] focus:border-[#bedbff] w-[40%]"
      />
    );
  };

export default function Timelines() {
  return (
    <div>
      <main className="m-6 p-7">
      <h1 className='font-extrabold text-5xl'>Tijdlijnen</h1>
      <h1 className="mt-5">Zoek op een keyword om een tijdlijn te zien van samenhangende gebeurtenissen.</h1>

      <section>
            <CustomTextField />
      </section>
      </main>
    </div>
  );
}
