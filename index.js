const fs = require('fs');
const Path = require('path');
const marked = require('marked');
const axios = require('axios');

const makeArrwithMarkdownFiles = (acum, path) => {
  const stats = fs.lstatSync(path);
  stats.isFile() ? acum.push(path) : fs.readdirSync(path).map(file => makeArrwithMarkdownFiles(acum, Path.join(path, file)));
  return acum.filter(file => Path.extname(file) === '.md');
};

const getLinkstoFile = (acum, file) => {
  marked(fs.readFileSync(file, {
    encoding: "utf-8"
  }).toString()).split('<').map((cur) => {
    if (cur.startsWith('a')) {
      acum.push({
        href: cur.substr(7).substr(0, cur.substr(7).search('>')),
        text: cur.substring(cur.search('>') + 1),
        file: file,
        line: 0
      })
    }
  })
  return acum
}


const getLinks = (acum, files) => {
  files.length === 1 ? getLinkstoFile(acum, files[0]) : files.map(file => getLinkstoFile(acum, file))
  return acum;
}


const mdLinks = (path, options) => {

  const mdFiles = [];
  const links = [];

  console.log(getLinks(links, makeArrwithMarkdownFiles(mdFiles, path)));

}


module.exports = mdLinks;
