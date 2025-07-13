import Competition from "../models/Competition";
import { Request, Response } from "express";

export const createCompetition = async (req: Request, res: Response) => {
  const {
    title,
    organizer,
    logo,
    gradeEligibility,
    deadline,
    prize,
    status,
    description,
    applicationType,
    applyUrl,
    frequency,
    dates,
    location,
    cost,
  } = req.body;
  try {
    const competition = new Competition({
      title,
      organizer,
      logo,
      gradeEligibility,
      deadline,
      prize,
      status,
      description,
      applicationType,
      applyUrl,
      frequency,
      dates,
      location,
      cost,
    });
    await competition.save();
    res.status(201).json({ message: "Competition created", competition });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCompetitions = async (_req: Request, res: Response) => {
  try {
    const competitions = await Competition.find();
    res.status(200).json(competitions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
