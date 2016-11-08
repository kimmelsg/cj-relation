#! /usr/bin/env node
import fs from 'fs'

let commands = {
  'make:migration': require('./migrations/make').default,
  'make:model': require('./models/make').default,
}

commands[process.argv[2]]({
  args: process.argv.slice(3),
  cwd: process.cwd(),
  fs
})
