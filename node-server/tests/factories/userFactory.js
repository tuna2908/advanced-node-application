import mongoose from 'mongoose';;
const User = mongoose.model('User');

export const userFactory = () => {
  return new User({}).save();
};
