import connection from './connection'

export default {
  select({ table }) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table}`,  (error, results) => {
        if(error) return reject(error)
        resolve(results)
      })
    })
  },

  where({ table, where }) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE ?`, where,  (error, results) => {
        if(error) return reject(error)
        resolve(results)
      })
    })
  },

  create({ table, data }) {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, data,  (error, result) => {
        if(error) return reject(error)
        resolve({
          id: result.insertId,
          ...data
        })
      })
    })
  }
}
