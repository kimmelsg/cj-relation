import mysql from './mysql'

const adapters = {
  mysql,
}
export default adapters[process.env.DB_DRIVER]
