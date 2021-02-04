const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Settings
const { config } = require('./config');
const app = express();

//Body parser
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

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
