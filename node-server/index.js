import { keys } from './config/keys';
import mongoose from 'mongoose';
import express from "express";
import passport from 'passport';

import { blogSchema } from './models/Blog';
import { userSchema } from './models/User';
import PassportService from './services/passport';
import { authRoute } from './routes/authRoutes';
import { blogRoute } from './routes/blogRoutes';
import bodyParser from 'body-parser';
import CookieSession from 'cookie-session';
import path from 'path';

//connect DB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.model('Blog', blogSchema);
mongoose.model('User', userSchema);

// const client = new MongoClient(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("blog_dev").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const app = express();

const userService = new PassportService();
userService.init();

app.use(bodyParser.json());
app.use(
  CookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoute(app);
blogRoute(app);

app.get('/', (req, res) => { res.send("welcom to the site") })

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('../react-client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('react-client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});

