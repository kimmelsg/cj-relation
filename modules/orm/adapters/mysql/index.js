import connection from './connection'
import Builder from './builder'
import { getTableName } from '../../../global/get-name'

const relatable = (result, model) => new Proxy(result, {
  get(target, name) {
    if(name in target) return target[name]
    if(getTableName(name) in target) return target[getTableName(name)]

    let instance = new model(result)
    if(name in instance) return instance[name]().result()
  }
})

export default {
  select({ model, select, where, limit, joins = [] }) {
    return new Promise((resolve, reject) => {
      const options = {
        sql: `SELECT ${select ? select : '*'} FROM ${model.tableName()}${where ? ` WHERE ${connection.escape(where)}` : ''}${this.getJoins(joins)}${limit ? ` LIMIT ${connection.escape(limit)}` : ''}`,
        nestTables: joins.length > 0 ? true : false
      }

      connection.query(options,  (error, results) => {
        if(error) return reject(error)

        if(joins.length > 0) results = this.mergeInJoins(results)
        resolve(relatable(limit === 1 ? results[0] : results, model))
      })
    })
  },

  create({ model, data }) {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${model.tableName()} SET ?`, data,  (error, result) => {
        if(error) return reject(error)
        resolve(relatable({
          id: result.insertId,
          ...data
        }, model))
      })
    })
  },
  queryBuilder(options) {
    return new Builder(options)
  },
  mergeInJoins(results) {
    return results.map(result => {
      let newResult = {}
      Object.keys(result).forEach((item, index) => {
        if(index === 0) newResult = result[item]
        else newResult[item] = result[item]
      })
      return newResult
    })
  },
  getJoins(joins) {
    return joins.map(join => ` INNER JOIN \`${join.includeTable}\` ON ${join.localField} = ${join.remoteField}`)
  }
}
