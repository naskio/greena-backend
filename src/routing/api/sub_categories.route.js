import {Router} from 'express';
import {asyncMiddleware} from "../../utils";
import roleAuthorization from "../../authentification/roleAuthorization";
import passportAuthenticate from "../../authentification/passportAuthenticate";
import {
    getAllSubCategories,
    createSubCategory,
    deleteSubCategory,
    updateSubCategory,
} from '../../controllers/subCategory.controller';
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
        asyncMiddleware(getAllSubCategories),
    );
    router.post('/',
        passportAuthenticate(passport),
        roleAuthorization([ADMIN]),
        asyncMiddleware(createSubCategory),
    );
    router.delete('/:_id',
        passportAuthenticate(passport),
        roleAuthorization([ADMIN]),
        asyncMiddleware(deleteSubCategory),
    );
    router.put('/:_id',
        passportAuthenticate(passport),
        roleAuthorization([ADMIN]),
        asyncMiddleware(updateSubCategory),
    );
    return router;
};
