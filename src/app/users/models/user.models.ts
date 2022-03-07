import mongoose, { Schema, model } from 'mongoose';

export interface UserInterface extends mongoose.Document {
  primary_data: {
    name: string;
    last_name: string;
    nickname: string;
    phone: number;
  };
}

const UserSchema = new Schema(
  {
    primary_data: {
      name: { type: String, required: true },
      last_name: { type: String, required: true },
      nickname: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    createdAt: { type: Number, inmutable: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

export default model<UserInterface>('users', UserSchema);
