import {Router} from 'express';
import loginRoute from './login.route';
import registerRoute from './register.route';
import profileRoute from './profile.route';
import categoriesRoute from './categories.route';
import subCategoriesRoute from './sub_categories.route';
import productsRoute from './products.route';

export default (passport) => {
    const router = Router();
    /**
     * routes
     */
    router.use('/login', loginRoute(passport));
    router.use('/register', registerRoute(passport));
    router.use('/profile', profileRoute(passport));
    router.use('/categories', categoriesRoute(passport));
    router.use('/sub-categories', subCategoriesRoute(passport));
    router.use('/products', productsRoute(passport));
    return router;
}
