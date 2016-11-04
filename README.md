[![CircleCI](https://circleci.com/gh/navjobs/relation.svg?style=svg&circle-token=41fd7488fd84fed547bfb1266694db44317eec90)](https://circleci.com/gh/navjobs/relation)

###Relation

Currently, only mysql is supported.

```
npm install relation --save
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
import { Model } from 'relation'

export default class Chat extends Model {

  /*
  overwrite table name, this function is optional

  static tableName() {
    return 'dashboard_chats'
  }
  */
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

- `.all()` returns everything in the table
- `.where({ fieldName: 'value' })` returns any matching results
- `.create({ field: 'value'})` create a new row
- `.select('column', 'column2')` create a new row
- `.first()` returns first results

###Query Building

```js

Chat.select('messages', 'id').where({ messages: 'blah' }).get()

Chat.where({ messages: 'blah' }).get()

Chat.select('messages').first()

```
