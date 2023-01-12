import { Schema } from 'mongoose';;

export const userSchema = new Schema({
  googleId: String,
  displayName: String
});

