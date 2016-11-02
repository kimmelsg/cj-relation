import adapter from './adapter'

export default class MysqlDriver {
  static all() {
    return adapter.select({ table: this.tableName() })
  }

  static where(where) {
    return adapter.where({ table: this.tableName(), where })
  }

  static create(data) {
    return adapter.create({ table: this.tableName(), data })
  }
}
