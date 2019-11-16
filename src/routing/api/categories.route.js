import {Router} from 'express';
import {asyncMiddleware} from "../../utils";
import roleAuthorization from "../../authentification/roleAuthorization";
import passportAuthenticate from "../../authentification/passportAuthenticate";
import {
    getAllCategories,
    createCategory,
    deleteCategory,
    updateCategory,
} from '../../controllers/category.controller';
import {
    ADMIN,
    // PUBLIC,
    // USER,
} from "../../authentification";

export default (passport) => {
    const router = Router();
    router.get('/',
        // passportAuthenticate(passport),
        // roleAuthorization([PUBLIC, USER, ADMIN]),
        asyncMiddleware(getAllCategories),
    );
    router.post('/',
        passportAuthenticate(passport),
        roleAuthorization([ADMIN]),
        asyncMiddleware(createCategory),
    );
    router.delete('/:_id',
        passportAuthenticate(passport),
        roleAuthorization([ADMIN]),
        asyncMiddleware(deleteCategory),
    );
    router.put('/:_id',
        passportAuthenticate(passport),
        roleAuthorization([ADMIN]),
        asyncMiddleware(updateCategory),
    );
    return router;
};
