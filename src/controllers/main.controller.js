/**
 * hello world function
 * @param req
 * @param res
 * @param next
 */
export const helloWorld = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'Hello World!',
    });
};
