I. Setup

1. `npm i`: install dependencies
2. Install postgres database
3. Create database with name: “udacity_store_front” or any name you want
4. Create .env file and replace your value in to placeholder_your_value

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
