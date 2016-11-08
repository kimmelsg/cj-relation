export default ({ args, cwd, fs }) => {
  let filePath = `${cwd}/models/${args[0].toLowerCase()}.js`
  
  const template = `import { Model } from 'relation'

export default class ${args[0]} extends Model {

}
`
  try {
    fs.accessSync(`${cwd}/models`, fs.F_OK)
  } catch (e) {
    fs.mkdirSync(`${cwd}/models`)
  }

  fs.writeFile(filePath, template, err => {
    if (err) throw err;
  })

  console.log('Created model: ', filePath)
}
