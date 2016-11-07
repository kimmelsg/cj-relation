import Chat from '../../setup/models/chat'

describe('Model.all()', () => {
  it('grabs all', async function() {
    await Chat.create({ messages: 'blah' })
    let chats = await Chat.all()
    expect(chats.length).to.be.above(0)
    expect(typeof chats).to.equal('object')
  })
})
