import { Application } from 'express';

import Authentication from '../middleware/auth.middleware';
import { orderRouters } from './order.router';
import { productRouters } from './product.router';
import { userRouters } from './user.router';




const mainRouter = (app: Application): void => {

};

export { mainRouter as appRouter };

class AppRouter {
    private app!: Application;
    private authentication: Authentication = new Authentication();

    constructor(app: Application) {
        this.app = app;
    }


    init() {
        this.app.use('/products', productRouters);
        this.app.use('/orders', this.authentication.auth, orderRouters);
        this.app.use('/users', userRouters);
    }
}

export default AppRouter;