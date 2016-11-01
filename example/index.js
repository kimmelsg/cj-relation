import Chat from './chat'

async function test() {
  try {
    let chats = await Chat.all()
    chats.forEach(chat => console.log('id: ', chat.id))

  }
  catch(e) {
    console.log('error', e)
  }
}

test()
