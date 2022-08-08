CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name  VARCHAR(250) NOT NULL,
  price INTEGER      NOT NULL
);

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username        VARCHAR(250) NOT NULL,
  firstname       VARCHAR(250) NOT NULL,
  lastname        VARCHAR(250) NOT NULL,
  password        VARCHAR(250) NOT NULL
);

CREATE TABLE orders (
  id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users (id),
  status  BOOLEAN NOT NULL
);

CREATE TABLE order_products (
  order_id   UUID NOT NULL REFERENCES orders (id),
  product_id UUID NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL
);