const fs = require('fs');
const Path = require('path');
const marked = require('marked');
const axios = require('axios');


const state = {
  files: [],
  markdowFiles: null,
  links: null
}

const filterMarkdowns = files => {
  state.markdowFiles = files.filter(file => Path.extname(Path.join(process.cwd(), file)) === '.md');
  console.log(state.markdowFiles);
  return state.markdowFiles;
  //console.log(markdowFiles);
  //return markdowFiles
}





const isFile = file => {
  state.files.push(file)
  return filterMarkdowns(state.files)
}

const readDirSync = path => {
  if (fs.lstatSync(path).isFile()) {
    return isFile(path)
  } else {
    fs.readdirSync(path).map(file => {
      const ruta = Path.join(path, file);
      return fs.lstatSync(ruta).isFile() ? isFile(ruta) : readDirSync(ruta)
    })
  }
}



const mdLinks = (path, options) => {
  console.log(path);
  readDirSync(path)
}



/* const greeting = str => {
  console.log(str)
}
 */

module.exports = mdLinks;
