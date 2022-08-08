import { Request, Response, Router } from 'express';

import ProductHandler from '../handlers/product.handler';

const productHandler: ProductHandler = new ProductHandler();
const router: Router = Router();

router.get('/test-product-router', (req: Request, res: Response) => {
  res.status(200).json({ content: 'product-router-ok' })
});

router.get('/', productHandler.index);
router.get('/:id', productHandler.read);
router.post('/', productHandler.create);
router.put('/:id', productHandler.update);
router.delete('/:id', productHandler.deleteProduct);

export { router as productRouters };
