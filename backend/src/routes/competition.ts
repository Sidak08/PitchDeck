import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {
  createCompetition,
  getCompetitions,
} from "../controllers/competitionController";
import { competitionSchema } from "../middleware/validateUser";

const validateCompetition = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = competitionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const router = Router();

router.post("/", validateCompetition, createCompetition);
router.get("/", getCompetitions);

export default router;
