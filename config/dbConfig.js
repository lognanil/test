const { Pool } = require('pg');
const atob = require('atob');
const { dbCredentials } = require('./dbCredentials');

const dbc = dbCredentials();

const pool = new Pool({
  user: atob(dbc.encodedUser),
  host: atob(dbc.encodedHost),
  database: atob(dbc.enCodedDatabase),
  password: atob(dbc.encodedPassword),
  port: atob(dbc.encodedPort)
});

module.exports = pool;