import Chat from '../chat'

describe('Model.where()', () => {
  it('grabs by id', async function() {
    let chats = await Chat.where({ id: 1 })
    expect(chats.length).to.be.equal(1)
    expect(typeof chats).to.equal('object')
  })
})
