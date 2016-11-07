import Chat from '../../setup/models/chat'

describe('Model.limit()', () => {
  it('limits to 5', async function() {
    let chat = await Chat.limit(5).get()
    expect(chat.length).to.be.equal(5)
  })

  it('limits to 2 with where', async function() {
    let chat = await Chat.where({ messages: 'blah' }).limit(2).get()
    expect(chat.length).to.be.equal(2)
  })

})
