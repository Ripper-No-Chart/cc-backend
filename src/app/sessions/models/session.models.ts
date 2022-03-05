import mongoose, { Schema, model, ObjectId } from 'mongoose';

export interface SessionInterface extends mongoose.Document {
  user: ObjectId;
  action: string;
  created_at: number;
}

const SessionSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    action: { type: String, required: true },
    created_at: { type: Number, required: true },
  },
  { versionKey: false }
);

export default model<SessionInterface>('session', SessionSchema);