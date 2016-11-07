import Chat from '../../setup/models/chat'

describe('Model.select()', () => {
  it('grabs by id', async function() {
    let chat = await Chat.select('id').where({ id: 1 }).get()
    expect(chat.length).to.be.equal(1)
    expect(chat.messages).to.be.undefined
  })

  it('grabs first by id', async function() {
    let chat = await Chat.where({messages: 'blah'}).select('messages').first()
    expect(Object.keys(chat).length).to.be.equal(1)
    expect(chat.messages).to.be.equal('blah')
  })

  it('grabs by messages', async function() {
    let chat = await Chat.select('messages').where({ messages: 'blah' }).first()
    expect(chat.messages).to.be.equal('blah')
    expect(chat.id).to.be.undefined
  })

  it('grabs by messages', async function() {
    let chat = await Chat.select('messages', 'id').where({ messages: 'blah' }).get()
    expect(chat[0].messages).to.be.equal('blah')
    expect(chat[0].id).to.be.ok
  })
})
