var Mocha = require('mocha'),
  path = require('path'),
  glob = require('glob');

var drivers = [
  'mysql',
  'postgres'
]

let files = glob.sync(process.cwd()+'/tests/unit/**/*.js')
let index = 0

function run(index) {
  process.env.DB_DRIVER = drivers[index]

  var mocha = new Mocha()
  files.forEach(file => mocha.addFile(file))

  mocha.run(failures => {
    if(failures) process.exit(failures)
  })
  .on('end', () => {
    index++
    if(drivers[index]) return run(index)
    process.exit()
  })
}

run(index)
