import connection from './connection'
import Builder from './builder'
import { getTableName } from '../../../global/get-name'


class MysqlAdapter {

  /*
    Generic Adapter Methods (these should be in every adapter)
    select, create, queryBuilder, getJoins, makeRelatable
  /*


    Builds the mysql query, used query builder and root model class
  */
  select({ model, select, where, limit, joins = [] }) {
    return new Promise((resolve, reject) => {
      const options = {
        sql: `SELECT ${select ? select : '*'} FROM ${model.tableName()}${where ? ` WHERE ${connection.escape(where)}` : ''}${this.getJoins(joins)}${limit ? ` LIMIT ${connection.escape(limit)}` : ''}`,
        nestTables: joins.length > 0 ? true : false
      }

      connection.query(options,  (error, results) => {
        if(error) return reject(error)

        if(joins.length > 0) results = this.mergeInJoins(results)
        resolve(this.makeRelatable(limit === 1 ? results[0] : results, model))
      })
    })
  }

  /*
    create a row in the database
  */
  create({ model, data }) {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${model.tableName()} SET ?`, data,  (error, result) => {
        if(error) return reject(error)
        resolve(this.makeRelatable({
          id: result.insertId,
          ...data
        }, model))
      })
    })
  }

  /*
    returns a new query builder instance
  */
  queryBuilder(options) {
    return new Builder(options)
  }

  /*
    creates join query from any model realtionships
    used on eager loads
  */
  getJoins(joins) {
    return joins.map(join => ` INNER JOIN \`${join.includeTable}\` ON ${join.localField} = ${join.remoteField}`)
  }


  /*
    Proxy object that returns item from resulting query
    or will check for a relationship on the model
    and return a promise.

    ex
    result.id -> returns `id` on the result Object

    result.users
      -> returns users if extists on the object.
         otherwise, checks for `users` function on the
         model and returns the related query promise
  */

  makeRelatable(result, model) {
    return new Proxy(result, {
      get(target, name) {
        if(name in target) return target[name]
        if(getTableName(name) in target) return target[getTableName(name)]

        let instance = new model(result)
        if(name in instance) return instance[name]().result()
      }
    })
  }

  /*
    MYSQL SPECIFIC METHODS
  */


  /*
    Joins nested tables for when eager loading a relationship

    converts
    {
      users: { name: 'Bob'},
      chats: {...},
    }
    to
    {
      name: 'Bob',
      chats: {...}
    }
  */
  mergeInJoins(results) {
    return results.map(result => {
      let newResult = {}
      Object.keys(result).forEach((item, index) => {
        if(index === 0) newResult = result[item]
        else newResult[item] = result[item]
      })
      return newResult
    })
  }
}

export default new MysqlAdapter()
