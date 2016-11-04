import adapter from './adapter'
import Builder from './builder'

export default class MysqlDriver {
  static all() {
    return adapter.select({ table: this.tableName() })
  }

  static first() {
    return adapter.select({ table: this.tableName(), limit: 1 })
  }

  static create(data) {
    return adapter.create({ table: this.tableName(), data })
  }

  //builder methods

  static select(...select) {
    return new Builder({ select, table: this.tableName() })
  }

  static where(where) {
    return new Builder({ where, table: this.tableName() })
  }
}
