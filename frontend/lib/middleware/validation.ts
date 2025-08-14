import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

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

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
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

export function validateSignup(data: unknown) {
  const { error } = userSchema.validate(data);
  if (error) {
    return { isValid: false, message: error.details[0].message };
  }
  return { isValid: true };
}

export function validateLogin(data: unknown) {
  const { error } = loginSchema.validate(data);
  if (error) {
    return { isValid: false, message: error.details[0].message };
  }
  return { isValid: true };
}

export function validateCompetition(data: unknown) {
  const { error } = competitionSchema.validate(data);
  if (error) {
    return { isValid: false, message: error.details[0].message };
  }
  return { isValid: true };
}

export async function withValidation<T>(
  request: NextRequest,
  validator: (data: unknown) => { isValid: boolean; message?: string },
  handler: (request: NextRequest, data: T) => Promise<NextResponse>,
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validation = validator(body);

    if (!validation.isValid) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 },
      );
    }

    return await handler(request, body as T);
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
}
