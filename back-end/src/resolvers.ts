import { pool } from './db';
import { spawn } from 'child_process'
import { Document } from './generated/graphql';
import { DocumentParent, GraphQLContext } from './types';

async function getEmbeddingLocally(query: string): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', ['embed_query.py', query])
    let data = ''

    python.stdout.on('data', (chunk) => {
      data += chunk
    })

    python.stderr.on('data', (err) => {
      console.error('Python error:', err.toString())
    })

    python.on('close', () => {
      try {
        const embedding = JSON.parse(data)
        resolve(embedding)
      } catch (e) {
        reject(e)
      }
    })
  })
}

export const resolvers = {
  Query: {
    topics: async () => {
      const result = await pool.query('SELECT topic_id, name, summary, top_words FROM topic');
      return result.rows
        .filter(row => row.topic_id)
        .map(row => ({
          topicId: row.topic_id,
          name: row.name,
          summary: row.summary,
          topWords: row.top_words,
        }));
    },

    topic: async (_: any, args: { topicId: string }) => {
      const result = await pool.query(
        'SELECT topic_id, name, summary, top_words FROM topic WHERE topic_id = $1',
        [args.topicId]
      );

      const row = result.rows[0];

      return {
        topicId: row.topic_id,
        name: row.name,
        summary: row.summary,
        topWords: row.top_words,
      };
    },

    topEntities: async () => {
      const personsRes = await pool.query(`
    SELECT p.person_id, p.name, COUNT(*) AS count
    FROM person p
    JOIN document_person dp ON p.person_id = dp.person_id
    GROUP BY p.person_id, p.name
    ORDER BY count DESC
    LIMIT 6
  `);

      const orgRes = await pool.query(`
    SELECT o.organization_id, o.name, COUNT(*) AS count
    FROM organization o
    JOIN document_organization dorg ON o.organization_id = dorg.organization_id
    GROUP BY o.organization_id, o.name
    ORDER BY count DESC
    LIMIT 6
  `);

      const groupRes = await pool.query(`
    SELECT g.group_id, g.name, COUNT(*) AS count
    FROM "Group" g
    JOIN document_group dg ON g.group_id = dg.group_id
    GROUP BY g.group_id, g.name
    ORDER BY count DESC
    LIMIT 6
  `);

      return {
        persons: personsRes.rows.map(row => ({
          entityId: row.person_id,
          name: row.name,
          count: parseInt(row.count),
        })),
        organizations: orgRes.rows.map(row => ({
          entityId: row.organization_id,
          name: row.name,
          count: parseInt(row.count),
        })),
        groups: groupRes.rows.map(row => ({
          entityId: row.group_id,
          name: row.name,
          count: parseInt(row.count),
        })),
      };
    },

    getEntities: async () => {
      const personsRes = await pool.query(`
        SELECT person_id, name FROM person ORDER BY name
      `);

      const orgsRes = await pool.query(`
        SELECT organization_id, name FROM organization ORDER BY name
      `);

      const groupsRes = await pool.query(`
        SELECT group_id, name FROM "Group" ORDER BY name
      `);

      return {
        persons: personsRes.rows.map(row => ({
          personId: row.person_id,
          name: row.name,
          documents: [], // voeg leeg array toe als je geen relaties wilt ophalen
        })),
        organizations: orgsRes.rows.map(row => ({
          organizationId: row.organization_id,
          name: row.name,
          documents: [],
        })),
        groups: groupsRes.rows.map(row => ({
          groupId: row.group_id,
          name: row.name,
          documents: [],
        })),
      };
    },

    topEntitiesByTopic: async (_: any, { topicId }: { topicId: string }) => {
      const personsRes = await pool.query(`
        SELECT p.person_id, p.name, COUNT(*) AS count
        FROM person p
        JOIN document_person dp ON p.person_id = dp.person_id
        JOIN document_topic dt ON dp.document_id = dt.document_id
        WHERE dt.topic_id = $1
        GROUP BY p.person_id, p.name
        ORDER BY count DESC
        LIMIT 6
      `, [topicId]);

      const orgRes = await pool.query(`
        SELECT o.organization_id, o.name, COUNT(*) AS count
        FROM organization o
        JOIN document_organization dorg ON o.organization_id = dorg.organization_id
        JOIN document_topic dt ON dorg.document_id = dt.document_id
        WHERE dt.topic_id = $1
        GROUP BY o.organization_id, o.name
        ORDER BY count DESC
        LIMIT 6
      `, [topicId]);

      const groupRes = await pool.query(`
        SELECT g.group_id, g.name, COUNT(*) AS count
        FROM "Group" g
        JOIN document_group dg ON g.group_id = dg.group_id
        JOIN document_topic dt ON dg.document_id = dt.document_id
        WHERE dt.topic_id = $1
        GROUP BY g.group_id, g.name
        ORDER BY count DESC
        LIMIT 6
      `, [topicId]);

      return {
        persons: personsRes.rows.map(row => ({
          entityId: row.person_id,
          name: row.name,
          count: parseInt(row.count),
        })),
        organizations: orgRes.rows.map(row => ({
          entityId: row.organization_id,
          name: row.name,
          count: parseInt(row.count),
        })),
        groups: groupRes.rows.map(row => ({
          entityId: row.group_id,
          name: row.name,
          count: parseInt(row.count),
        })),
      };
    },

    getTimeline: async (
      _: any,
      {
        filterOptions,
      }: {
        filterOptions: {
          query?: string;
          topicId?: string;
          persons?: string[];
          organizations?: string[];
          groups?: string[];
          startDate?: string;
          endDate?: string;
        };
      }
    ) => {
      const {
        query,
        topicId,
        persons,
        organizations,
        groups,
        startDate,
        endDate,
      } = filterOptions;

      const values: any[] = [];
      const whereClauses: string[] = [];
      let idx = 1;

      // === Handle query embedding if query is given ===
      if (query) {
        const embedding = await getEmbeddingLocally(query);
        const embeddingLiteral = `[${embedding.join(',')}]`;
        whereClauses.push(`e.embedding <=> $${idx}::vector < 0.2`);
        values.push(embeddingLiteral);
        idx++;
      }

      // === If topicId is used, require a topic join ===
      if (topicId) {
        whereClauses.push(`dt.topic_id = $${idx}`);
        values.push(topicId);
        idx++;
      }

      if (persons && persons.length > 0) {
        whereClauses.push(`dp.person_id = ANY($${idx})`);
        values.push(persons);
        idx++;
      }

      if (organizations && organizations.length > 0) {
        whereClauses.push(`dorg.organization_id = ANY($${idx})`);
        values.push(organizations);
        idx++;
      }

      if (groups && groups.length > 0) {
        whereClauses.push(`dg.group_id = ANY($${idx})`);
        values.push(groups);
        idx++;
      }

      if (startDate) {
        whereClauses.push(`e.date >= $${idx}::date`);
        values.push(startDate);
        idx++;
      }

      if (endDate) {
        whereClauses.push(`e.date <= $${idx}::date`);
        values.push(endDate);
        idx++;
      }

      const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

      const joins = [
        `JOIN document d ON e.document_id = d.document_id`,
        topicId ? `JOIN document_topic dt ON d.document_id = dt.document_id` : '',
        `LEFT JOIN document_person dp ON d.document_id = dp.document_id`,
        `LEFT JOIN document_organization dorg ON d.document_id = dorg.document_id`,
        `LEFT JOIN document_group dg ON d.document_id = dg.document_id`,
      ].filter(Boolean).join('\n');

      const querySQL = `
    SELECT DISTINCT e.document_id, e.date, e.description, d.sourceurl, d.title, d.sourcetype
    FROM event e
    ${joins}
    ${whereSQL}
    ORDER BY e.date ASC;
  `;

      const result = await pool.query(querySQL, values);

      return result.rows.map(event => ({
        document: {
          documentId: event.document_id,
          title: event.title,
          sourceUrl: event.sourceurl,
          sourceType: event.sourcetype,
        },
        date: event.date,
        description: event.description,
      }));
    },

    getDocuments: async (
      _: any,
      {
        filterOptions,
      }: {
        filterOptions?: {
          query?: string;
          topicId?: string;
          persons?: string[];
          organizations?: string[];
          groups?: string[];
          limit?: number;
        };
      }
    ) => {
      const { query, topicId, persons = [], organizations = [], groups = [], limit = 100 } = filterOptions || {};

      const filters: string[] = [];
      const params: any[] = [];
      let useEmbedding = false;

      // filter op topic of query
      if (topicId) {
        params.push(topicId);
        filters.push(`t.topic_id = $${params.length}`);
      } else if (query) {
        const embedding = await getEmbeddingLocally(query);
        const embeddingLiteral = `[${embedding.join(',')}]`;
        params.push(embeddingLiteral);
        useEmbedding = true;
      } else {
        throw new Error("filterOptions must contain either 'query' or 'topicId'");
      }

      if (persons.length) {
        params.push(persons);
        filters.push(`dp.person_id = ANY($${params.length})`);
      }
      if (organizations.length) {
        params.push(organizations);
        filters.push(`dorg.organization_id = ANY($${params.length})`);
      }
      if (groups.length) {
        params.push(groups);
        filters.push(`dg.group_id = ANY($${params.length})`);
      }

      const filterSQL = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
      params.push(limit);

      const joins = `
    LEFT JOIN document_person dp ON d.document_id = dp.document_id
    LEFT JOIN document_organization dorg ON d.document_id = dorg.document_id
    LEFT JOIN document_group dg ON d.document_id = dg.document_id
    JOIN document_topic dt ON d.document_id = dt.document_id
    JOIN topic t ON dt.topic_id = t.topic_id
  `;

      const baseSelect = `
    SELECT DISTINCT d.document_id, d.title, d.summary, d.sourceurl, d.dossier_id
    FROM document d
    ${joins}
    ${filterSQL}
    LIMIT $${params.length}
  `;

      const embeddingSelect = `
    WITH matched_docs AS (
      SELECT d.*, d.embedding <=> $1::vector AS distance
      FROM document d
      WHERE d.embedding <=> $1::vector < 0.2
    )
    SELECT DISTINCT md.document_id, md.title, md.summary, md.sourceurl, md.dossier_id, md.distance, md.date_scraped
    FROM matched_docs md
    ${joins.replace(/d\./g, 'md.')}
    ${filterSQL.replace(/d\./g, 'md.')}
    ORDER BY md.distance
    LIMIT $${params.length}
  `;

      const sql = useEmbedding ? embeddingSelect : baseSelect;
      const result = await pool.query(sql, params);

      return result.rows.map((row) => ({
        documentId: row.document_id,
        title: row.title,
        scrapedDate: row.date_scraped,
        summary: row.summary,
        sourceUrl: row.sourceurl,
        dossierId: row.dossier_id,
      }));
    },
  },
  Document: {
    persons: (parent: Document, _: any, context: GraphQLContext) => {
      return context.loaders.personLoader.load(parent.documentId);
    },
    organizations: (parent: Document, _: any, context: GraphQLContext) => {
      return context.loaders.organizationLoader.load(parent.documentId);
    },
    groups: (parent: Document, _: any, context: GraphQLContext) => {
      return context.loaders.groupLoader.load(parent.documentId);
    },
    dossier: (parent: DocumentParent, _: any, context: GraphQLContext) => {
      return context.loaders.dossierLoader.load(parent.dossierId ?? '');
    },
    topics: (parent: Document, _: any, context: GraphQLContext) => {
      return context.loaders.topicLoader.load(parent.documentId);
    },
  }
};
