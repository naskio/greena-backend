import {PUBLIC} from "./index";

/**
 * middleware
 * - set the current role. [PUBLIC, USER, ADMIN]
 * - check if authorized (droits d'accés) else return 401 error.
 * @param roles
 * @returns {Function}
 */
export default (roles) => (req, res, next) => {
    const currentUser = req.user;
    if (!currentUser) {
        req.role = PUBLIC;
    } else {
        req.role = currentUser.role;
    }

    if (!roles.includes(req.role)) {
        let error;
        if (req.role === PUBLIC) {
            error = new Error('Unauthorized');
            error.status = 401;
        } else {
            error = new Error('Forbidden');
            error.status = 403;
        }
        return next(error, false);
    }
    return next();
};


