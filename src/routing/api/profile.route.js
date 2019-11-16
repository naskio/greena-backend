import {Router} from 'express';
import {asyncMiddleware} from "../../utils";
import roleAuthorization from "../../authentification/roleAuthorization";
import passportAuthenticate from "../../authentification/passportAuthenticate";
import {
    getProfile,
    updateProfile,
} from '../../controllers/user.controller';
import {ADMIN, USER} from "../../authentification";

export default (passport) => {
    const router = Router();
    router.get('/',
        passportAuthenticate(passport),
        roleAuthorization([USER, ADMIN]),
        asyncMiddleware(getProfile),
    );
    router.put('/',
        passportAuthenticate(passport),
        roleAuthorization([USER, ADMIN]),
        asyncMiddleware(updateProfile),
    );
    return router;
};
