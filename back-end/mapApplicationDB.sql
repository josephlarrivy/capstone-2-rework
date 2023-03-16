
\echo 'Delete and recreate mapApplicationDB db?'
\prompt 'Return for yes or control C to cancel' yes

DROP DATABASE IF EXISTS mapApplicationDB;
CREATE DATABASE mapApplicationDB;
\connect mapApplicationDB

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username varchar(255) PRIMARY KEY NOT NULL,
  password varchar(255) NOT NULL,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  privilegelevel varchar(255) NOT NULL
);
