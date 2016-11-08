import Make from '../../../../modules/cli/models/make'

describe('Models', () => {
  it('makes a model', () => {

    let fs = {
      mkdirSync: sinon.spy(),
      writeFile: sinon.spy(),
    }

    Make({ args: ['Test'], cwd: 'blah', fs })

    expect(fs.mkdirSync.calledOnce).to.equal(true)
    expect(fs.writeFile.calledOnce).to.equal(true)
    expect(fs.mkdirSync.args[0][0]).to.equal('blah/models')
    expect(fs.writeFile.args[0][0]).to.equal('blah/models/test.js')

    let error = new Error('failed creating file')
    try {
      fs.writeFile.args[0][2](error)
    }
    catch(e) {
      fs.writeFile.args[0][2]()
      expect(e.message).to.equal('failed creating file')
    }
  })
})
