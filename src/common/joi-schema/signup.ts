import * as Joi from 'joi';

export const signUpValidation = Joi.object({
  verify: Joi.boolean().valid(true).required(),
  mobile: Joi.number().valid(true).required().min(12),
  fullname: Joi.string().valid(true).required().min(5),
});
