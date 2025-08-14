import mongoose, { Schema, Document } from "mongoose";

export interface ICompetition extends Document {
  title: string;
  organizer: string;
  logo: string;
  gradeEligibility: string;
  deadline: Date;
  prize: string;
  status: string;
  description: string;
  applicationType: string;
  applyUrl: string;
  frequency: string;
  dates: [string, string]; // [start, end] in yy/mm/dd
  location: string;
  cost: string;
}

const CompetitionSchema: Schema = new Schema({
  title: { type: String, required: true },
  organizer: { type: String, required: true },
  logo: { type: String, required: true },
  gradeEligibility: { type: String, required: true },
  deadline: { type: Date, required: true },
  prize: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  applicationType: { type: String, required: true },
  applyUrl: { type: String, required: true },
  frequency: { type: String, required: true },
  dates: { type: [String], required: true },
  location: { type: String, required: true },
  cost: { type: String, required: true },
});

export default mongoose.models.Competition || mongoose.model<ICompetition>("Competition", CompetitionSchema);
