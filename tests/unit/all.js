import Chat from '../chat'

describe('Model.all()', () => {
  it('grabs all', async function() {
    let chats = await Chat.all()
    expect(chats.length).to.be.above(1)
    expect(typeof chats).to.equal('object')
  })
})
