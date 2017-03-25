import pg  from 'pg'

const config = {
  user: process.env.DB_USERNAME, //env var: PGUSER
  database: process.env.DB_NAME, //env var: PGDATABASE
  password: process.env.DB_PASSWORD, //env var: PGPASSWORD
  host: process.env.DB_HOST, // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


const connection = new pg.Pool(config)

export default connection
