import {Router} from 'express';
import {asyncMiddleware} from "../../utils";
import {
    login,
} from '../../controllers/user.controller';

export default (passport) => {
    const router = Router();
    router.post('/',
        asyncMiddleware(login(passport)),
    );
    return router;
};
