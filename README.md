# NA-tijdlijn-poc

Een proof-of-concept project om documenten, dossiers en metadata uit een WOO-dataset te ontsluiten via een GraphQL API met PostgreSQL als databron.  
Deze backend maakt gebruik van Apollo Server v4 (Node.js + TypeScript) en is eenvoudig op te starten via Docker Compose.  
Een optionele React frontend is voorbereid, maar nog niet geactiveerd.

---

## ⚙️ Stack

- **PostgreSQL** — relationele database
- **Node.js + TypeScript** — backend
- **Apollo Server v4** — GraphQL API
- **Docker Compose** — om alles samen te draaien
- **React + Apollo Client** — frontend

---

## 📦 Database downloaden

Deze repository bevat het grote databasebestand niet i.v.m. GitHub-beperkingen.

1. Download handmatig het volgende bestand:
   - [`data.sql`](https://drive.google.com/file/d/1S5w-4RdwEbjNMAvsei2hRlAsYzp_rP9u/view?usp=sharing)

2. Plaats het in de `database/init/` map van dit project:


---

Docker zal deze automatisch inladen bij het starten.

---

## 🚀 Project starten met Docker

### 📋 Vereisten

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### ▶️ Starten

In de root:

```bash
docker-compose up --build
```


## 🧪 Testen van de GraphQL API

De API is beschikbaar op: `http://localhost:4000/graphql`

> Let op: dit endpoint accepteert alleen `POST`-requests. Gebruik bijvoorbeeld Postman of Insomnia.

## Entity Relation Diagram

![ERD](ERD.png)

### ✅ Voorbeeldquery

```graphql
query {
  documents(limit: 5) {
    document_id
    title
    date_scraped
  }
}
```
