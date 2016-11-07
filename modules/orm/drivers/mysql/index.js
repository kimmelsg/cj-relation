import adapter from './adapter'
import Builder from './builder'

export default class MysqlDriver {
  static all() {
    return adapter.select({ table: this.tableName(), model: this })
  }

  static first() {
    return adapter.select({ table: this.tableName(), limit: 1, model: this })
  }

  static create(data) {
    return adapter.create({ table: this.tableName(), data, model: this })
  }

  //builder methods

  static select(...select) {
    return new Builder({ select, table: this.tableName(), model: this })
  }

  static where(where) {
    return new Builder({ where, table: this.tableName(), model: this })
  }

  static limit(limit) {
    return new Builder({ limit, table: this.tableName(), model: this })
  }
}
