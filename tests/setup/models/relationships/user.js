import { Model } from '../../../../modules'
import Chat from './chat'

export default class User extends Model {
  chats() {
    return this.hasMany(Chat)
  }
}
