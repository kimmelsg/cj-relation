import mysql from './mysql'

const adapters = {
  mysql,
}

/*
  Loads an adapter based on DB_DRIVER env
*/

export default adapters[process.env.DB_DRIVER]
