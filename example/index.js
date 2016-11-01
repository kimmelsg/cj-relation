import Chat from './chat'

async function test() {
  try {
    let chats = await Chat.all()
  }
  catch(e) {
    console.log('error', e)
  }
  chats.forEach(chat => console.log('id: ', chat.id))
}

test()
