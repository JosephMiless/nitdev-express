import joi from "joi";

export const loginUserSchema = joi.object({
    email : joi.string().email().required(),
    password: joi.string().min(3).max(7).required()
});

export const signUpUserSchema = joi.object({
    id: joi.number().required(),
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()
});