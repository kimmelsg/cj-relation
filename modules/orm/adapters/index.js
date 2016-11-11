import mysql from './mysql'
import postgres from './postgres'

const adapters = {
  mysql,
  postgres,
}

/*
  Loads an adapter based on DB_DRIVER env
*/

export default adapters[process.env.DB_DRIVER]
