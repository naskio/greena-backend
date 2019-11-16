import _ from "lodash";
import User from "../models/user.model";
import {generateToken, hash} from "../utils/auth";
import {passwordStrengthRegex} from "../utils/regex";

/**
 * registering new user, and returning it + a generated Token
 * PUBLIC endpoint
 * 1- used to create a new user
 * @param req
 * @param res
 * @param next
 */
export const register = async (req, res, next) => {
    const {firstName, lastName, phone, email, password} = req.body;
    // check request
    if (!firstName || !lastName || !phone || !email || !password) {
        const error = new Error('Wrong Request');
        error.status = 400;
        return next(error);
    }
    // verifying the password strength
    if (!passwordStrengthRegex.test(password)) {
        const error = new Error('Password should be at least 8 chars.');
        error.status = 400;
        return next(error);
    }
    // creating new user
    const newInstance = new User({
        firstName,
        lastName,
        phone,
        email,
        password: await hash(password),
    });

    let user = (await newInstance.save()).toObject();
    user = _.omit(user, [
        'password',
    ]);

    // returning the new user and a token
    return res.status(200).json({
        token: await generateToken({
            _id: user._id,
            email: user.email,
        }),
        user,
    });
};


/**
 * get a new token, using Phone + password
 * @param passport
 * @returns {function(*=, *=, *=): (*|void)}
 */
export const login = (passport) => (req, res, next) => {
    return passport.authenticate('local', {session: false},
        // after the verify callback (check implementation in the JWTStrategy)
        async (err, userr, info) => {
            if (err || !userr) {
                const error = new Error(err ? err.message : 'Invalid email or password');
                error.status = 401;
                return next(error, false);
            } else {
                const user = _.omit(userr, [
                    'password',
                ]);
                // returning the new user and a token
                return res.status(200).json({
                    token: await generateToken({
                        _id: user._id,
                        email: user.email,
                    }),
                    user,
                });
            }
        }
    )(req, res, next);
};

/**
 * get current User Profile
 * @param req
 * @param res
 * @param next
 */
export const getProfile = async (req, res, next) => {
    const currentUser = _.pick(req.user, ['_id', 'firstName', 'lastName', 'email', 'phone', 'role', 'createdAt']);
    if (!currentUser) {
        return res.status(204).json();
    } else {
        return res.status(200).json(currentUser);
    }
};

/**
 * update the current User Profile
 * 1- if phone included (check for code) => sid + code required
 * 2- if password included: validate strength
 * @param req
 * @param res
 * @param next
 */
export const updateProfile = async (req, res, next) => {
    const {_id} = req.user;
    const {firstName, lastName, email, phone, password} = req.body;
    if (!firstName && !lastName && !email && !phone && !password) {
        const error = new Error('Wrong Request');
        error.status = 400;
        return next(error);
    }
    const updates = {
        firstName,
        lastName,
        email,
        phone,
    };

    // if update password
    if (password && !passwordStrengthRegex.test(password)) {
        const error = new Error('Password should be at least 8 chars.');
        error.status = 400;
        return next(error);
    } else if (password) {
        updates.password = await hash(password);
    }

    // update profile
    const updatedInstance = await User.findOneAndUpdate(
        {
            _id: _id,
        },
        updates,
        {
            useFindAndModify: false,
            new: true,
            runValidators: true,
            context: 'query',
            fields: {password: 0},
        }).lean();
    if (!updatedInstance) {
        const error = new Error('Not found');
        error.status = 404;
        return next(error);
    } else {
        return res.status(200).json(updatedInstance);
    }
};



