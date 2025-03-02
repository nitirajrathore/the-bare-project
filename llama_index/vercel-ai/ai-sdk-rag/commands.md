## Source 


## start postgres
```
docker compose -f .\postgres-docker-compose.yml  up -d
```

### Check if pgvector is installed.

```
docker exec -it vercel-ai-rag-postgres psql -U myuser -d ai_rag
```

in psql shell - install extension
```
CREATE EXTENSION IF NOT EXISTS vector;
```

confirm if pgvector is installed
```
SELECT * FROM pg_extension WHERE extname = 'vector';
```
