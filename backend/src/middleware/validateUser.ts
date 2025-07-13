import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("competitor", "organizer").required(),
  school: Joi.string().required(),
  grade: Joi.string().valid("9", "10", "11", "12").required(),
  approved: Joi.boolean(),
  favourites: Joi.array().items(Joi.string()),
});

const competitionSchema = Joi.object({
  title: Joi.string().required(),
  organizer: Joi.string().required(),
  logo: Joi.string().required(),
  gradeEligibility: Joi.string().required(),
  deadline: Joi.date().required(),
  prize: Joi.string().required(),
  status: Joi.string().required(),
  description: Joi.string().required(),
  applicationType: Joi.string().required(),
  applyUrl: Joi.string().required(),
  frequency: Joi.string().required(),
  dates: Joi.array()
    .items(Joi.string().pattern(/^\d{2}\/\d{2}\/\d{2}$/))
    .length(2)
    .required(),
  location: Joi.string().required(),
  cost: Joi.string().required(),
});

export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export { competitionSchema };
