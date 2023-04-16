\echo 'Delete and recreate mapApplicationDB db?'
\prompt 'Return for yes or control C to cancel' yes

DROP DATABASE IF EXISTS mapApplicationDB;
CREATE DATABASE mapApplicationDB;
\connect mapApplicationDB

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tripnames;
DROP TABLE IF EXISTS tripitems;

CREATE TABLE users (
  username varchar(255) PRIMARY KEY NOT NULL,
  password varchar(255) NOT NULL,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  privilegelevel varchar(255) NOT NULL
);

CREATE TABLE tripnames (
  id varchar(255) PRIMARY KEY NOT NULL,
  tripname varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE
);

-- CREATE TABLE tripitems (
--   -- id SERIAL PRIMARY KEY,
--   tripname varchar(60) NOT NULL,
--   type varchar(60) NOT NULL,
--   route varchar(60) NOT NULL,
--   name varchar(1000) NOT NULL,
--   description varchar(10000) NOT NULL,
--   park varchar(1000) NOT NULL,
--   latitude numeric NOT NULL,
--   longitude numeric NOT NULL,
--   FOREIGN KEY (id) REFERENCES tripnames (id) ON DELETE CASCADE
-- );