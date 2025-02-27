const { createClient } = require('@libsql/client');
const { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } = require('../../config/config.js');

const client = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN
});

module.exports = {
    client
}