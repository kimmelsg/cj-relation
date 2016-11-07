import connection from './connection'
import Builder from './builder'

const relatable = (result, model) => new Proxy(result, {
  get(target, name) {
    if(name in target) return target[name]
    let instance = new model(result)
    if(name in instance) return instance[name]()
  }
})

export default {
  select({ model, select, table, where, limit }) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT ${select ? select : '*'} FROM ${table}${where ? ` WHERE ${connection.escape(where)}` : ''}${limit ? ` LIMIT ${connection.escape(limit)}` : ''}`,  (error, results) => {
        if(error) return reject(error)
        resolve(relatable(limit === 1 ? results[0] : results, model))
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
  },
  queryBuilder(options) {
    return new Builder(options)
  }
}
