import humps from 'humps';
import { Pool } from 'pg';

import dbConnect from '../database/connect';

export interface OrderProduct {
    orderId?: string
    productId: string,
    quantity: number
}

export interface Order {
    id?: string;
    products?: OrderProduct[];
    userId?: string;
    status?: boolean;
}

export class OrderSchemal {
    private _dbConnect!: Pool;

    constructor() {
        this._dbConnect = dbConnect;
    }

    async index(): Promise<Order[]> {
        try {
            const _dbConnect = await this._dbConnect.connect();
            const sqlQueryOrders = `
            select os.*, (
                select array_to_json(array_agg(row_to_json(order_products))) 
                    from (
                        select p.id, p."name", p.price, op.quantity from order_products op join products p on op.product_id = p.id 
                    ) order_products
                ) as products
            from orders os`;
            const { rows } = await _dbConnect.query(sqlQueryOrders);
            _dbConnect.release();

            return humps.camelizeKeys(rows) as Order[];
        } catch (err: any) {
            throw new Error(`Can not find any products. ${err}`);
        }
    }

    async create(order: Order): Promise<Order> {
        const { products, status, userId } = order;
        const _dbConnect = await this._dbConnect.connect();
        try {

            await _dbConnect.query('BEGIN');

            const sqlInsertOrder = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const { rows } = await _dbConnect.query(sqlInsertOrder, [userId, status]);
            const order = rows[0];

            if (!order) {
                throw new Error("An Error occur while create a new order.");
            }

            const sqlInserProductBelongingToOder = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
            const orderProductsAsync = products?.map(async (product: OrderProduct) => {
                const { productId, quantity } = product;
                const { rows } = await _dbConnect.query(sqlInserProductBelongingToOder, [order.id, productId, quantity]);
                return rows[0];
            }) || [];
            const orderProducts = await Promise.all(orderProductsAsync);

            if (!orderProducts) {
                throw new Error("An Error occur while create a new order.");
            }

            await _dbConnect.query('COMMIT');


            return humps.camelizeKeys({
                ...order,
                products: orderProducts
            });
        } catch (err: any) {
            await _dbConnect.query('ROLLBACK');
            throw new Error(`Can not add a new order. ${err}`);
        } finally {
            console.log('release connection db');
            _dbConnect.release();
        }
    }

    async read(id: string): Promise<Order> {
        const _dbConnect = await this._dbConnect.connect();
        try {
            const sqlQueryOder = "SELECT * FROM orders WHERE id=($1)";
            const { rows } = await _dbConnect.query(sqlQueryOder, [id]);
            const order = rows[0];

            if (!order) {
                throw new Error("An Error occur while query the order.");
            }

            const sqlQueryProductBelongingToOder = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
            const { rows: orderProductRows } = await _dbConnect.query(sqlQueryProductBelongingToOder, [id]);

            if (!orderProductRows) {
                throw new Error("An Error occur while query product belonging to order.");
            }

            return humps.camelizeKeys({
                ...order,
                products: orderProductRows
            });
        } catch (err: any) {
            throw new Error(`Can not find the order with id, ${id}. ${err}`);
        } finally {
            console.log('release connection db');
            _dbConnect.release();
        }
    }

    async update(id: string, newOrder: Order): Promise<Order> {
        const { products, status, userId } = newOrder;
        const _dbConnect = await this._dbConnect.connect();

        try {
            await _dbConnect.query('BEGIN');

            const sqlUpdateOder = "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *";
            const { rows } = await _dbConnect.query(sqlUpdateOder, [status, id]);
            const order = rows[0];
            if (!order) {
                throw new Error("An Error occur while query the order.");
            }

            const orderProductsSql = "UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity";
            const orderProductsAsync = products?.map(async (product: OrderProduct) => {
                const { productId, quantity } = product;
                const { rows } = await _dbConnect.query(orderProductsSql, [productId, quantity, order.id]);
                return rows[0];
            }) ?? [];

            const orderProducts = await Promise.all(orderProductsAsync);

            if (!orderProducts) {
                throw new Error("An Error occur while query product belonging to order.");
            }

            await _dbConnect.query('COMMIT');

            return humps.camelizeKeys({
                ...order,
                products: orderProducts
            });
        } catch (err: any) {
            await _dbConnect.query('ROLLBACK');
            throw new Error(`Could not update the order for user ${userId}. ${err}`);
        } finally {
            console.log('release connection db');
            _dbConnect.release();
        }
    }

    async delete(id: string): Promise<Boolean> {
        const _dbConnect = await this._dbConnect.connect();
        try {
            await _dbConnect.query('BEGIN');

            const orderProductsSql = "DELETE FROM order_products WHERE order_id=($1)";
            await _dbConnect.query(orderProductsSql, [id]);
            const sql = "DELETE FROM orders WHERE id=($1)";
            await _dbConnect.query(sql, [id]);

            await _dbConnect.query('COMMIT');
            return true;
        } catch (err: any) {
            await _dbConnect.query('ROLLBACK');
            throw new Error(`Can not delete the product with id, ${id}. ${err}`);
        } finally {
            console.log('release connection db');
            _dbConnect.release();
        }
    }

}