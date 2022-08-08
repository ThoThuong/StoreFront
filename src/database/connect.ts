import dotenv from 'dotenv';
import { ClientConfig, Pool, Client } from 'pg';

dotenv.config();

let clientConnectConfigToDB: ClientConfig = {
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

const database = (process.env.ENV === 'test' ? process.env.POSTGRES_DB : process.env.POSTGRES_DB) as unknown as string;

clientConnectConfigToDB = {
  ...clientConnectConfigToDB,
  database
}
console.log('clientConnectConfigToDB', clientConnectConfigToDB);
const dbConnect = new Pool(clientConnectConfigToDB)
export default dbConnect;