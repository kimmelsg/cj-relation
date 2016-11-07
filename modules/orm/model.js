import Driver from './drivers'
import { getTableName, getFieldName } from './global/get-name'

export default class Model extends Driver {
  constructor(values) {
    super()
    this.values = values
  }

  static tableName() {
    return getTableName(this.name)
  }

  //relationships


  async hasOne(Model, localField = getFieldName(Model.name), remoteField = 'id') {
    return await Model.where({ [remoteField]: this.values[localField] }).first()
  }
}
