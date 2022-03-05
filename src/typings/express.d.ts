declare module Express {
  export interface Request {
    _id?: ObjectId;
    phone: string;
  }
}
