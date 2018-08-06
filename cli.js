#! /usr/bin/env node

const [, , ...args] = process.argv

const greeting = require('./index');
const path = args[0]

switch (true) {
  case args.length === 1:
    greeting('hola desdes aqui')
    break;
  case ((args.length === 2 && args[1] === '--validate') || (args.length === 2 && args[1] === '--stats')):
    greeting(`Hola desde ${args}`)
    break;
  case (args.length === 3 && args[1] === '--validate' && args[2] === '--stats') || (args.length === 3 && args[1] === '--stats' && args[2] === '--validate'):
    greeting(`Hola otra vez desde ${args}`)
    break;
  default:
    throw new Error('Indique bien los parametros')
}
