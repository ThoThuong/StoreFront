import supertest from 'supertest';
import StoreFrontAppInstance from '../../server';
const request = supertest(StoreFrontAppInstance);

describe('Product endpoints', () => {

    let id_authen_user = '';
    let access_token = '';
    const authen_user = {
        "firstname": "Thuong authen testing product endpoint",
        "lastname": "Tran Ngoc authen",
        "username": "thuong_authen_product",
        "password": "authen"
    }

    beforeAll(async () => {
        const userToLogin = await request
            .post('/users')
            .send(authen_user);
        const { data } = userToLogin.body;
        const { user } = data;
        id_authen_user = user.id;
        access_token = `Bearer ${data.accessToken}`;
    });

    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    afterAll(async () => {
        if (id_authen_user) {
            await request
                .delete(`/users/${id_authen_user}`)
                .set('Authorization', access_token);
        }

    })

    it('create', async () => {

        let id = '';
        try {
            const res = await request
                .post('/products')
                .set('Authorization', access_token)
                .send({
                    "name": "Đôi lứa sánh đôi test create book product",
                    "price": "2000000"
                });
            const { status } = res;
            id = res.body.data.product.id;

            expect(status).toEqual(201);
        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
        finally {
            if (id) {
                await request
                    .delete(`/products/${id}`)
                    .set('Authorization', access_token);
            }

        }

        // let id = '';
        // const res = await request
        //     .post('/products')
        //     .set('Authorization', access_token)
        //     .send({
        //         "name": "Đôi lứa sánh đôi test create book product",
        //         "price": "2000000"
        //     });
        // const { status } = res;
        // id = res.body.data.product.id;

        // expect(status).toEqual(201);

        // if (id) {
        //     await request
        //         .delete(`/products/${id}`)
        //         .set('Authorization', access_token);
        // }

    });

    it('index', async () => {
        try {
            const res = await request
                .get('/products')
                .set('Authorization', access_token);
            expect(res.status).toBe(200);
        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }

        // const res = await request
        //     .get('/products')
        //     .set('Authorization', access_token);
        // expect(res.status).toBe(200);
    });

    it('read', async () => {
        let id = '';
        try {
            const res = await request
                .post('/products')
                .set('Authorization', access_token)
                .send({
                    "name": "Đôi lứa sánh đôi test create book product",
                    "price": "2000000"
                });
            id = res.body.data.product.id;

            const read = await request
                .get(`/products/${id}`)
                .set('Authorization', access_token);
            expect(read.status).toBe(200);

        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
        finally {

            if (id) {
                await request
                    .delete(`/products/${id}`)
                    .set('Authorization', access_token);
            }

        }

        // let id = '';
        // const res = await request
        //     .post('/products')
        //     .set('Authorization', access_token)
        //     .send({
        //         "name": "Đôi lứa sánh đôi test create book product",
        //         "price": "2000000"
        //     });
        // id = res.body.data.product.id;

        // const read = await request
        //     .get(`/products/${id}`)
        //     .set('Authorization', access_token);
        // jasmine.clock().tick(200000);
        // expect(read.status).toBe(200);
        // if (id) {
        //     await request
        //         .delete(`/products/${id}`)
        //         .set('Authorization', access_token);

        // }

    });

    it('update', async () => {
        let id = ''
        try {
            const res = await request
                .post('/products')
                .set('Authorization', access_token)
                .send({
                    "name": "Đôi lứa sánh đôi test create book product",
                    "price": "2000000"
                });
            id = res.body.data.product.id;

            const put = await request
                .put(`/products/${id}`)
                .set('Authorization', access_token)
                .send({
                    "name": "Đôi lứa sánh đôi test create book product update",
                    "price": "2000000"
                });
            expect(put.status).toBe(200);

        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
        finally {
            if (id) {
                await request
                    .delete(`/products/${id}`)
                    .set('Authorization', access_token);
            }
        }

        // let id = '';
        // const res = await request
        //     .post('/products')
        //     .set('Authorization', access_token)
        //     .send({
        //         "name": "Đôi lứa sánh đôi test create book product",
        //         "price": "2000000"
        //     });
        // id = res.body.data.product.id;

        // const put = await request
        //     .put(`/products/${id}`)
        //     .set('Authorization', access_token)
        //     .send({
        //         "name": "Đôi lứa sánh đôi test create book product update",
        //         "price": "2000000"
        //     });
        // expect(put.status).toBe(200);
        // if (id) {
        //     await request
        //         .delete(`/products/${id}`)
        //         .set('Authorization', access_token);
        // }
    });

    it('delete', async () => {
        try {
            const res = await request
                .post('/products')
                .set('Authorization', access_token)
                .send({
                    "name": "Đôi lứa sánh đôi test create book product",
                    "price": "2000000"
                });
            const id = res.body.data.product.id;

            const del = await request
                .delete(`/products/${id}`)
                .set('Authorization', access_token);
            expect(del.status).toBe(204);

        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }

        // const res = await request
        //     .post('/products')
        //     .set('Authorization', access_token)
        //     .send({
        //         "name": "Đôi lứa sánh đôi test create book product",
        //         "price": "2000000"
        //     });
        // const id = res.body.data.product.id;

        // const del = await request
        //     .delete(`/products/${id}`)
        //     .set('Authorization', access_token);
        // expect(del.status).toBe(204);
    });

})