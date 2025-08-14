import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  school: string;
  grade: string;
  approved: boolean;
  favourites: ObjectId[];
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  school: { type: String, required: true },
  grade: { type: String, required: true },
  approved: { type: Boolean, default: true },
  favourites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Competition", default: [] },
  ],
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
