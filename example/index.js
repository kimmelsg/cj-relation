import Chat from './chat'

async function test() {
  try {
    let chats = await Chat.all()
    chats.forEach(chat => console.log('id: ', chat.id))
    let chat = await Chat.where({ id: 2 })
    console.log(chat)
  }
  catch(e) {
    console.log('error', e)
  }
}

test()
