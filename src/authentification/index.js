import * as passportLocal from 'passport-local';
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt';
import User from '../models/user.model';
import * as dotEnv from 'dotenv';
import {verify} from "../utils/auth";
import _ from 'lodash';

const {Strategy: LocalStrategy} = passportLocal;

dotEnv.config();
const {SECRET_KEY} = process.env;

/**
 * rules
 */
export const PUBLIC = 'public';
export const ADMIN = 'admin';
export const USER = 'user';

/**
 * configuring passport middle-ware strategies
 */

export default (app, passport) => {
    app.use(passport.initialize({}));

    /**
     * local Strategy auth => email + password
     * use passport.authenticate('local') as route middleware
     */
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false,
            // passReqToCallback: false,
            // usernameQueryFields: ['email'],
        },
        async (email, password, done) => {
            if (!email || !password) {
                const error = new Error('Bad Request');
                error.status = 400;
                return done(error, false);
            }
            let user = await User.findOne({
                email,
            }).lean();
            if (!user || !(await verify(user.password, password))) {
                const error = new Error('Invalid email or password');
                error.status = 401;
                return done(error, false);
            } else {
                user = _.omit(user, [
                    'password',
                ]);
                return done(null, user);
            }
        }
    ));

    /**
     * JWT Strategy auth => token from Headers
     * use passport.authenticate('jwt') as route middleware
     */
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
            // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
            secretOrKey: SECRET_KEY,
        },
        (tokenPayload, done) => {
            User.findOne({_id: tokenPayload._id,}, {password: 0,})
                .then(user => {
                    if (!!user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch(err => {
                    const error = new Error('Unauthorized');
                    error.status = 401;
                    return done(error, false);
                });
        }
    ));
}
