import Driver from './drivers'
import GetTableName from './global/get-table-name'

export default class Model extends Driver {
  static tableName() {
    return GetTableName(this.name)
  }
}
