const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().min(3).max(200).required(),
  password: Joi.string().min(8).max(200).required(),
});

module.exports = registerSchema;
