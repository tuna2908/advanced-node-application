/**
 * THE ENTRY TESTFILES
 * used to init common global test setup
 */

import { userSchema } from '../models/User';
import mongoose from 'mongoose';;
import { keys } from '../config/keys';
import { blogSchema } from '../models/Blog';
import { jest } from '@jest/globals';

jest.setTimeout(30000);
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.model('Blog', blogSchema);
mongoose.model('User', userSchema);
