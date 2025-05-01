import { pool } from './db';

export const resolvers = {
  Query: {
    documents: async (_: any, args: { limit: number }) => {
      const result = await pool.query(
        'SELECT * FROM document ORDER BY date_scraped DESC LIMIT $1',
        [args.limit]
      );
      return result.rows;
    },
  },
};
