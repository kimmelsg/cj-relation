/* tests run without env variables, to test error messages */

describe('Model Errors', () => {
  before(() => {
    process.env.DB_DRIVER = null
    Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
  })

  after(() => {
    process.env.DB_DRIVER = 'mysql'
    Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
  })

  it('returns error when midding db driver', async function() {
    try{
      class Test extends require('../../../modules').Model {

      }
    }
    catch(e) {
      return expect(e.message).to.equal("You must specify process.env.DB_DRIVER before creating a model.")
    }
    expect(false).to.equal(true)
  })
})
