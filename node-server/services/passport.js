import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';;
import { keys } from '../config/keys';

export default class PasspostService {
  constructor() {
    this.userScheme = mongoose.model('User');
  }

  init() {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      this.userScheme.findById(id).then(user => {
        done(null, user);
      });
    });

    passport.use(
      new GoogleStrategy(
        {
          callbackURL: '/auth/google/callback',
          clientID: keys.googleClientID,
          clientSecret: keys.googleClientSecret,
          proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const existingUser = await this.userScheme.findOne({ googleId: profile.id });
            if (existingUser) {
              return done(null, existingUser);
            }
            const user = await new this.userScheme({
              googleId: profile.id,
              displayName: profile.displayName
            }).save();
            done(null, user);
          } catch (err) {
            done(err, null);
          }
        }
      )
    );
  }
}




