import { pool } from './db';
import { spawn } from 'child_process'
import { Document } from './generated/graphql';

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

    getTimelineByTopic: async (
      _: any,
      {
        topicId,
        persons,
        organizations,
        groups,
        startDate,
        endDate,
      }: {
        topicId: string;
        persons: string[] | null;
        organizations: string[] | null;
        groups: string[] | null;
        startDate: string | null;
        endDate: string | null;
      }
    ) => {
      const values: any[] = [];
      const whereClauses: string[] = [];

      let idx = 1;

      whereClauses.push(`dt.topic_id = $${idx}`);
      values.push(topicId);
      idx++;

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

      const query = `
        SELECT DISTINCT e.document_id, e.date, e.description, d.sourceurl, d.title, d.sourcetype
        FROM event e
        JOIN document d ON e.document_id = d.document_id
        JOIN document_topic dt ON d.document_id = dt.document_id
        LEFT JOIN document_person dp ON d.document_id = dp.document_id
        LEFT JOIN document_organization dorg ON d.document_id = dorg.document_id
        LEFT JOIN document_group dg ON d.document_id = dg.document_id
        ${whereSQL}
        ORDER BY e.date ASC;
      `;

      const result = await pool.query(query, values);

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
      { filterOptions }: { filterOptions?: { query?: string; topicId?: string } }
    ) => {
      const { query, topicId } = filterOptions || {};

      if (topicId) {
        const result = await pool.query(
          `
      SELECT 
        d.document_id,
        d.title,
        d.summary,
        d.sourceurl,
        d.dossier_id,
        dos.title AS dossier_title,
        dos.sourceurl AS dossier_sourceurl,
        ARRAY_AGG(t.topic_id) AS topic_ids,
        ARRAY_AGG(t.name) AS topic_names,
        ARRAY_AGG(dt.probability) AS topic_probabilities
      FROM document d
      LEFT JOIN dossier dos ON d.dossier_id = dos.dossier_id
      JOIN document_topic dt ON d.document_id = dt.document_id
      JOIN topic t ON dt.topic_id = t.topic_id
      WHERE t.topic_id = $1
      GROUP BY 
        d.document_id, d.title, d.summary, d.sourceurl, 
        d.dossier_id, dos.title, dos.sourceurl
      `,
          [topicId]
        );

        return result.rows.map(row => ({
          documentId: row.document_id,
          title: row.title,
          summary: row.summary,
          sourceUrl: row.sourceurl,
          dossier: row.dossier_id && {
            dossierId: row.dossier_id,
            title: row.dossier_title,
            sourceUrl: row.dossier_sourceurl,
          },
          topics: row.topic_ids.map((id: string, i: number) => ({
            topicId: id,
            name: row.topic_names[i],
            probability: row.topic_probabilities[i],
          })),
        }));
      } else if (query) {
        const embedding = await getEmbeddingLocally(query);
        const embeddingLiteral = `[${embedding.join(',')}]`;

        const result = await pool.query(
          `
      WITH matched_docs AS (
        SELECT 
          d.document_id,
          d.title,
          d.summary,
          d.sourceurl,
          d.dossier_id,
          dos.title AS dossier_title,
          dos.sourceurl AS dossier_sourceurl,
          d.embedding <=> $1::vector AS distance
        FROM document d
        LEFT JOIN dossier dos ON d.dossier_id = dos.dossier_id
        WHERE d.embedding <=> $1::vector < 0.2
      )
      SELECT 
        md.document_id,
        md.title,
        md.summary,
        md.sourceurl,
        md.dossier_id,
        md.dossier_title,
        md.dossier_sourceurl,
        md.distance,
        ARRAY_AGG(t.topic_id) AS topic_ids,
        ARRAY_AGG(t.name) AS topic_names,
        ARRAY_AGG(dt.probability) AS topic_probabilities
      FROM matched_docs md
      JOIN document_topic dt ON md.document_id = dt.document_id
      JOIN topic t ON dt.topic_id = t.topic_id    
      GROUP BY 
        md.document_id, md.title, md.summary, md.sourceurl, 
        md.dossier_id, md.dossier_title, md.dossier_sourceurl, md.distance
      ORDER BY md.distance;
      `,
          [embeddingLiteral]
        );

        return result.rows.map(row => ({
          documentId: row.document_id,
          title: row.title,
          summary: row.summary,
          sourceUrl: row.sourceurl,
          dossier: row.dossier_id && {
            dossierId: row.dossier_id,
            title: row.dossier_title,
            sourceUrl: row.dossier_sourceurl,
          },
          topics: row.topic_ids.map((id: string, i: number) => ({
            topicId: id,
            name: row.topic_names[i],
            probability: row.topic_probabilities[i],
          })),
        }));
      } else {
        throw new Error("filterOptions must contain either 'query' or 'topicId'");
      }
    },


    getTimelineByQuery: async (
      _: any,
      {
        query,
        persons,
        organizations,
        groups,
        startDate,
        endDate,
      }: {
        query: string;
        persons: string[] | null;
        organizations: string[] | null;
        groups: string[] | null;
        startDate: string | null;
        endDate: string | null;
      }
    ) => {
      const embedding = await getEmbeddingLocally(query);
      const embeddingLiteral = `[${embedding.join(',')}]`;

      const values: any[] = [embeddingLiteral];
      const whereClauses: string[] = [`e.embedding <=> $1::vector < 0.2`];
      let idx = 2;

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

      const whereSQL = `WHERE ${whereClauses.join(' AND ')}`;

      const querySQL = `
        SELECT DISTINCT e.document_id, e.date, e.description, d.sourceurl
        FROM event e
        JOIN document d ON e.document_id = d.document_id
        LEFT JOIN document_person dp ON d.document_id = dp.document_id
        LEFT JOIN document_organization dorg ON d.document_id = dorg.document_id
        LEFT JOIN document_group dg ON d.document_id = dg.document_id
        ${whereSQL}
        ORDER BY e.date ASC;
      `;

      const result = await pool.query(querySQL, values);

      return result.rows.map(event => ({
        document: {
          documentId: event.document_id,
          sourceUrl: event.sourceurl,
        },
        date: event.date,
        description: event.description,
      }));
    },

    documents: () => [],
    dossier: () => null,
    events: () => [],
    groups: () => [],
    organizations: () => [],
    people: () => [],
  },
  Document: {
    persons: async (parent: Document) => {
      const result = await pool.query(
        `SELECT p.person_id, p.name
         FROM person p
         JOIN document_person dp ON p.person_id = dp.person_id
         WHERE dp.document_id = $1`,
        [parent.documentId]
      );
      return result.rows.map(row => ({ personId: row.person_id, name: row.name }));
    },
    organizations: async (parent: Document) => {
      const result = await pool.query(
        `SELECT o.organization_id, o.name
        FROM organization o
        JOIN document_organization dorg ON o.organization_id = dorg.organization_id
        WHERE dorg.document_id = $1`,
        [parent.documentId]
      );

      return result.rows
        .filter(row => row.organization_id !== null) // voeg dit toe
        .map(row => ({
          organizationId: row.organization_id,
          name: row.name
        }));
    },
    groups: async (parent: Document) => {
      const result = await pool.query(
        `SELECT g.group_id, g.name
         FROM "Group" g
         JOIN document_group dg ON g.group_id = dg.group_id
         WHERE dg.document_id = $1`,
        [parent.documentId]
      );
      return result.rows.map(row => ({ groupId: row.group_id, name: row.name }));
    },
  },
};
