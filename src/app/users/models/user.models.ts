import mongoose, { Schema, model } from 'mongoose';

export interface UserInterface extends mongoose.Document {
  primary_data: {
    name: string;
    last_name: string;
    nickname: string;
    phone: number;
  };
  billing_data: {
    address: string;
    zip_code: number;
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
    billing_data: {
      address: { type: String, required: false, default: '' },
      zip_code: { type: Number, required: false, default: 0 },
    },
    createdAt: { type: Number, inmutable: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

export default model<UserInterface>('users', UserSchema);
