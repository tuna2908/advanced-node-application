jest.setTimeout(30000);

import { userSchema } from '../models/User';

import mongoose from 'mongoose';;
import { keys } from '../config/keys';
import { blogSchema } from '../models/Blog';

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });
mongoose.model('Blog', blogSchema);
mongoose.model('User', userSchema);
