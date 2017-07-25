// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  let final = '';
  let arrElements = [];
  if(typeof obj === 'number' || typeof obj ==='boolean' || typeof obj === null) {
    return final += obj;
  }
  if(typeof obj = 'string') return '"' + obj + '"';
  if(Array.isArray(obj)) {
    // final += '[';
    // return final + obj.reduce((acc, cur) => {
    


    }
  };
