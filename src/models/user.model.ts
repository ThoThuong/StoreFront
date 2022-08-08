import bcrypt from 'bcrypt';
import humps from 'humps';
import { Pool } from 'pg';
import dbConnect from '../database/connect';
import { Order } from './order.model';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export interface User {
    id?: string;
    firstname: string;
    lastname: string;
    username: string;
    password?: string;
};

interface ProductsOrder {
    id?: string
    name?: string
    price?: number
    quantity?: number
}

interface OrdersProduct {
    id: string
    userId?: string
    status?: boolean
    products?: ProductsOrder[]
}

export interface UserOrders {
    userOrders: OrdersProduct[]
}



export class UserSchemal {
    private _dbConnect!: Pool;

    constructor() {
        this._dbConnect = dbConnect;
    }

    async index(): Promise<User[]> {
        try {
            const _dbConnect = await this._dbConnect.connect();
            const sql_clause = 'SELECT us.id, us.username, us.firstname, us.lastname FROM users us';
            const { rows } = await _dbConnect.query(sql_clause);
            _dbConnect.release();
            return humps.camelizeKeys(rows) as User[];
        } catch (err: any) {
            throw new Error(`Can not find any users. ${err}`);
        }
    }

    async create(user: User): Promise<User> {
        const { firstname, lastname, username, password } = user;
        try {
            const sql_clause = 'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt.hashSync(String(password) + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string, 10));
            const _dbConnect = await this._dbConnect.connect();
            const { rows } = await dbConnect.query(sql_clause, [firstname, lastname, username, hash]);
            if (rows && rows.length > 0) {
                return humps.camelizeKeys(rows[0]) as User;
            }
            _dbConnect.release();
            throw new Error(`Can not create a user with the firstname: ${firstname} and lastname: ${lastname}.`);
        } catch (err: any) {
            console.log('error here');

            throw new Error(`${err}`);
        }
    }

    async read(id: string): Promise<User> {
        try {
            const sql_clause = 'SELECT us.id, us.username, us.firstname, us.lastname FROM users us WHERE id=($1)';
            const _dbConnect = await this._dbConnect.connect();
            const { rows } = await dbConnect.query(sql_clause, [id]);
            if (rows && rows.length > 0) {
                return rows[0];
            }
            _dbConnect.release();
            throw new Error(`Somthing went wrong when we get user: userId: ${id}.`);
        } catch (err: unknown) {
            throw new Error(`${err})`);
        }
    }

    async update(id: string, newUserData: { firstname: String, lastname: string }): Promise<User> {
        const { firstname, lastname } = newUserData;
        try {
            const _dbConnect = await this._dbConnect.connect();
            if (firstname && lastname) {
                const sql_clause = `UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *`;
                const { rows } = await dbConnect.query(sql_clause, [firstname, lastname, id]);
                _dbConnect.release();
                return humps.camelizeKeys(rows[0]) as User;
            }
            if (!firstname && lastname) {
                const sql_clause = `UPDATE users SET lastname = $1 WHERE id = $2 RETURNING *`;
                const { rows } = await dbConnect.query(sql_clause, [lastname, id]);
                _dbConnect.release();
                return humps.camelizeKeys(rows[0]) as User;
            }
            if (firstname && !lastname) {
                const sql_clause = `UPDATE users SET firstname = $1 WHERE id = $2 RETURNING *`;
                const { rows } = await dbConnect.query(sql_clause, [firstname, id]);
                _dbConnect.release();
                return humps.camelizeKeys(rows[0]) as User;
            }
            throw new Error(`Can not update the user with firstname: ${firstname} and lastname: ${lastname}.`);
        } catch (err: any) {
            throw new Error(`${err}`);
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const sql_clause = 'DELETE FROM users WHERE id=($1)';
            const _dbConnect = await dbConnect.connect();
            await dbConnect.query(sql_clause, [id]);
            _dbConnect.release();
            return true;
        } catch (err: any) {
            throw new Error(`Can not delete the user with id, ${id}. ${err}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const sql_clause = 'SELECT * FROM users WHERE username=($1)';
            const _dbConnect = await this._dbConnect.connect();
            const { rows } = await dbConnect.query(sql_clause, [username]);

            if (rows && rows.length > 0) {
                const user = rows[0];

                if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                    return humps.camelizeKeys(user) as User;
                }
            }
            _dbConnect.release();
            throw new Error("Can not found any user on the credentials.");
        } catch (err: any) {
            throw new Error(`Wrong credentials. ${err}`);
        }
    }

    async userOrders(userId: string): Promise<UserOrders> {
        const _dbConnect = await this._dbConnect.connect();
        try {
            const sqlQueryOder = `select array_to_json(array_agg(row_to_json(orders))) user_orders
            from ( 
                select os.*, 
                (
                    select array_to_json(array_agg(row_to_json(products))) 
                    from (
                        select op.product_id, p."name", p.price, op.quantity from order_products op join products p on op.product_id = p.id 
                    ) products
                ) as orderProducts
                from orders os
                where os.user_id=($1)
            ) orders`;
            const { rows } = await _dbConnect.query(sqlQueryOder, [userId]);
            const order = rows[0];

            return humps.camelizeKeys(order) as UserOrders;
        } catch (err: any) {
            throw new Error(`Can not find the order belonging to user with id, ${userId}. ${err}`);
        } finally {
            console.log('release connection db');
            _dbConnect.release();
        }
    }
}