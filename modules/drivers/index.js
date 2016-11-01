import mysql from './mysql'

const drivers = {
  mysql,
}

export default drivers[process.env.DB_DRIVER]
