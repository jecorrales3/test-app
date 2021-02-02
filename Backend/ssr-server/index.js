const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Settings
const { config } = require('./config');
const app = express();

//Required routes
const authApi = require('./routes/authApi');
const usersApi = require('./routes/users');

//Middleware
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

//Body parser
app.use(express.json());
app.use(cookieParser());

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
