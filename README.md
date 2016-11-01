###ORM

Currently, only mysql is supported.

```
npm install _____ --save
```

###Setup

You must set the following environment variables in your app. We recommend creating a `.env` file and using [dotenv](https://github.com/motdotla/dotenv)

```
DB_DRIVER=mysql
DB_HOST=localhost
DB_USERNAME=test
DB_PASSWORD=secret
DB_NAME=blah
```

###Create a Model

`chat.js`

```js
import { Model } from 'orm'

export default class Chat extends Model {

}


```

###Using the Model

As long as the plural version of the model is available in the database (you can overwrite this), you can query the database.

```js
import Chat from './chat'

async function getChats {
  let chats = await Chat.all()
  console.log(chats)
}
```

####Supported methods

`.all()` - returns everything in the table
