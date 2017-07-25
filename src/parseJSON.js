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
      // let isEnd = false;
      return parseObj(el);
    }

    //Array function
    if(el[0] === '[') {
      // let arr = [];
      return parseArr(el);
    }

  }

  //Call function to kick off
  recurse(json);

  let parseObj = el => {

    let obj = {};
    let keys = getKeysArr(el);
    keys.forEach(cur => {
      let curKey = getStrObj(cur, 'key');
      let curVal = getStrObj(cur, 'val');
      obj[curKey] = recurse(curVal);
    })
    return obj;
  };

  let parseArr = el => {
    let arr = [];
    let arrEl = getString(el, 'array');

    return arr;
  };

  let getString = (el, type) => {
    let finalStr = '';

  }

  let getStrObj = (cur, type) => {
    let str = '';
    let i = 0;
    if (type === 'key') {
      while(cur[i] != ':') {
        str += cur[i];
        i++;
      }
    }

    if (type === 'val') {
      while(cur[i] != ':') {
        i++;
      }
      i++;
      str = cur.slice(i, cur.length);
    }

    return str;
  }

  let getKeysArr = el => {
    let arr = [];
    let isInside = false;
    let str = '';
    for(let i = 1; i < el.length; i++) {

      if(el[i] === '[' || el[i] === '{') isInside = true;
      if(el[i] === ']' || el[i] === '}') isInside = false;

      if(el[i] === ',' && !isInside) {
        arr.push(str);
        str = '';
        continue;
      }

      if(el[i] === '}' && i === el.length - 1) {
      arr.push(str);
        str = '';
        continue;
      }

      str += el[i];
    }
    return arr;
  }

};


//Create recursive function for every type of JSON grammar (object, string, array, etc)
//Create nextChar function that gets the next character to be parsed and ignores unecessary whitespace.
//Go into recursive function for overall object and then call other functions as needed for object elements.
