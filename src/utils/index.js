/**
 * async middle-ware wrapper to handle errors
 * @param fn<middleware>
 * @returns {function(Request, Response, middleware): Promise<>}
 */
export const asyncMiddleware = fn => (req, res, next) =>
    Promise
        .resolve(fn(req, res, next))
        .catch(next);
