import React from "react";

export default function Home() {
  return (
    <div className="m-6 p-7">
        <div>
            <h1 className="text-4xl font-bold mb-5">Welkom</h1>
            <p>Dit Proof of Concept is tot stand gekomen vanuit een afstudeeropdracht bij het <span className="font-bold">Nationaal Archief</span>.
                <br /> <br />
                Het doel van dit Proof of Concept is om een tool te ontwikkelen dat het mogelijk maakt om
                de inhoud van archieven te doorzoeken en te analyseren. 
                <br />
                Een belangrijk onderdeel van deze tool is het archief inzichtelijk maken door middel van <span className="font-bold">tijdlijnen</span>. 
                Wie was waar en wanneer betrokken bij de gebeurtenissen die in de archieven zijn vastgelegd? 
                <br /><br />
                Als testset is hiervoor een dataset gebruikt van <span className="font-bold">COVID-19 Woo-documenten</span> vanuit het  
                <span className="font-bold"> Ministerie van Volksgezondheid, Welzijn en Sport</span>.
                Dit Proof of Concept bevat <span className="italic">Woo-dossiers van grofweg de eerste signalen van de coronacrisis 
                tot en met de zomer van 2020 </span> (de eerste 9 maanden).
                <br /><br />
                De tijdlijnen, bestaande uit gebeurtenissen, personen, organisaties en bevolkingsgroepen, 
                zijn tot stand gekomen met behulp van <span className="font-bold">Artificial Intelligence (AI)</span>.
            </p>
        </div>
        <div className="m-6 mt-10 grid grid-cols-2 gap-4">
            {/* Linkerkant */}
            <div className="col-span-1 text-center bg-[#e6effa] p-4 rounded-lg">
                <h1 className="text-2xl font-bold mb-5">Onderwerpen</h1>
                <p>Om het doorzoeken gerichter te maken zijn door middel van Topic Modelling (AI) de documenten geclusterd op basis van overkoepelende onderwerpen. 
                Deze onderwerpen zijn te vinden onder het tablad <span className="font-bold">Onderwerpen</span>. 
                <br /><br />
                Elk onderwerp heeft een samenvatting en een top van meest voorkomende entiteiten (personen, organisaties en bevolkingsgroepen).
                <br /><br />
                Per onderwerp is er een tijdlijn gemaakt, waar doorheen gelopen kan worden, evenals filteropties om het doorzoeken te vergemakkelijken. </p>
            </div>

            {/* Rechterkant */}
            <div className="col-span-1 text-center bg-[#e6effa] p-4 rounded-lg">
                <h1 className="text-2xl font-bold mb-5">Tijdlijnen</h1>
                <p>Naast tijdlijnen per onderwerp kan er ook zelf gezocht worden naar een <span className="italic">keyword</span>, om op basis van samenhangende gebeurtenissen een tijdlijn te genereren.
                <br /><br />
                Er kan bijvoorbeeld gezocht worden op 'mondkapjes', 'vaccinatie' of 'quarantaine'. 
                Gebeurtenissen uit de documenten die het keyword bevatten worden  vervolgens verzameld en chronologisch weergegeven.
                <br /><br />
                Ook hier zijn filteropties beschikbaar om het doorzoeken te vergemakkelijken.
                </p>
            </div>
        </div>
    </div>
    
  );
}
