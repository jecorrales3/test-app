const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().max(100);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().max(100);

const createUserSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
};

module.exports = {
  userIdSchema,
  createUserSchema,
};
