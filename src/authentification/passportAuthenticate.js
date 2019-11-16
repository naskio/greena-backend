/**
 * get the token and decode it and pass it to (verity in JWTStrategy)
 * accepting PUBLIC => no token provided
 * user in: req.user (can be undefined if no token provided) (case PUBLIC).
 * this middleware to enable when no Token is provided (else  passport.authentificate will return 401 error)
 * - useful for the case: PUBLIC
 * @param passport
 * @returns {function(*=, *=, *=): (*|void)}
 */

export default (passport) => (req, res, next) => {
    return passport.authenticate('jwt', {session: false},
        // after the verify callback (check implementation in the JWTStrategy)
        (err, user, info) => {
            if (err) {
                return next(err, null);
            } else {
                req.user = user;
                return next();
            }
        }
    )(req, res, next);
}
