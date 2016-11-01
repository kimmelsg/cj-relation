export default class MysqlDriver {
  static async all() {
    connection.query('SELECT * FROM posts')
    return this.tableName();
  }
}
