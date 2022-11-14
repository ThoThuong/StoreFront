import supertest from 'supertest';
import StoreFrontAppInstance from '../../server';
const request = supertest(StoreFrontAppInstance);

describe('Order endpoints', () => {

    let orderTest = {
        "userId": "",
        "status": true,
        "products": [
            {
                "productId": "",
                "quantity": 10
            }
        ]
    }

    let authen_user = {
        "firstname": "Thuong authen testing product endpoint",
        "lastname": "Tran Ngoc authen",
        "username": "thuong_authen_product",
        "password": "authen"
    }
    let access_token = '';

    beforeAll(async () => {
        const userToLogin = await request
            .post('/users')
            .send(authen_user);
        const { data } = userToLogin.body;
        const { user } = data;
        orderTest["userId"] = user.id;
        access_token = `Bearer ${data.accessToken}`;


        const product = await request
            .post('/products')
            .set('Authorization', access_token)
            .send({
                "name": "Đôi lứa sánh đôi test create book product",
                "price": "2000000"
            });
        const productId = product.body.data.product.id;
        orderTest["products"][0]["productId"] = productId;

    });

    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    afterAll(async () => {
        if (orderTest.userId) {
            await request
                .delete(`/users/${orderTest.userId}`)
                .set('Authorization', access_token);
        }

        if (orderTest["products"][0]["productId"]) {
            await request
                .delete(`/products/${orderTest["products"][0]["productId"]}`)
                .set('Authorization', access_token);
        }


    })

    it('create', async () => {

        let id = '';
        try {
            const res = await request
                .post('/orders')
                .set('Authorization', access_token)
                .send(orderTest);
            jasmine.clock().tick(200000);
            const { status } = res;
            id = res.body.data.order.id;
            expect(status).toEqual(201);
        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
        finally {
            if (id) {
                await request
                    .delete(`/orders/${id}`)
                    .set('Authorization', access_token);
            }
        }

        // let id = '';
        // const res = await request
        //     .post('/orders')
        //     .set('Authorization', access_token)
        //     .send(orderTest);
        // const { status } = res;
        // id = res.body.data.order.id;
        // expect(status).toEqual(201);
        // if (id) {
        //     await request
        //         .delete(`/orders/${id}`)
        //         .set('Authorization', access_token);
        // }

    });

    it('index', async () => {
        try {
            const res = await request
                .get('/orders')
                .set('Authorization', access_token);
            jasmine.clock().tick(200000);
            expect(res.status).toBe(200);
        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
    });

    it('read', async () => {
        let id = '';
        try {
            const res = await request
                .post('/orders')
                .set('Authorization', access_token)
                .send(orderTest);
            id = res.body.data.order.id;
            jasmine.clock().tick(200000);
            const read = await request
                .get(`/orders/${id}`)
                .set('Authorization', access_token);
            expect(read.status).toBe(200);

        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
        finally {

            if (id) {
                await request
                    .delete(`/orders/${id}`)
                    .set('Authorization', access_token);
                jasmine.clock().tick(200000);
            }
        }

        // let id = '';
        // const res = await request
        //     .post('/orders')
        //     .set('Authorization', access_token)
        //     .send(orderTest);
        // id = res.body.data.order.id;

        // const read = await request
        //     .get(`/orders/${id}`)
        //     .set('Authorization', access_token);
        // expect(read.status).toBe(200);
        // if (id) {
        //     await request
        //         .delete(`/orders/${id}`)
        //         .set('Authorization', access_token);
        // }


    });

    it('update', async () => {
        let id = '';
        try {
            const res = await request
                .post('/orders')
                .set('Authorization', access_token)
                .send(orderTest);
            id = res.body.data.order.id;

            orderTest.products[0].quantity = 20;
            const put = await request
                .put(`/orders/${id}`)
                .set('Authorization', access_token)
                .send(orderTest);
            jasmine.clock().tick(200000);
            expect(put.status).toBe(200);

        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }
        finally {
            if (id) {
                await request
                    .delete(`/products/${id}`)
                    .set('Authorization', access_token);
                jasmine.clock().tick(200000);
            }
        }

        // let id = '';
        // const res = await request
        //     .post('/orders')
        //     .set('Authorization', access_token)
        //     .send(orderTest);
        // id = res.body.data.order.id;

        // orderTest.products[0].quantity = 20;
        // const put = await request
        //     .put(`/orders/${id}`)
        //     .set('Authorization', access_token)
        //     .send(orderTest);

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
                .post('/orders')
                .set('Authorization', access_token)
                .send(orderTest);
            const id = res.body.data.order.id;

            const del = await request
                .delete(`/orders/${id}`)
                .set('Authorization', access_token);
            jasmine.clock().tick(200000);
            expect(del.status).toBe(204);

        } catch (e: unknown) {
            throw new Error(JSON.stringify(e));
        }

        // const res = await request
        //     .post('/orders')
        //     .set('Authorization', access_token)
        //     .send(orderTest);
        // const id = res.body.data.order.id;

        // const del = await request
        //     .delete(`/orders/${id}`)
        //     .set('Authorization', access_token);
        // expect(del.status).toBe(204);
    });

})