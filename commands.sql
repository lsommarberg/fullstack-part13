mydb=# CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);
CREATE TABLE
mydb=# INSERT INTO blogs (author, url, title, likes)
VALUES ('Dan Abramov', 'https://exampleaddress.com', 'On let vs const', 0);
INSERT 0 1
mydb=# INSERT INTO blogs (author, url, title, likes)
VALUES ('Laurenz Albe', 'https://example.com', 'Gaps in sequences in PostgreSQL', 2);
INSERT 0 1