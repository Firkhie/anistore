CREATE TABLE test (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

INSERT INTO test (name, email) VALUES ('John', 'john.doe@hasura.io');
INSERT INTO test (name, email) VALUES ('Jane', 'jane.doe@hasura.io');
