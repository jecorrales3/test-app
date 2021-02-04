const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

//Services
const ApiKeysService = require('../services/apiKeys');
const UsersService = require('../services/users');

//Schemas
const { createUserSchema } = require('../utils/schemas/users');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');

//Settings
const { config } = require('../config');

//Basic strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apikeysService = new ApiKeysService();
  const usersService = new UsersService();

  router.post('/sign-in', async function (req, res, next) {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required!'));
    }

    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          return next(boom.unauthorized());
        }

        req.login(user, { session: false }, async function (error) {
          if (error) {
            return next(error);
          }

          const apiKey = await apikeysService.getApiKey({
            token: apiKeyToken,
          });

          if (!apiKey) {
            return next(boom.unauthorized());
          }

          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '1m',
          });

          return res.status(200).json({
            token,
            user: {
              id,
              name,
              email,
            },
          });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post(
    '/sign-up',
    validationHandler(createUserSchema),
    async function (req, res, next) {
      const { body: user } = req;

      try {
        const userId = await usersService.getUserEmail({ email: user.email });

        if (userId) {
          res.status(200).json({
            message: `Email is invalid or already taken`,
          });
        } else {
          const createdUserId = await usersService.createUser({ user });

          res.status(201).json({
            data: createdUserId,
            message: 'User created',
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  router.get('/logged', async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];

      if (token != 'undefined') {
        jwt.verify(token, config.authJwtSecret, (err, user) => {
          if (err) {
            return res.status(200).json({
              isLoggedIn: false,
            });
          }

          const { sub: id, name, email } = user;

          return res.status(200).json({
            isLoggedIn: true,
            user: {
              id,
              name,
              email,
            },
          });
        });
      } else {
        res.status(200).json({
          isLoggedIn: false,
        });
      }
    } catch (error) {
      next(error);
    }
  });
}

module.exports = authApi;
