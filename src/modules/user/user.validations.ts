import { Joi } from "express-validation";

export const createValidation = {
  body: Joi.object({
    username: 
        Joi.string()
        .required()
        .min(8)
        .max(20)
        .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
        .messages({
          "string.empty": "El nombre de usuario es requerido",
          "string.pattern.base": "El nombre de usuario debe contener al menos una letra mayúscula y un número, y no puede contener signos",
          "string.min": "El nombre de usuario de tener mínimo 8 caracteres"
    }),
    password: 
        Joi.string()
        .required()
        .min(8)
        .max(100)
        .regex(/^(?=.*[A-Z])(?=.*\W)(?!.*\s).+$/)
        .messages({
          "string.pattern.base": "La contraseña debe contener al menos una letra mayúscula, un signo y no debe contener espacios"
        }),
    idCard: 
        Joi.string()
        .min(10)
        .max(10)
        .regex(/^(?!.*(\d)\1{3})\d{10}$/)
        .messages({
          "string.regex": "La identificacion debe contener solo digitos y no puede tener 4 veces seguidas el mismo"
        }),
    idRole: 
      Joi.number()
      .required(),
    firstName: Joi.string().required(),
    middleName: Joi.string().required(),
    firstLastname: Joi.string().required(),
    secondLastname: Joi.string().required(),
    email: Joi.string().email().required(),
    birthDate: Joi.string().required(),
    status: Joi.boolean().default(true),
    sessionActive: Joi.boolean().default(false)
  })
}

export const idParamValidation = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

export const putValidation = {
  params: idParamValidation.params,
  body: Joi.object({
    username: 
        Joi.string()
        .required()
        .min(8)
        .max(20)
        .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
        .messages({
          "string.pattern": "El nombre de usuario debe contener al menos una letra mayúscula y un número, y no puede contener signos",
          "string.empty": "El nombre de usuario es requerido",
          "string.min": "El nombre de usuario de tener mínimo 8 caracteres"
    }),
    idCard: 
        Joi.string()
        .min(10)
        .max(10)
        .regex(/^\d+$/)
        .messages({
          "string.regex": "La identificacion debe contener solo digitos"
        }),
    idRole: Joi.number().required(),
    firstName: Joi.string().required(),
    middleName: Joi.string().required(),
    firstLastname: Joi.string().required(),
    secondLastname: Joi.string().required(),
    email: Joi.string().email().required(),
    birthDate: Joi.string().required(),
    status: Joi.boolean().required()
  })
}