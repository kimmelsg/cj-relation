import mysql from 'mysql'

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

connection.connect()

export default {
  select({ table }) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table}`,  (error, results) => {
        if(error) return reject(error)
        resolve(results)
      })
    })
  }
}
