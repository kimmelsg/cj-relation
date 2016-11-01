import adapter from './adapter'

export default class MysqlDriver {
  static async all() {
    return await adapter.select({ table: this.tableName() })
  }
}
