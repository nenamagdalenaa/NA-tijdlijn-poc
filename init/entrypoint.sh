#!/bin/bash
set -e
# Vervang ${READONLY_PASSWORD} in de template
envsubst < /docker-entrypoint-initdb.d/init.sql.template \
        > /docker-entrypoint-initdb.d/init.sql

# Daarna gewoon door naar de originele entrypoint
exec docker-entrypoint.sh "$@"
