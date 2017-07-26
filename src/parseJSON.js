// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  let recurse = function(el) {
    //First string check
    // if(el === 'null' || el === '"null"') return null;
    // if(el === 'true' || el === '"true"') return true;
    // if(el === 'false' || el === '"false"') return false;
    if(el === 'null') return null;
    if(el === 'true') return true;
    if(el === 'false') return false;

    //All other string check
    if(el[0] === '"') {
      let final = '';
      return final + el.slice(1, el.length - 1);
    }

    //Number check
    // if(/^-?[0-9]+$/.test(el)) {
    //   return parseInt(el, 10);
    // }
    // let isNeg = (el[0] === '-' && /^[0-9]+$/.test(el[1]))
    // let isNum = /^-?[0-9]+$/.test(el[0]);
    // let isDec = /^[0-9]+$/.test(el[1])
    if(isNum(el)) {
      return parseFloat(el);
    }

    //Object function
    if(el[0] === '{') {
      return parseObj(el);
    }

    //Array function
    if(el[0] === '[') {
      return parseArr(el);
    }

  }

  let isNum = el => {
      let ArrTest = el[0] === '[' || el[0] === '{';
      let test = /^[0-9]+$/.test(el[1]) || /^-?[0-9]+$/.test(el[0]);;
      return test && !ArrTest;
    };

  let parseObj = el => {

    let obj = {};
    if(el[1] === '}') return obj;
    let keys = getKeysArr(el);
    keys.forEach(cur => {
      let curKey = getStrObj(cur, 'key');
      curKey = removeWhitespace(curKey);
      curKey = curKey.slice(1, curKey.length - 1);
      let curVal = getStrObj(cur, 'val');
      obj[curKey] = recurse(removeWhitespace(curVal));
    });
    return obj;
  };

  let parseArr = el => {
    let arr = [];
    if(el[1] === ']') return arr;
    let arrEl = getKeysArr(el);
    arrEl.forEach(cur => {
      arr.push(recurse(removeWhitespace(cur)));
    });

    return arr;
  };

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

      if(el[i] === '[' || el[i] === '{' || (el[i] === '"' && !isInside)) {
        isInside = true;
      } else if (el[i] === ']' || el[i] === '}' ||(el[i] === '"' && isInside)) {
        isInside = false;
      }

      if(el[i] === ',' && !isInside) {
        arr.push(str);
        str = '';
        continue;
      }

      if((el[i] === '}' || el[i] === ']') && i === el.length - 1) {
      arr.push(str);
        str = '';
        continue;
      }

      str += el[i];
    }
    return arr;
  };

  let removeWhitespace = el => {
    let start = 0;
    let end = el.length - 1;
    while(el[start] === ' ') {
      start++;
    }
    while(el[end] === ' ') {
      end--;
    }
    return el.slice(start, end + 1);
  }


  //Call function to kick off
  return recurse(json);

};

// parseJSON('{}');              // {}
// JSON.parse('true');            // true
// JSON.parse('"foo"');           // "foo"
// JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
// JSON.parse('null');            // null



//Create recursive function for every type of JSON grammar (object, string, array, etc)
//Create nextChar function that gets the next character to be parsed and ignores unecessary whitespace.
//Go into recursive function for overall object and then call other functions as needed for object elements.
