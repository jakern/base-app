const express = require('express');
const userManager = require('express-user-manager');
const expressApp = express();
const http = require("http");
/**
 * Setup the datastore using any of the currently supported database adapters:
 *   - mongoose: for MongoDB
 *   - sequelize: for any of the other supported database engines:
 *     MySQL | MariaDB | SQLite | Microsoft SQL Server | Postgres | In-memory DB
 *     (See the section on "Built-in data stores" for supported database engines)
 */
const dbAdapter = 'sequelize'; // OR 'mongoose'
const store = userManager.getDbAdapter(dbAdapter);

// Bind the routes under [apiMountPoint] (default: ***/api/users***):
userManager.listen(expressApp, apiMountPoint = '/api/users', customRoutes = {});

(async function() {
  const server = http.createServer(expressApp);

  // Establish a connection to the data store
  // Ensure the db is connected before binding the server to the port
  await store.connect({
    // host: DB_HOST, // optional, default: 'localhost'
    // port: DB_PORT, // optional
    // user: DB_USERNAME, // optional
    // pass: DB_PASSWORD, // optional
    // engine: DB_ENGINE, // optional if the adapter is "mongoose" or if the value is "memory" and the adapter is "sequelize"; required otherwise
    // dbName: DB_DBNAME, // optional, default: 'users'
    // storagePath: DB_STORAGE_PATH, // optional, required if "engine" is set to "sqlite"
    // debug: DB_DEBUG, // optional, default: false
    // exitOnFail: EXIT_ON_DB_CONNECT_FAIL // optional, default: true
  });

  // Proceed with normal server initialization tasks
  server.listen(8080);
//   server.on('error', onError);
//   server.on('listening', onListening);
 })();

// Optionally listen for and handle events
// (See the Emitted events section for more)
// userManager.on(EVENT_NAME, function(data) {
  // do something with data
// });