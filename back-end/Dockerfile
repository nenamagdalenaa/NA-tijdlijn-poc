# === Stage 1: Python embeddings script ===
FROM python:3.11-slim AS python-stage

WORKDIR /embedder

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY embed_query.py .

# === Stage 2: Node app ===
FROM node:18

WORKDIR /app

# Voeg Python uit de vorige stage toe
COPY --from=python-stage /usr/local /usr/local
COPY --from=python-stage /embedder /app/embedder

COPY package.json tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

CMD ["npm", "start"]

EXPOSE 4000
