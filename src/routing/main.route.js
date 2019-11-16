import {Router} from 'express';
import {asyncMiddleware} from "../utils";
import {
    helloWorld,
} from '../controllers/main.controller';

/**
 * Hello World! message
 * @param passport
 * @returns {Router}
 */
export default (passport) => {
    const router = Router();
    router.get('/',
        asyncMiddleware(helloWorld),
    );
    return router;
};
