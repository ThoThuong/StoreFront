import supertest from 'supertest';

import StoreFrontAppInstance from '../../server';

const request = supertest(StoreFrontAppInstance);



describe('User endpoints', () => {

  let user_data = {
    "firstname": "Thuong",
    "lastname": "Tran Ngoc",
    "username": "ThuongTn3",
    "password": "123"
  }

  let response_user!: any;
  let access_token = '';

  beforeEach(() => {
    const login_user = {
      username: user_data.username,
      password: user_data.password
    }
    request
      .post('/users/auth')
      .send(login_user).then(
        (res) => {
          if (res.status === 200) {
            console.log('dung dung dung', res)
            access_token = `Bearer ${res.body.data.accessToken}`;
          } else {
            console.log('sai sai sai', res)
          }

        }
      );

  })


  it('create', async () => {
    try {
      const userRp = await request
        .post('/users')
        .send(user_data);

      const { status } = userRp;
      const { data } = userRp.body;
      const { user } = data;
      access_token += `Bearer ${data.accessToken}`;
      response_user = user;
      expect(status).toEqual(201);
    } catch (e: unknown) {

      throw new Error(JSON.stringify(e));
    }
  });

  it('index', async () => {
    try {

      const res = await request
        .get('/users')
        .set('Authorization', access_token);
      console.log('res.body', res.body)
      if (!access_token) {
        expect(res.status).toBe(401);
      }
      expect(res.status).toBe(200);

    } catch (e: unknown) {
      throw new Error(JSON.stringify(e));
    }
  });

  it('read', async () => {
    if (!response_user) {
      return;
    }
    try {
      const res = await request
        .get(`/users/${response_user.id}`)
        .set('Authorization', access_token);

      if (!access_token) {
        expect(res.status).toBe(401);
      }
      expect(res.status).toBe(200);
    } catch (e: unknown) {
      throw new Error(JSON.stringify(e));
    }
  });

  it('update', async () => {
    if (!response_user) {
      return;
    }
    try {
      const user_data_updated = {
        "firstname": 'thuong Updated',
        "lastname": 'Tran Ngoc Updated',
      }
      const res = await request
        .put(`/users/${response_user.id}`)
        .send(user_data_updated)
        .set('Authorization', access_token);

      if (!access_token) {
        expect(res.status).toBe(401);
      }
      expect(res.status).toBe(200);
    } catch (e: unknown) {
      throw new Error(JSON.stringify(e));
    }
  });

  it('auth', async () => {
    try {
      const login_user = {
        username: user_data.username,
        password: user_data.password
      }
      const res = await request
        .post('/users/auth')
        .send(login_user);

      if (res.status === 200) {
        access_token = `Bearer ${res.body.data.accessToken}`;
        expect(res.status).toBe(200);
      }
      console.log(res.body, res.status)
      expect(res.status).toBe(401);

    } catch (e: unknown) {
      throw new Error(JSON.stringify(e));
    }
  });

  it('Get orders owner', async () => {
    if (!response_user) {
      return;
    }
    try {
      const res = await request.get(`/users/orders/${response_user.id}`)
        .set('Authorization', access_token);

      if (!access_token) {
        expect(res.status).toBe(401);
      }
      expect(res.status).toBe(200);
    } catch (e: unknown) {
      throw new Error(JSON.stringify(e));
    }
  });

  it('delete', async () => {
    if (!response_user) {
      return;
    }
    if (!response_user.id) {
      return;
    }
    try {
      const res = await request
        .delete(`/users/${response_user.id}invalid_user_id`)
        .set('Authorization', access_token);
      if (!access_token) {
        expect(res.status).toBe(401);
      }
      expect(res.status).toBe(500);
    } catch (e: unknown) {
      throw new Error(JSON.stringify(e));
    }
  });

});