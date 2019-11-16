import crypto from 'crypto';
import {argon2i} from 'argon2-ffi';
import jwt from 'jsonwebtoken';
import * as dotEnv from 'dotenv';

dotEnv.config();
const {SECRET_KEY} = process.env;

/**
 * get a random Buffer of this size.
 * @param size {number}
 * @returns {Promise<Buffer>}
 */
const randomBytes = (size) =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(size, (err, buf) => {
            if (err) {
                reject(err);
            } else {
                resolve(buf);
            }
        })
    });

/**
 * get a Salt.
 * for hashing the password
 * @returns {Promise<Buffer>}
 */
const generateSalt = async () => {
    return randomBytes(32);
};

/**
 * get a hashed string of the password.
 * used during the registration or changing password.
 * @param password {String}
 * @returns {Promise<String>}
 */
export const hash = async (password) => {
    const salt = await generateSalt();
    return argon2i.hash(password, salt);
};


/**
 * verify if the password correspond to the hashed password from DB.
 * used when logging and before generating the token.
 * @param hashedPassword {String}
 * @param password {String}
 * @returns {Promise<Boolean>}
 */
export const verify = async (hashedPassword, password) => {
    return argon2i.verify(hashedPassword, password);
};

/**
 * get token from Headers.
 * extract the token from the headers of the request.
 * @param headers {Object}
 * @returns {string}
 */
export const getTokenFromHeaders = (headers) => {
    if (headers && headers.authorization) {
        const arr = headers.authorization.split(' ');
        if (arr && arr.length === 2) {
            const [type, token] = arr;
            if (type === 'Bearer') {
                return token;
            }
        }
    }
};

/**
 * return a token or error.
 * Used to encapsulate data inside Token and generate it.
 * @param data {Object}
 * @returns {Promise<String>}
 */
export const generateToken = (data) => new Promise((resolve, reject) => {
    const TOKEN_DURATION = 31556952; // 1 year in seconds
    jwt.sign(data, SECRET_KEY, {expiresIn: TOKEN_DURATION}, (err, token) => {
        if (!err) {
            resolve(token);
        } else {
            reject(err);
        }
    });
});

/**
 * return the decoded Object or error.
 * used to extract data from Token and verify if a valid token.
 * @param token {String}
 * @returns {Promise<Object>}
 */
export const decodeToken = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (!err) {
            resolve(decoded);
        } else {
            reject(err);
        }
    });
});








