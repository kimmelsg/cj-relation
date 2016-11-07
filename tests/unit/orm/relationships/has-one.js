import Chat from '../../../setup/models/relationships/chat'
import User from '../../../setup/models/relationships/user'

describe('Model.hasOne()', () => {
  it('tests hasOne directly', async function() {
    let chat = await Chat.first()

    let user = await new Chat({ id: 1, user_id: 1 }).hasOne(User)

    expect(user.name).to.be.equal('Bob')
  })

  it('tests hasOne with set values', async function() {
    let chat = await Chat.first()

    let user = await new Chat({ id: 1, user_id: 1 }).hasOne(User, 'user_id', 'id')

    expect(user.name).to.be.equal('Bob')
  })

 
})