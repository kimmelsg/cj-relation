import Chat from '../../../setup/models/relationships/chat'
import User from '../../../setup/models/relationships/user'

describe('Model.hasOne()', () => {
  it('tests hasOne directly', async function() {

    let user = await new Chat({ id: 1, user_id: 1 }).hasOne(User).result()

    expect(user.name).to.be.equal('Bob')
  })

  it('tests hasOne with set values', async function() {

    let user = await new Chat({ id: 1, user_id: 1 }).hasOne(User, 'user_id', 'id').result()

    expect(user.name).to.be.equal('Bob')
  })

  it('returns join statement', async function() {

    let rawQuery = await new Chat({ id: 1, user_id: 1 }).hasOne(User, 'user_id', 'id')

    expect(rawQuery.includeTable).to.be.equal('users')
    expect(rawQuery.localField).to.be.equal('chats.user_id')
    expect(rawQuery.remoteField).to.be.equal('users.id')
  })
})