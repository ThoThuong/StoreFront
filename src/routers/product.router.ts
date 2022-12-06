import { Request, Response, Router } from 'express';

import ProductHandler from '../handlers/product.handler';
import Authentication from '../middleware/auth.middleware';

const productHandler: ProductHandler = new ProductHandler();
const authentication: Authentication = new Authentication();
const router: Router = Router();

router.get('/test-product-router', (req: Request, res: Response) => {
  res.status(200).json({ content: 'product-router-ok' })
});

router.get('/', productHandler.index);
router.get('/:id', productHandler.read);
router.post('/', authentication.auth, productHandler.create);
router.put('/:id', authentication.auth, productHandler.update);
router.delete('/:id', authentication.auth, productHandler.deleteProduct);

export { router as productRouters };
