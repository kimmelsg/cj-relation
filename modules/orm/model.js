import adapter from './adapters'
import { getTableName, getFieldName } from '../global/get-name'

if(!adapter) throw new Error('You must specify process.env.DB_DRIVER before creating a model.')

export default class Model {
  constructor(values) {
    this.values = values
  }

  /*
    database table name,
    can be overwritten in the user's model
  */
  static tableName() {
    return getTableName(this.name)
  }

  /*
    retrieve all results in a table
    ex Model.all()
  */
  static all() {
    return adapter.select({ model: this })
  }

  /*
    grab the first item in a table
    ex Model.first()
  */
  static first() {
    return adapter.select({ limit: 1, model: this })
  }

  /*
    insert a row in the database
    ex Model.create({ name: 'bob' })
  */
  static create(data) {
    return adapter.create({ data, model: this })
  }



  //Query builder methods return a builder instance that is chainable

  /*
    select certain columns from a table
    ex Model.select('id', 'name').first()
  */
  static select(...select) {
    return adapter.queryBuilder({ select, model: this })
  }

  /*
    contrain a query with a where clause
    ex Model.where({ id: 1, user_id: 2 }).first()
  */
  static where(where) {
    return adapter.queryBuilder({ where, model: this })
  }

  /*
    contrain amount returned
    ex Model.limit(5).get()
  */
  static limit(limit) {
    return adapter.queryBuilder({ limit, model: this })
  }

  //relationships

  /*
    eager load a relationship
    ex Model.with('user').first()
  */
  with(...relationships) {
    let joins = relationships.map(relationship => this[relationship]())
    return adapter.queryBuilder({ joins, model: this.constructor })
  }

  /*
    One to One relationship
    ex
      export default class Chat extends Model {
        user() {
          return this.hasOne(User)
        }
      }
      let user = await Chat.user
  */
  hasOne(Model, localField = getFieldName(Model.name), remoteField = 'id') {
    return {
      result: () => Model.where({ [remoteField]: this.values[localField] }).first(),
      includeTable: getTableName(Model.name),
      localField: `${getTableName(this.constructor.name)}.${localField}`,
      remoteField: `${getTableName(Model.name)}.${remoteField}`,
    }
  }

  /*
    One to Many relationship
    ex
      export default class User extends Model {
        chats() {
          return this.hasMany(Chat)
        }
      }
      let chats = await User.chats.limit(5).get()
  */
  hasMany(Model, localField = 'id', remoteField = getFieldName(this.constructor.name)) {
    return {
      result: () => Model.where({ [remoteField]: this.values[localField] }),
      includeTable: getTableName(Model.name),
      localField: `${getTableName(this.constructor.name)}.${localField}`,
      remoteField: `${getTableName(Model.name)}.${remoteField}`,
    }
  }
}
