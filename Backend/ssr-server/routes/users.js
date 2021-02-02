const express = require('express');
const axios = require('axios');

//Settings
const { config } = require('../config');

function usersApi(app) {
  const router = express.Router();
  app.use('/users', router);

  router.get('/', async function (req, res, next) {
    try {
      const { token } = req.cookies;

      const { data, status } = await axios({
        url: `${config.apiUrl}/api/users`,
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

module.exports = usersApi;
