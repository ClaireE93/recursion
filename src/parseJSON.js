// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  let recurse = function(el) {
    //First string check
    if(el === 'null') return null;
    if(el === 'true') return true;
    if(el === 'false') return false;
    // if(el === '""') return "";

    //All other string check
    if(el[0] === '"') {
      let final = '';
      el = removeWhitespace(el);
      // console.log('whitespace gone: ' + el)
      for(let i = 1; i < el.length - 1; i++) {
        // if(el[i] === '\\') {
        //   final += el[i+1];
        //   i++;
        // } else {
        //   final += el[i];
        // }
        final += el[i];
      }
      return final;
    }

    //Number check
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
    // console.log(keys);
    keys.forEach(cur => {
      let curKey = getStrObj(cur, 'key');
      // curKey = removeWhitespace(curKey);
      curKey = curKey.slice(1, curKey.length - 1);
      let curVal = getStrObj(cur, 'val');
      // console.log(curVal);
      // console.log(removeWhitespace(curVal));
      obj[curKey] = recurse(removeWhitespace(curVal));
      // obj[curKey] = recurse(curVal);

    });
    return obj;
  };

  let parseArr = el => {
    let arr = [];
    if(el[1] === ']') return arr;
    let arrEl = getKeysArr(el);
    arrEl.forEach(cur => {
      // arr.push(recurse(removeWhitespace(cur)));
      arr.push(recurse(cur));

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
  };

  let getKeysArr = el => {
    let arr = [];
    let isInside = false;
    let str = '';
    let enclosed = 0;
    for(let i = 1; i < el.length; i++) {
      if(el[i] === '[' || el[i] === '{' || (el[i] === '"' && !isInside)) {
        isInside = true;
        enclosed++;
      } else if (el[i] === ']' || el[i] === '}' ||(el[i] === '"' && isInside)) {
        isInside = false;
        enclosed--;
      }

      if(el[i] === ',' && enclosed === 0) {
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
    let final = '';
    while(el[start] === ' ') {
      start++;
    }
    while(el[end] === ' ') {
      end--;
    }
    el = el.slice(start, end + 1);
    // console.log(el);
    for(let i = 0; i < el.length; i++) {
      if(el[i] === '\\') {
        final += el[i+1];
        i++;
      } else {
        final += el[i];
      }
    }

    return final;
    // return el.slice(start, end + 1);
  };

  //Call function to kick off
  return recurse(json);

};
