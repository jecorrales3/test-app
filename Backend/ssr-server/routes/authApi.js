const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const axios = require('axios');

//Settings
const { config } = require('../config');

//Basic strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/auth', router);

  router.post('/sign-in', async function (req, res, next) {
    passport.authenticate('basic', function (error, data) {
      try {
        if (error || !data) {
          return next(boom.unauthorized());
        }

        req.login(data, { session: false }, async function (error) {
          if (error) {
            return next(error);
          }

          const { token, ...user } = data;

          res.cookie('token', token, {
            sameSite: true,
            httpOnly: !config.dev,
            secure: !config.dev,
          });

          res.status(200).json(user);
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', async function (req, res, next) {
    const { body: user } = req;

    try {
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/auth/sign-up`,
        method: 'post',
        data: user,
      });

      if (status !== 201 && status !== 200) {
        return next(boom.badImplementation());
      }

      res.status(201).json({
        message: data.message,
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/logged', async function (req, res, next) {
    try {
      const { token } = req.cookies;

      const { data, status } = await axios({
        url: `${config.apiUrl}/api/auth/logged`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });

      if (status !== 200) {
        return next(boom.badImplementation());
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });
}

module.exports = authApi;
