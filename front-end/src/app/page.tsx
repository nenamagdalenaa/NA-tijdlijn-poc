import React from "react";

export default function Home() {
  return (
    <div className="m-6 p-2">
      <div>
        <h1 className="text-4xl font-bold mb-5">Welkom</h1>
        <p>
          Dit Proof of Concept is tot stand gekomen vanuit een afstudeeropdracht bij het{" "}
          <span className="font-bold">Nationaal Archief</span>.
          <br /> <br />
          Het doel van dit Proof of Concept is om een tool te ontwikkelen dat het mogelijk maakt om
          de inhoud van archieven te doorzoeken en te analyseren.
          <br />
          Een belangrijk onderdeel van deze tool is het archief inzichtelijk maken door middel van{" "}
          <span className="font-bold">tijdlijnen</span>.
          Wie was waar en wanneer betrokken bij de gebeurtenissen die in de archieven zijn vastgelegd?
          <br /><br />
          Als testset is hiervoor een dataset gebruikt van{" "}
          <span className="font-bold">COVID-19 Woo-documenten</span> vanuit het{" "}
          <span className="font-bold">Ministerie van Volksgezondheid, Welzijn en Sport
          </span> gescraped van de website{" "}
          <a href="https://open.minvws.nl/thema/covid-19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline">
            open.minvws.nl/thema/covid-19
          </a>.
          <br />Dit Proof of Concept bevat{" "}
          <span className="italic">
            Woo-dossiers met ongeveer 23.000 documenten van grofweg de eerste signalen van de coronacrisis tot en met de zomer van 2020
          </span>{" "}
          (de eerste 9 maanden).
          <br /><br />
          De tijdlijnen, bestaande uit gebeurtenissen, personen, organisaties en bevolkingsgroepen,
          zijn tot stand gekomen met behulp van het Large Language Model{" "}
          <span className="font-bold">Gemini</span>.
        </p>
      </div>

      {/* Grid met 3 kolommen */}
      <div className="m-6 mt-10 grid grid-cols-3 gap-4">
        {/* Onderwerpen */}
        <a href="/topics" className="col-span-1 text-center bg-gray-300 p-4 hover:bg-gray-400 transition">
          <h1 className="text-2xl font-bold mb-5">Onderwerpen</h1>
          <p>
            Om het doorzoeken gerichter te maken zijn door middel van Topic Modelling (AI) de documenten geclusterd op basis van overkoepelende onderwerpen.
            Deze onderwerpen zijn te vinden onder het tabblad <span className="font-bold">Onderwerpen</span>.
            <br /><br />
            Elk onderwerp heeft een samenvatting en een top van meest voorkomende entiteiten (personen, organisaties en bevolkingsgroepen).
            <br /><br />
            Per onderwerp is er een tijdlijn gemaakt, waar doorheen gelopen kan worden, evenals filteropties om het doorzoeken te vergemakkelijken.
          </p>
        </a>

        {/* Tijdlijnen */}
        <a href="/timelines" className="col-span-1 text-center bg-gray-300 p-4 hover:bg-gray-400 transition">
          <h1 className="text-2xl font-bold mb-5">Tijdlijnen</h1>
          <p>
            Naast tijdlijnen per onderwerp kan er ook zelf gezocht worden met een zoekopdracht,
            om op basis van samenhangende gebeurtenissen een tijdlijn te genereren.
            <br /><br />
            Er kan bijvoorbeeld gezocht worden op 'mondkapjes', 'vaccinatie' of 'quarantaine'.
            Gebeurtenissen uit de documenten die overeenkomen met de zoekoprdacht worden vervolgens verzameld en chronologisch weergegeven.
            <br /><br />
            Ook hier zijn filteropties beschikbaar om het doorzoeken te vergemakkelijken.
          </p>
        </a>

        {/* Documenten */}
        <a href="/documents" className="col-span-1 text-center bg-gray-300 p-4 hover:bg-gray-400 transition">
          <h1 className="text-2xl font-bold mb-5">Documenten</h1>
          <p>
            Alle Woo-documenten in deze dataset zijn ook doorzoekbaar met een zoekopdracht.
            Per document is er metadata te raadplegen zoals de samenvatting, betrokken personen of organisaties, en de gekoppelde onderwerpen.
            <br /><br />
            Het originele document en het dossier waar het document deel van uitmaakt zijn ook te raadplegen.
          </p>
        </a>
      </div>
    </div>
  );
}
