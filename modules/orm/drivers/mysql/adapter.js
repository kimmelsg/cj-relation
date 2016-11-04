import connection from './connection'

export default {

  select({ select, table, where, limit }) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT ${select ? select : '*'} FROM ${table}${where ? ` WHERE ${connection.escape(where)}` : ''}${limit ? ` LIMIT ${connection.escape(limit)}` : ''}`,  (error, results) => {
        if(error) return reject(error)
        resolve(limit === 1 ? results[0] : results)
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
