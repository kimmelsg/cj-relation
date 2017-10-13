[![CircleCI](https://circleci.com/gh/navjobs/relation.svg?style=svg&circle-token=41fd7488fd84fed547bfb1266694db44317eec90)](https://circleci.com/gh/navjobs/relation)
[![Coverage Status](https://coveralls.io/repos/github/navjobs/relation/badge.svg?branch=master&t=jSzX1d)](https://coveralls.io/github/navjobs/relation?branch=master)
### Relation

An ORM meant for (Apollo) GraphQL, with built in dataloading.


## Create a Model

```js
import { Model } from 'relation'

export default class Category extends Model {

  /*
  overwrite table name, this function is optional

  static tableName() {
    return 'dashboard_chats'
  }
  */
}

```

## GraphQL example

Before:
```js
// using Objection.js and having to fix the ordering after 
const categoryLoader = new DataLoader(async ids => {
  let categories = await Category.query().whereIn('id', ids);
  return ids.map(id => categories.find(category => category.id === id));
});

...

Category: {
  category(category) {
    return categoryLoader.load(category.parent_id);
  },
}

```

With `relation`:

```js
Category: {
  category(category) {
    return Category.load(category.parent_id);
  },
}

```

The dataloader work is built in for you.

## Query Building

### Supported methods

- `.all()` returns everything in the table
- `.where({ fieldName: 'value' })` returns any matching results
- `.create({ field: 'value'})` create a new row
- `.select('column', 'column2')` contrain rows to select
- `.first()` returns first results
- `.limit(5)` limits the query

```js

Category.select('name', 'id').where({ id: 1 }).get()

Category.where({ name: 'blah' }).get()

Category.select('name').first()

Category.where({ id: 2 }).limit(2).get()

```


## Relationships

```js
import User from './user-model'
import Post from './post-model'

export default class Category extends Model {

  user() {
    return this.hasOne(User, 'user_id')
  }

  posts() {
    return this.hasMany(Post, 'category_id')
  }
}

```

Now, we can eager load, or get the results after the fact:

```js
let categories = await Category.all()

let users = await categories.user //load all users after initial query
let user = await categories[0].user // load a single user 

// load categories with users at once
let categoriesWithUsers = await Category.with('user').all() 
```