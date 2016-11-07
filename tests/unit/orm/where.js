import Chat from '../../setup/models/chat'

describe('Model.where()', () => {
  it('grabs by id', async function() {
    let chat = await Chat.where({ id: 1 }).get()
    expect(chat.length).to.be.equal(1)
    expect(typeof chat).to.equal('object')
  })

  it('grabs by messages', async function() {
    let chat = await Chat.where({ messages: 'blah' }).get()
    expect(chat[0].messages).to.be.equal('blah')
    expect(chat[0].id).to.be.ok
  })
})
