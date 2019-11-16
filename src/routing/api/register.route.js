import {Router} from 'express';
import {asyncMiddleware} from "../../utils";
import {
    register,
} from '../../controllers/user.controller';

export default (passport) => {
    const router = Router();
    router.post('/',
        asyncMiddleware(register),
    );
    return router;
};
