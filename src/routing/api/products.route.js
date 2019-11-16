import {Router} from 'express';
import {asyncMiddleware} from "../../utils";
import roleAuthorization from "../../authentification/roleAuthorization";
import passportAuthenticate from "../../authentification/passportAuthenticate";
import {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
} from '../../controllers/product.controller';
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
        asyncMiddleware(getAllProducts),
    );
    router.post('/',
        passportAuthenticate(passport),
        roleAuthorization([ADMIN]),
        asyncMiddleware(createProduct),
    );
    router.delete('/:_id',
        passportAuthenticate(passport),
        roleAuthorization([ADMIN]),
        asyncMiddleware(deleteProduct),
    );
    router.put('/:_id',
        passportAuthenticate(passport),
        roleAuthorization([ADMIN]),
        asyncMiddleware(updateProduct),
    );
    return router;
};
