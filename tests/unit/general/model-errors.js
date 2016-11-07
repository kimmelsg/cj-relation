import { Model } from '../../../modules'

/*
  these tests are ran with env variable missing to check for correct error handling
*/

describe('Model Errors', () => {
  it('returns a mysql error on missing table', async function() {
    class Test extends Model {

    }

    try{
      await Test.first()
    }
    catch(e) {
      return expect(e.message).to.contain("ER_NO_SUCH_TABLE")
    }
    expect(false).to.equal(true)
  })

  it('returns a mysql error on create', async function() {
    class Test extends Model {

    }
    
    try{
      await Test.create({ blah: true })
    }
    catch(e) {
      return expect(e.message).to.contain("ER_NO_SUCH_TABLE")
    }
    expect(false).to.equal(true)
  })
})
