import mongoose, { Schema } from 'mongoose';;

export const userSchema = new Schema({
  googleId: String,
  displayName: String
});

export type MongooseUserModel = mongoose.Model<typeof userSchema>
