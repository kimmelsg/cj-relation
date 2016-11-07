import Chat from '../relationships/chat'

describe('Chat.user()', () => {
  it('lazy loads user', async function() {
    let chat = await Chat.first()

    let user = await chat.user

    expect(user.name).to.be.equal('Bob')
  })

  it('eager loads user', async function() {

    //not done yet
    // let chat = await Chat.with('user').first()

    // expect(chat.user.name).to.be.equal('bob')
  })

})
