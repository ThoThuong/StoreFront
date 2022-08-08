import express, { Request, Response } from 'express';
import OrderHandler from '../handlers/order.handler';

const orderHandeler: OrderHandler = new OrderHandler();
const router = express.Router();

router.get('/test-order-router', (req: Request, res: Response) => {
  res.status(200).json({ content: 'order-router-ok' });
});

router.get('/', orderHandeler.index);
router.post('/', orderHandeler.create);
router.get('/:id', orderHandeler.read);
router.put('/:id', orderHandeler.update);
router.delete('/:id', orderHandeler.delete);


export { router as orderRouters };