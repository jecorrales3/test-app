const express = require('express');
const app = express();

//Settings
const { config } = require('./config/index');

//Required routes
const authApi = require('./routes/auth');
const usersApi = require('./routes/users');

//Middleware
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

//Body parser
app.use(express.json());

//Routes
authApi(app);
usersApi(app);

//Catch 404
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//Server listening
app.listen(config.port, function () {
  console.log(`Listening on http://localhost:${config.port}`);
});
