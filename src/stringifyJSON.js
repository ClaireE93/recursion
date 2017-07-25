// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  let final = '';
  let arrElements = [];
  let objKeys = [];
  let objElem = [];
  let arrObj = [];
  if(typeof obj === 'number' || typeof obj ==='boolean' || typeof obj === null) {
    return final += obj;
  }
  if(typeof obj = 'string') return '"' + obj + '"';
  if(Array.isArray(obj)) {
    // final += '[';
    // return final + obj.reduce((acc, cur) => {
    for(let i = 0; i < obj.length; i++) {
      arrElements.push(stringifyJSON(obj[i]));
    }
    return '[' + arrElements.join(',') + ']';
    }
  if (typeof obj === 'object') {
    // let keys = Object.keys(obj);
    for(keys in obj) {
      arrObj.push(`${keys}: ${stringifyJSON(obj[keys])}`)
    return '{' + arrObj.join(',') + '}'
    }
  }

};
