jest.setTimeout(30000);

require('../models/User');

import mongoose from 'mongoose';;
import {keys} from '../config/keys';

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });
