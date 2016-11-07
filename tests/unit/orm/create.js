import Chat from '../../setup/models/chat'

describe('Model.create()', () => {
  it('creates a row', async function() {
    let chat = await Chat.create({ user_id: 23 })
    expect(chat.user_id).to.be.equal(23)
  })
})
