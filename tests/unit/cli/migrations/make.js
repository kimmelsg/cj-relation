import Make from '../../../../modules/cli/migrations/make'

describe('Migrations', () => {
  it('makes a migration', () => {

    let fs = {
      mkdirSync: sinon.spy(),
      writeFile: sinon.spy(),
    }

    Make({ args: ['Test'], cwd: 'blah', fs })

    expect(fs.mkdirSync.calledOnce).to.equal(true)
    expect(fs.writeFile.calledOnce).to.equal(true)
    expect(fs.mkdirSync.args[0][0]).to.equal('blah/migrations')
    expect(fs.writeFile.args[0][0]).to.equal('blah/migrations/test.js')

    let error = new Error('failed creating file')
    try {
      fs.writeFile.args[0][2](error)
    }
    catch(e) {
      fs.writeFile.args[0][2]()
      expect(e.message).to.equal('failed creating file')
    }

  })

  it('makes a migration with model', () => {

    let fs = {
      mkdirSync: sinon.spy(),
      writeFile: sinon.spy(),
    }

    Make({ args: ['Test', '-m'], cwd: 'blah', fs })

    expect(fs.writeFile.args[1][0]).to.equal('blah/models/test.js')

  })
})
