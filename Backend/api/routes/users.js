const express = require('express');
const passport = require('passport');

//Services
const Usersservice = require('../services/users');

//Schemas
const { userIdSchema } = require('../utils/schemas/users');

//Middleware
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

//JWT strategy
require('../utils/auth/strategies/jwt');

function usersApi(app) {
  const router = express.Router();

  app.use('/api/users', router);

  //Services
  const usersService = new Usersservice();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:users']),
    async function (req, res, next) {
      const { tags } = req.query;

      try {
        const users = await usersService.getUsers({ tags });

        res.status(200).json({
          data: users,
          message: 'Users listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/:userId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:users']),
    validationHandler({ userId: userIdSchema }, 'params'),
    async function (req, res, next) {
      const { userId } = req.params;

      try {
        const user = await usersService.getUser({ userId });

        res.status(200).json({
          data: user,
          message: 'User retrieved',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = usersApi;
