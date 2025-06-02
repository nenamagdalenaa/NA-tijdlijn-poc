# Proof of Concept Archief Tijdlijnen

Een Proof of Concept project om documenten, dossiers en metadata uit een Woo-dataset te ontsluiten via een GraphQL API met PostgreSQL als databron. 

- **Databron**: de database is gevuld met 23.000 Woo-stukken van het Ministerie van Volksgezondheid, Welzijn en Sport met betrekking tot **COVID-19**. De documenten zijn gescraped van de website [Open Min VWS](https://open.minvws.nl/thema/covid-19). Het gaat om documenten van grofweg de eerste 9 maanden van de coronacrisis. 
- **Preprocessing** van de data bestond uit:
  1. Optical Character Recognition (OCR) om de tekst uit de PDF-bestanden te halen.
  2. Metadata extractie (d.m.v. Gemini)
      - Datums
      - Personen
      - Ministeries/organisaties/instituten
      - Bevolkingsgroepen
      - Samenvatting van documenten
      - Gebeurtenissen met bijbehorende datums
- **Topic Modeling (BERTopic)**: hiermee zijn grotere thema's uit de dataset geclusterd om gerichter zoeken te faciliteren. 

---

## Stack
- **PostgreSQL** — relationele database
  - Embeddings van de samenvattingen en gebeurtenissen zijn opgeslagen middels [pgvector](https://github.com/pgvector/pgvector) om vector search mogelijk te maken
- **Node.js + TypeScript** — backend
- **Apollo Server v4** — GraphQL API
- **Next.js + React + Apollo Client** — frontend

---

## Proof of Concept live
- PostgreSQL database is gedeployed met [Render](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://render.com/&ved=2ahUKEwiAk5C6ttKNAxXPh_0HHezBGMgQFnoECB8QAQ&usg=AOvVaw3kFSb080wcDQvO4YkWaPI9)
- Back-end GraphQL API is gedeployed met Render 
- Front-end is gedeployed met [Vercel](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://vercel.com/&ved=2ahUKEwixjsfGttKNAxWclP0HHZ1OAX4QFnoECDwQAQ&usg=AOvVaw0IyxhwoD9uGvLBGqylHAlt)

## Naar de user interface --> [Covid-19 Woo Browser]()

## Testen van de GraphQL API

De API is beschikbaar op: `https://na-tijdlijn-poc.onrender.com/graphql`

> Let op: dit endpoint accepteert alleen `POST`-requests. Gebruik bijvoorbeeld Postman of Insomnia.

Er is een [Postman collectie](https://speeding-crater-347082.postman.co/workspace/My-Workspace~516996a4-6fa7-485b-804f-0a7dba594bcf/collection/30911572-2066d047-230b-4aa2-b4d5-5fe843c9219b?action=share&creator=30911572) beschikbaar om de queries te testen.

De URL moet dan wel veranderd worden. 

---

## Entity Relation Diagram

![ERD](ERD.png)

---
## Known impedements & future improvements

- Dataset uitbreiden, entity extraction
- Performance