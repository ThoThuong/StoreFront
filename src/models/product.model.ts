import { Pool } from 'pg';
import dbConnect from '../database/connect';
import humps from 'humps';
export interface Product {
    id?: string;
    name?: string;
    price?: number;
}

export class ProductSchemal {
    private _dbConnect!: Pool;

    constructor() {
        this._dbConnect = dbConnect;
    }

    async index(): Promise<Product[]> {
        try {
            const _dbConnect = await this._dbConnect.connect();
            const sql_clause = 'SELECT * FROM products';
            const { rows } = await _dbConnect.query(sql_clause);
            _dbConnect.release();
            return humps.camelizeKeys(rows) as Product[];
        } catch (err: any) {
            throw new Error(`Can not find any products. ${err}`);
        }
    }

    async create(product: Product): Promise<Product> {
        const { name, price } = product;

        try {
            const sql_clause = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            const _dbConnect = await this._dbConnect.connect();
            const { rows } = await _dbConnect.query(sql_clause, [name, price]);
            _dbConnect.release();
            return humps.camelizeKeys(rows[0]);
        } catch (err: any) {
            throw new Error(`Can not add a new product, ${name}. ${err}`);
        }
    }

    async read(id: string): Promise<Product> {
        try {
            const sql_clause = 'SELECT * FROM products WHERE id=($1)';
            const _dbConnect = await this._dbConnect.connect();
            const { rows } = await _dbConnect.query(sql_clause, [id]);
            _dbConnect.release();
            return humps.camelizeKeys(rows[0]);
        } catch (err: any) {
            throw new Error(`Can not find the product with id, ${id}. ${err}`);
        }
    }

    async update(id: string, newProduct: { name: string, price: string }): Promise<Product> {
        const { name, price } = newProduct;

        try {
            const _dbConnect = await this._dbConnect.connect();

            if (name && price) {
                const sql_clause = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
                const { rows } = await _dbConnect.query(sql_clause, [name, price, id]);
                _dbConnect.release();
                return humps.camelizeKeys(rows[0]);
            }
            if (!name && price) {
                const sql_clause = 'UPDATE products SET price = $1 WHERE id = $2 RETURNING *';
                const { rows } = await _dbConnect.query(sql_clause, [price, id]);
                _dbConnect.release();
                return humps.camelizeKeys(rows[0]);
            }
            if (name && !price) {
                const sql_clause = 'UPDATE products SET name = $1 WHERE id = $2 RETURNING *';
                const { rows } = await _dbConnect.query(sql_clause, [name, id]);
                _dbConnect.release();
                return humps.camelizeKeys(rows[0]);
            }

            _dbConnect.release();
            throw new Error(`Can not update the product with id, ${id}.`);
        } catch (err: any) {
            throw new Error(`${err}`);
        }
    }

    async deleteProduct(id: string): Promise<Boolean> {
        try {
            const sql_clause = 'DELETE FROM products WHERE id=($1)';
            const _dbConnect = await this._dbConnect.connect();
            await _dbConnect.query(sql_clause, [id]);
            _dbConnect.release();
            return true;
        } catch (err: any) {
            throw new Error(`Can not delete the product with id, ${id}. ${err}`);
        }
    }
}
