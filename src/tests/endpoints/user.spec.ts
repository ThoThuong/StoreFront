import supertest from 'supertest';
import { User, UserSchemal } from '../../models/user.model';
import JWT from '../../helper/jwt.helpers';
import StoreFrontAppInstance from '../../server';
const request = supertest(StoreFrontAppInstance);
const userSchemal = new UserSchemal();
const jwt = new JWT();

describe('User endpoints', () => {

    let id_authen_user = '';
    const authen_user = {
        "firstname": "Thuong authen testing user endpoint",
        "lastname": "Tran Ngoc authen",
        "username": "thuong_authen_user",
        "password": "authen"
    }

    let user_data = {
        "firstname": "Thuong",
        "lastname": "Tran Ngoc",
        "username": "ThuongTn3",
        "password": "123"
    }

    let response_user!: any;
    let access_token = '';

    beforeAll(async () => {
        response_user = await userSchemal.create(authen_user);
        access_token = `Bearer ${jwt.generateToken(response_user)}`;
    });

    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    afterAll(async () => {
        if (id_authen_user) {
            await userSchemal.deleteUser(id_authen_user);
        }

    })

    it('index', async () => {
        try {
            const res = await request
                .get('/users')
                .set('Authorization', access_token);
            // jasmine.clock().tick(200000);
            expect(res.status).toBe(200);
        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
    });

    it('create', async () => {
        let id = '';
        try {
            const userRp = await request
                .post('/users')
                .send(user_data);
            jasmine.clock().tick(200000);
            const { status } = userRp;
            id = userRp.body.data.user.id;
            expect(status).toEqual(201);
        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
        finally {
            if (id) {
                await userSchemal.deleteUser(id);
            }

        }
    });

    it('read', async () => {

        try {
            const res = await request
                .get(`/users/${response_user.id}`)
                .set('Authorization', access_token);
            // jasmine.clock().tick(200000);
            expect(res.status).toBe(200);
        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }

    });

    it('update', async () => {
        try {
            const user_data_updated = {
                "firstname": 'thuong Updated',
                "lastname": 'Tran Ngoc Updated',
            }
            const res = await request
                .put(`/users/${response_user.id}`)
                .send(user_data_updated)
                .set('Authorization', access_token);
            // jasmine.clock().tick(200000);
            expect(res.status).toBe(200);
        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
    });

    it('auth', async () => {
        try {
            const login_user = {
                username: authen_user.username,
                password: authen_user.password
            }

            const res = await request
                .post('/users/auth')
                .send(login_user);
            access_token = `Bearer ${res.body.data.accessToken}`;
            expect(res.status).toBe(200);

        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
    });

    it('Get orders owner', async () => {
        try {
            const res = await request.get(`/users/orders/${response_user.id}`)
                .set('Authorization', access_token);
            expect(res.status).toBe(200);

        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
    });

    it('delete', async () => {
        try {
            user_data.username = "thuongtn to delete test"
            const newUser = await userSchemal.create(user_data);
            const res = await request
                .delete(`/users/${newUser.id}`)
                .set('Authorization', access_token);
            expect(res.statusCode).toEqual(204)
        } catch (e: unknown) {
            console.log(e)
            throw new Error(JSON.stringify(e));
        }
    });

});
