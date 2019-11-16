import apiRouter from './api';
import mainRouter from './main.route';
import * as dotEnv from 'dotenv';

dotEnv.config();
const {NODE_ENV} = process.env;

export default (app, passport) => {
    /**
     * routes
     */
    app.use('', mainRouter(passport));
    app.use('/api', apiRouter(passport));


    /**
     * 404 errors
     */
    app.use((req, res, next) => {
        const error = new Error('Not Found!');
        error.status = 404;
        return next(error);
    });


    /**
     * Error handling (response)
     */
    app.use((error, req, res, next) => {
        let status = error.status || 500;
        let message = (status === 500 && NODE_ENV === 'production') ? 'Server Internal Error' : error.message;
        if (error.name === 'ValidationError') {
            status = 400;
        }
        res.status(status);
        res.json({
            error: {
                message,
            },
        });
    });

    return app;
}
