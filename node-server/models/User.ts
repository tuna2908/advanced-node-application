import mongoose from 'mongoose';;
const { Schema } = mongoose;

export const userSchema = new Schema({
  googleId: String,
  displayName: String
});

