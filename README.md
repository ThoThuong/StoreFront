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
11. Collection of Endpoints => Install Postman or ThunderClient extention on vs-code and import collection from the Postman-collection_UDCT_StoreFrontAPI.json file I have attach in this root folder or I have list all endpoint at the part III of this file.

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
  1. Register (create User)
  2. Login

b. Users
  1. Create User (register)
  2. Get list Users
  3. Get detail User
  4. Get Oder belonging to User
  5. Update User
  6. delete User

c. Products
  1. Create Product
  2. Get list Products
  3. Get detail Product
  4. Update Product
  5. Delete Product

d. Orders
  1. Create Order
  2. Get list Orders
  3. Get detail Order
  4. Update Order
  5. Delete Order