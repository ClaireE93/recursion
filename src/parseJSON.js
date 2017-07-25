// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // let el = json[0];

  let recurse = function(el) {
    //String check
    if(el[0] === '"') {
      let final = '';
      return final + json.slice(1, json.length - 1);
    }

    //Number check
    if(/^[0-9]+$/.test(el)) {
      return parseInt(el, 10);
    }

    //Other check
    if(el === 'null') return null;
    if(el === 'true') return true;
    if(el === 'false') return false;

    //Object function
    if(el[0] === '{') {
      let obj = {};
      return parseObj(el);
    }

    //Array function
    if(el[0] === '[') {
      let arr = [];
      return parseArr(el);
    }

  }




};


//Create recursive function for every type of JSON grammar (object, string, array, etc)
//Create nextChar function that gets the next character to be parsed and ignores unecessary whitespace.
//Go into recursive function for overall object and then call other functions as needed for object elements.
