Example link : [Quick Introduction | ent](https://entgo.io/docs/getting-started/)


start a postgres docker container for testing.

```
docker run --name my-postgres-container -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

Postgres cheetsheet of commands : https://www.postgresqltutorial.com/postgresql-cheat-sheet/

connect with psql
```
psql --host=localhost --port=5432 --username=postgres --password
```
List all databases in the PostgreSQL database server
```
\l
```

Connect to a specific database:
```
\c database_name;
```

To quit the psql:
```
\q
```

Create a new database:
```
CREATE DATABASE [IF NOT EXISTS] db_name;
```

Create a new table or a temporary table
```
CREATE [TEMP] TABLE [IF NOT EXISTS] table_name(
   pk SERIAL PRIMARY KEY,
   c1 type(size) NOT NULL,
   c2 type(size) NULL,
   ...
);
```


## Errors and fixes

If you get "SSL is not enabled on the server" then [disable the SSL](https://stackoverflow.com/questions/21959148/ssl-is-not-enabled-on-the-server) on postgres server by adding  ``sslmode=disable`` to the connection string. 