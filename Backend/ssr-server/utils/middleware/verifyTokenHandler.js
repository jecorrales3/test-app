const jwt = require('jsonwebtoken');
const pool = require('../../lib/db');
const { config } = require('../../config');

function verifyToken(req, res, next)
{
  // Api Info
  const SECRET_API  = config.secretApi;

  if (!req.headers.authorization) {
    console.log("HEADERS AUTH");
    return res.status(403).send({
      status: 403,
      server: 'Unauthorized request',
      message:'No token provided.'
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(403).send({
      status: 403,
      server: 'Unauthorized request',
      message:'No token provided.'
    });
  }

  // Verify access
  const payload = jwt.verify(token, SECRET_API);
  // Get ID
  const userId  = payload._id;

  next();
};


module.exports = verifyToken;
