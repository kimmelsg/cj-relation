import Chat from '../../setup/models/chat'

describe('Model.first()', () => {
  it('grabs by id', async function() {
    let chat = await Chat.first()
    expect(chat.id).to.be.equal(1)
    expect(chat.messages).to.equal('blah')
  })

  it('grabs first from where', async function() {
    let chat = await Chat.where({ messages: 'blah' }).first()
    expect(chat.messages).to.be.equal('blah')
    expect(chat.id).to.be.ok
  })
})
