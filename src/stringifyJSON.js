// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  if(typeof obj === 'number' || typeof obj ==='boolean' || obj === null) {
    return '' + obj;
  }

  if(typeof obj === 'string') return '"' + obj + '"';

  if(typeof obj === 'undefined' || typeof obj === 'function') return null;

  if(Array.isArray(obj)) {
    let arrElements = [];
    obj.forEach((el) => {
      arrElements.push(stringifyJSON(el));
    });

    return '[' + arrElements.join(',') + ']';
  }

  if(typeof obj === 'object') {
    let arrObj = [];
    for(let keys in obj) {
      if(stringifyJSON(obj[keys])) {
        arrObj.push(`"${keys}":${stringifyJSON(obj[keys])}`)
      }
    }

    return '{' + arrObj.join(',') + '}';
  }
};
