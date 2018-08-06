const fs = require('fs');
const path = require('path');
const marked = require('marked');
const axios = require('axios');


const state = {
 links: null,
}

const url3 = './files/hola.md'
const urlAbsoluta3 = path.join(process.cwd(), url3)
if (path.extname(urlAbsoluta3) === '.md') {
 const anchors = marked(fs.readFileSync(urlAbsoluta3, {
  encoding: "utf-8"
 }).toString()).split('<').reduce((prev, cur) => {
  if (cur.startsWith('a')) {
   prev.push({
    href: cur.substr(7).substr(0, cur.substr(7).search('>')),
    text: cur.substring(cur.search('>') + 1),
    file: url3
   })
  }
  return prev
 }, [])
 state.links = anchors
} else {
 console.log('no paso porque no soy markdown')
}



const validate = links => {
 console.log(links.length)
}


validate(state.links)