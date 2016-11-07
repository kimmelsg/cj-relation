import { Model } from '../../../../modules'
import User from './user'

export default class Chat extends Model {
  user() {
    return this.hasOne(User)
  }
}
