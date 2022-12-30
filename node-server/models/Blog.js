import mongoose from 'mongoose';

const { Schema } = mongoose;

export const blogSchema = new Schema({
  title: String,
  content: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});


