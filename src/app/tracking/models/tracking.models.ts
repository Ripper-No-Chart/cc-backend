import mongoose, { Schema, model, ObjectId } from 'mongoose';

export interface TrackingInterface extends mongoose.Document {
  user: ObjectId;
  latitude: number;
  longitude: number;
  created_at: number;
}

const TrackingSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    created_at: { type: Number, required: true },
  },
  { versionKey: false }
);

export default model<TrackingInterface>('tracking', TrackingSchema);