import Chat from '../../../setup/models/relationships/chat'
import User from '../../../setup/models/relationships/user'

describe('Chat.user() and User.chats()', () => {
  it('lazy loads user', async function() {
    let chat = await Chat.first()

    let user = await chat.user

    expect(user.name).to.be.equal('Bob')
    expect(chat.user_id).to.be.equal(user.id)
  })

  it('lazy loads chats', async function() {
    let user = await User.first()

    let chat = await user.chats.first()
    expect(chat.user_id).to.be.equal(user.id)
  })

  //these arent as pretty since you have to new up the class :(
  //need to find a way to make it static.
  it('eager loads user', async function() {

    let chat = await new Chat().with('user').first()

    expect(chat.user.name).to.be.equal('Bob')
    expect(chat.user_id).to.be.equal(chat.user.id)
  })

  it('eager loads chats', async function() {

    let user = await new User().with('chats').first()
    expect(user.chats.user_id).to.be.equal(user.id)
  })

})
