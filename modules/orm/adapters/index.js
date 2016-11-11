try {
  var adapter = require(`./${process.env.DB_DRIVER}`).default
}
catch(e) {
  throw new Error('You must specify process.env.DB_DRIVER before creating a model.')
}
export default adapter
