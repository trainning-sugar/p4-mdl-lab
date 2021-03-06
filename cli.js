#! /usr/bin/env node

const [, , ...args] = process.argv

const mdLinks = require('./index');
//const path = args[0]

switch (true) {
  case args.length === 1:
    mdLinks(`${args}`).then(data => {
      data.forEach(obj => {
        console.log(`${obj.file}${obj.href}${obj.text}`)
      });
    })
    break;
  case ((args.length === 2 && args[1] === '--validate') || (args.length === 2 && args[1] === '--stats')):
    //   greeting(`Hola desde ${args}`)
    break;
  case (args.length === 3 && args[1] === '--validate' && args[2] === '--stats') || (args.length === 3 && args[1] === '--stats' && args[2] === '--validate'):
    // greeting(`Hola otra vez desde ${args}`)
    break;
  default:
    throw new Error('Command not find the directory or file or put de command correct')
}
