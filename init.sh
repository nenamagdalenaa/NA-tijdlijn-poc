#!/bin/bash
set -e

echo "Extracting backup..."
gunzip -c /docker-entrypoint-initdb.d/backup.tar.gz > /tmp/backup.tar

echo "Restoring database from tar..."
pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" /tmp/backup.tar
