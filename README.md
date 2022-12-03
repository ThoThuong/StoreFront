I. Instructions Setup (db and server):

1. Package installation instructions => `npm i`: install dependencies
2. Install Db: => Install postgres database
3. Create DB => open pgadmin ui tool and then Create database with name: “udacity_store_front” or any name you want
4. Environment variables.=> Create .env file and copy there are variables enviroment bellow and then replace placeholder_your_value by your value.

  POSTGRES_HOST=127.0.0.1
  POSTGRES_PORT=5432
  POSTGRES_PORT_TEST=5433
  POSTGRES_DB=udacity_store_front
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=1
  BCRYPT_PASSWORD=0987654321@@
  SALT_ROUNDS=10
  TOKEN_SECRET=1234567890@@

4. `npm run db-up`: migration database
5. `npm run start`: start on production mode
6. `npm run dev`: start on dev mode
7. `npm run test`: run uni test

8. Port number for server => Backend running port: 3000
9. Port number for server => Backend running unittest port: 3001
10. Port number for db => Database running port: 5432
11. Collection of Endpoints => Install Postman or ThunderClient extention on vs-code and import collection from the Postman-collection_UDCT_StoreFrontAPI.json file and environment_store_front.json file to start test all of endpoints I have attach in this root folder or I have list all endpoint at the part III of this file.

II. Database schema with column name and type.
  TABLE products (
    id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name  VARCHAR(250) NOT NULL,
    price INTEGER      NOT NULL
  );

  TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username        VARCHAR(250) NOT NULL,
    firstname       VARCHAR(250) NOT NULL,
    lastname        VARCHAR(250) NOT NULL,
    password        VARCHAR(250) NOT NULL
  );

  TABLE orders (
    id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users (id),
    status  BOOLEAN NOT NULL
  );

  TABLE order_products (
    order_id   UUID NOT NULL REFERENCES orders (id),
    product_id UUID NOT NULL REFERENCES products (id),
    quantity   INTEGER NOT NULL
  );

III. Introduce Project [List faetures] and collection of Endpoints (I have )

a. Authentication by jwt token (token type: bear)
  1. Register (create User): 
    endpoint => http://127.0.0.1:3000/users 
    method => post
    body => {
      "firstname": "Thuong",
      "lastname": "Tran Ngoc",
      "username": "ThuongTn32",
      "password": "1"
    } 
  2. Login 
    endpoint => http://127.0.0.1:3000/users/auth
    method => post
    body => {
      "username":"ThuongTn32",
      "password":"1"
    } 

b. Users
  1. Create User (register)
    endpoint => http://127.0.0.1:3000/users 
    method => post
    body => {
      "firstname": "Thuong",
      "lastname": "Tran Ngoc",
      "username": "ThuongTn32",
      "password": "1"
    }
  2. Get list Users
    endpoint => http://127.0.0.1:3000/users
    method: get
    auth: bear + access_token response from create user or login request
  3. Get detail User
    endpoint => http://127.0.0.1:3000/users/user_id
    method: get
    auth: bear + access_token response from create user or login request
  4. Get Oder belonging to User
    endpoint => http://127.0.0.1:3000/users/orders/user_id
    method: get
    auth: bear + access_token response from create user or login request
  5. Update User
    endpoint => http://127.0.0.1:3000/users/user_id
    method: put
    body => {
      "firstname": "thuong updated",
      "lastname": "tran ngoc updated 2"
    }
  6. delete User
    endpoint => http://127.0.0.1:3000/users/user_id
    method => delete
    auth => bear + access_token response from create user or login request

c. Products
  1. Create Product
    endpoint => http://127.0.0.1:3000/products
    method => post
    auth => bear + access_token response from create user or login request
    body =>  {
      "name": "Đôi lứa sánh đôi",
      "price": "250000"
    }

  2. Get list Products
    endpoint => http://127.0.0.1:3000/products
    method => get
    auth => bear + access_token response from create user or login request
    body =>  None

  3. Get detail Product
    endpoint => http://127.0.0.1:3000/products/product_id
    method => Get 
    auth => bear + access_token response from create user or login request
    body =>  None

  4. Update Product
    endpoint => http://127.0.0.1:3000/products/product_id
    method => put
    auth => bear + access_token response from create user or login request
    body =>  {
      "name": "Đôi lứa xứng đôi",
      "price" : 500000
    }

  5. Delete Product
    endpoint => http://127.0.0.1:3000/products/product_id
    method => delete
    auth => bear + access_token response from create user or login request
    body =>  None

d. Orders
  1. Create Order
    endpoint => http://127.0.0.1:3000/orders
    method => post
    auth => bear + access_token response from create user or login request
    body =>  {
      "userId": user_id,
      "status": true,
      "products": [
        {
          "productId": product_id,
          "quantity": 10
        }
      ]
    }

  2. Get list Orders
    endpoint => http://127.0.0.1:3000/orders
    method => get
    auth => bear + access_token response from create user or login request
    body =>  None

  3. Get detail Order
    endpoint => http://127.0.0.1:3000/orders/order_id
    method => get
    auth => bear + access_token response from create user or login request
    body =>  None

  4. Update Order
    endpoint => http://127.0.0.1:3000/orders/order_id
    method => put
    auth => bear + access_token response from create user or login request
    body =>  {
      "userId": user_id,
      "status": true,
      "products": [
        {
          "productId": product_id,
          "quantity": 30
        }
      ]
    }

  5. Delete Order
    endpoint => http://127.0.0.1:3000/orders/order_id
    method => delete
    auth => bear + access_token response from create user or login request
    body =>  None
  