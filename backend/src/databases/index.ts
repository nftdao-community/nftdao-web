import Knex from 'knex';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';

const dbConnection = {
  client: 'mysql',
  connection: {
    charset: 'utf8',
    timezone: 'UTC',
    host: "dailydao.c7vdilejbvjc.ap-northeast-2.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "roqkf12#",
    database: "dailydao",
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default Knex(dbConnection);
