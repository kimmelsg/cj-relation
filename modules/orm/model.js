import adapter from './adapters'
import { getTableName, getFieldName } from './global/get-name'

if(!adapter) throw new Error('You must specify process.env.DB_DRIVER before creating a model.')

export default class Model {
  constructor(values) {
    this.values = values
  }

  static tableName() {
    return getTableName(this.name)
  }

  static all() {
    return adapter.select({ model: this })
  }

  static first() {
    return adapter.select({ limit: 1, model: this })
  }

  static create(data) {
    return adapter.create({ data, model: this })
  }

  /* query builder methods
   * 
   * these methods return a builder instance so that you can chain methods
   *
   */

  static select(...select) {
    return adapter.queryBuilder({ select, model: this })
  }

  static where(where) {
    return adapter.queryBuilder({ where, model: this })
  }

  static limit(limit) {
    return adapter.queryBuilder({ limit, model: this })
  }

  //relationships

  with(...relationships) {
    let joins = relationships.map(relationship => this[relationship]())
    return adapter.queryBuilder({ joins, model: this.constructor })
  }

  hasOne(Model, localField = getFieldName(Model.name), remoteField = 'id') {
    return {
      result: () => Model.where({ [remoteField]: this.values[localField] }).first(),
      includeTable: getTableName(Model.name),
      localField: `${getTableName(this.constructor.name)}.${localField}`,
      remoteField: `${getTableName(Model.name)}.${remoteField}`,
    }
  }

  hasMany(Model, localField = 'id', remoteField = getFieldName(this.constructor.name)) {
    return {
      result: () => Model.where({ [remoteField]: this.values[localField] }),
      includeTable: getTableName(Model.name),
      localField: `${getTableName(this.constructor.name)}.${localField}`,
      remoteField: `${getTableName(Model.name)}.${remoteField}`,
    }
  }
}
