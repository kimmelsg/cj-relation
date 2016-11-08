import Chat from '../../../setup/models/relationships/chat'
import User from '../../../setup/models/relationships/user'

describe('Model.hasMany()', () => {
  it('tests hasMany directly', async function() {
    let chat = await new User({ id: 1 }).hasMany(Chat).result().first()
    expect(chat.user_id).to.be.equal(1)
  })

  it('tests hasMany with set values', async function() {
    let chat = await new User({ id: 1 }).hasMany(Chat, 'id', 'user_id').result().first()

    expect(chat.user_id).to.be.equal(1)
  })

  it('returns join statement', async function() {
    let rawQuery = await new User({ id: 1 }).hasMany(Chat, 'id', 'user_id')

    expect(rawQuery.includeTable).to.be.equal('chats')
    expect(rawQuery.localField).to.be.equal('users.id')
    expect(rawQuery.remoteField).to.be.equal('chats.user_id')
  })
})