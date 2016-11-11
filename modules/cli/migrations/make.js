import { getTableName } from '../../global/get-name'

export default ({ args, cwd, fs }) => {
  let path = `${cwd}/migrations`
  let filePath = `${path}/${args[0].toLowerCase()}.js`

  /*
    check if migrations folder exists
  */
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    fs.mkdirSync(path)
  }

  const template = `import { Schema } from 'relation'

/*
  Model Name: ${args[0]}
  Database Table: ${getTableName(args[0])}
*/

export default class ${args[0]}Migration {
  up() {
    Schema.create(${getTableName(args[0])}, table => {
      // table.increments('id')
      // table.string('name')
      // table.timestamps()
    })
  }

  down() {
    Schema.drop(${getTableName(args[0])})
  }
}`

  fs.writeFile(filePath, template, err => {
    if (err) throw err;
  })

  console.log('Created migration: ', filePath)


  if(args[1] === '-m') {
    require('../models/make').default({ args, cwd, fs })
  }
}
