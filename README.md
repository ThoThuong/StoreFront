I. Setup

1. `npm i`: install dependencies
2. Install postgres database
3. Create database with name: “udacity_store_front” or any name you want
4. Create .env file and copy there are variables enviroment bellow and then replace placeholder_your_value by your value.

  POSTGRES_HOST=placeholder_your_value\
  POSTGRES_PORT=placeholder_your_value\
  POSTGRES_PORT_TEST=placeholder_your_value\
  POSTGRES_DB=placeholder_your_value\
  POSTGRES_USER=placeholder_your_value\
  POSTGRES_PASSWORD=placeholder_your_value\
  BCRYPT_PASSWORD=placeholder_your_value\
  SALT_ROUNDS=placeholder_your_value\
  TOKEN_SECRET=placeholder_your_value

4. `npm run db-up`: migration database
5. `npm run start`: start on production mode
6. `npm run dev`: start on dev mode
7. `npm run test`: run uni test

8. Backend running port: 3000
9. Backend running unittest port: 3001
10. Database running port: 5432
11. Install Postman or ThunderClient extention on vs-code and import collection from the Postman-collection_UDCT_StoreFrontAPI.json file I have attach in this root folder.

II. Introduce Project [List faetures]

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