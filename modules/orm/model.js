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

  hasOne(Model, localField = getFieldName(Model.name), remoteField = 'id') {
    /* istanbul ignore next */
    return Model.where({ [remoteField]: this.values[localField] }).first()
  }
}
