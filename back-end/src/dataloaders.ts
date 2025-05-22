import DataLoader from 'dataloader';
import { pool } from './db';

export const createDataloaders = () => ({
    dossierLoader: new DataLoader(async (dossierIds: readonly string[]) => {
        const res = await pool.query(
            `SELECT dossier_id, title, sourceurl FROM dossier WHERE dossier_id = ANY($1)`,
            [dossierIds]
        );

        const rows = res.rows;
        const map = new Map(rows.map((row) => [row.dossier_id, {
            dossierId: row.dossier_id,
            title: row.title,
            sourceUrl: row.sourceurl,
        }]));

        return dossierIds.map(id => map.get(id) || null);
    }),

    topicLoader: new DataLoader(async (documentIds: readonly string[]) => {
        const res = await pool.query(
            `SELECT dt.document_id, t.topic_id, t.name, dt.probability
       FROM document_topic dt
       JOIN topic t ON t.topic_id = dt.topic_id
       WHERE dt.document_id = ANY($1)`,
            [documentIds]
        );

        const map = new Map<string, any[]>();
        for (const row of res.rows) {
            const docId = row.document_id;
            if (!map.has(docId)) map.set(docId, []);
            map.get(docId)!.push({
                topicId: row.topic_id,
                name: row.name,
                probability: row.probability,
            });
        }

        return documentIds.map(id => map.get(id) || []);
    }),

    personLoader: new DataLoader(async (documentIds: readonly string[]) => {
        const res = await pool.query(
            `SELECT dp.document_id, p.person_id, p.name
       FROM document_person dp
       JOIN person p ON p.person_id = dp.person_id
       WHERE dp.document_id = ANY($1)`,
            [documentIds]
        );

        const grouped = new Map<string, any[]>();
        for (const row of res.rows) {
            if (!grouped.has(row.document_id)) grouped.set(row.document_id, []);
            grouped.get(row.document_id)!.push({
                personId: row.person_id,
                name: row.name,
            });
        }

        return documentIds.map(id => grouped.get(id) || []);
    }),

    organizationLoader: new DataLoader(async (documentIds: readonly string[]) => {
        const res = await pool.query(
            `SELECT dorg.document_id, o.organization_id, o.name
       FROM document_organization dorg
       JOIN organization o ON o.organization_id = dorg.organization_id
       WHERE dorg.document_id = ANY($1)`,
            [documentIds]
        );

        const grouped = new Map<string, any[]>();
        for (const row of res.rows) {
            if (!row.organization_id) continue;
            if (!grouped.has(row.document_id)) grouped.set(row.document_id, []);
            grouped.get(row.document_id)!.push({
                organizationId: row.organization_id,
                name: row.name,
            });
        }

        return documentIds.map(id => grouped.get(id) || []);
    }),

    groupLoader: new DataLoader(async (documentIds: readonly string[]) => {
        const res = await pool.query(
            `SELECT dg.document_id, g.group_id, g.name
       FROM document_group dg
       JOIN "Group" g ON g.group_id = dg.group_id
       WHERE dg.document_id = ANY($1)`,
            [documentIds]
        );

        const grouped = new Map<string, any[]>();
        for (const row of res.rows) {
            if (!grouped.has(row.document_id)) grouped.set(row.document_id, []);
            grouped.get(row.document_id)!.push({
                groupId: row.group_id,
                name: row.name,
            });
        }

        return documentIds.map(id => grouped.get(id) || []);
    }),
});
