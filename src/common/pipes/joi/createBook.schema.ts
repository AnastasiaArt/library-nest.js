import * as Joi from 'joi';

export const createBookSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  authors: Joi.string().required(),
  favorite: Joi.string(),
  fileCover: Joi.string(),
  fileName: Joi.string(),
  fileBook: Joi.string()
})