import { Joi } from "express-validation";

export const loginValidation = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
}

export const profileValidation = {
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
    idCard: 
        Joi.string()
        .min(10)
        .max(10)
        .regex(/^(?!.*(\d)\1{3})\d{10}$/)
        .messages({
          "string.regex": "La identificacion debe contener solo digitos y no puede tener 4 veces seguidas el mismo"
        }),
    firstName: Joi.string().required(),
    middleName: Joi.string().required(),
    firstLastname: Joi.string().required(),
    secondLastname: Joi.string().required(),
    birthDate: Joi.string().required(),
  })
}

export const updatePasswordValidation = {
  body: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: 
      Joi.string()
      .required()
      .min(8)
      .max(100)
      .regex(/^(?=.*[A-Z])(?=.*\W)(?!.*\s).+$/)
      .messages({
        "string.pattern.base": "La contraseña debe contener al menos una letra mayúscula, un signo y no debe contener espacios"
      }),
    repeatPassword:
      Joi.equal(Joi.ref('newPassword'))
      .messages({
        "any.only": "Las contraseñas no coinciden"
      })
  })
}