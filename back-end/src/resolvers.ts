import { pool } from './db';

export const resolvers = {
  Query: {
    topics: async () => {
      const result = await pool.query('SELECT topic_id, name, summary, top_words FROM topic');
      return result.rows;
    },
    topic: async (_: any, args: { id: string }) => {
      const result = await pool.query(
        'SELECT topic_id, name, summary, top_words FROM topic WHERE topic_id = $1',
        [args.id]
      );
      return result.rows[0] || null;
    },
    topEntitiesByTopic: async (_: any, { topic_id }: { topic_id: string }) => {
      const personsRes = await pool.query(`
        SELECT p.person_id, p.name, COUNT(*) AS count
        FROM person p
        JOIN document_person dp ON p.person_id = dp.person_id
        JOIN document_topic dt ON dp.document_id = dt.document_id
        WHERE dt.topic_id = $1
        GROUP BY p.person_id, p.name
        ORDER BY count DESC
        LIMIT 6
      `, [topic_id]);

      const orgRes = await pool.query(`
        SELECT o.organization_id, o.name, COUNT(*) AS count
        FROM organization o
        JOIN document_organization dorg ON o.organization_id = dorg.organization_id
        JOIN document_topic dt ON dorg.document_id = dt.document_id
        WHERE dt.topic_id = $1
        GROUP BY o.organization_id, o.name
        ORDER BY count DESC
        LIMIT 6
      `, [topic_id]);

      const groupRes = await pool.query(`
        SELECT g.group_id, g.name, COUNT(*) AS count
        FROM "Group" g
        JOIN document_group dg ON g.group_id = dg.group_id
        JOIN document_topic dt ON dg.document_id = dt.document_id
        WHERE dt.topic_id = $1
        GROUP BY g.group_id, g.name
        ORDER BY count DESC
        LIMIT 6
      `, [topic_id]);

      return {
        persons: personsRes.rows.map(row => ({
          id: row.person_id,
          name: row.name,
          count: parseInt(row.count),
        })),
        organizations: orgRes.rows.map(row => ({
          id: row.organization_id,
          name: row.name,
          count: parseInt(row.count),
        })),
        groups: groupRes.rows.map(row => ({
          id: row.group_id,
          name: row.name,
          count: parseInt(row.count),
        })),
      };
    },
    documents: () => [],
    dossier: () => null,
    events: () => [],
    groups: () => [],
    organizations: () => [],
    people: () => [],
  },
};